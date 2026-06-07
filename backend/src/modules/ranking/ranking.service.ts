import { QueryTypes } from "sequelize";
import { sequelize } from "../../config/database";
import { StudyRecord } from "../../models/StudyRecord";
import { UserStreak } from "../../models/UserStreak";
import { fallbackRankingData } from "./ranking.data";

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins.toString().padStart(2, "0")}m`;
}

export interface RankingItem {
  rank: number;
  user_id: string;
  user_name: string;
  total_minutes: number;
  current_streak: number;
  total_hours: string;
}

export class RankingService {
  async getTopRanking(limit: number = 10): Promise<RankingItem[]> {
    try {
      const today = new Date().toISOString().split("T")[0];

      const results = await sequelize.query(
        `
        SELECT
          s.user_id,
          s.user_name,
          COALESCE(SUM(s.duration_minutes), 0) as total_minutes,
          COALESCE(us.current_streak, 0) as current_streak
        FROM study_records s
        LEFT JOIN user_streaks us ON s.user_id = us.user_id
        WHERE s.study_date = :today
        GROUP BY s.user_id, s.user_name, us.current_streak
        ORDER BY total_minutes DESC, current_streak DESC
        LIMIT :limit
        `,
        {
          replacements: { today, limit },
          type: QueryTypes.SELECT,
        }
      );

      return results.map((row: any, index: number) => ({
        rank: index + 1,
        user_id: row.user_id,
        user_name: row.user_name,
        total_minutes: Number(row.total_minutes),
        current_streak: Number(row.current_streak),
        total_hours: formatDuration(Number(row.total_minutes)),
      }));
    } catch (error) {
      console.error("Database query failed, using fallback data:", error);
      return fallbackRankingData.slice(0, limit);
    }
  }

  async recordStudyDuration(
    userId: string,
    userName: string,
    durationMinutes: number
  ): Promise<{ success: boolean; message: string }> {
    const transaction = await sequelize.transaction();

    try {
      const today = new Date().toISOString().split("T")[0];
      const yesterday = new Date(Date.now() - 86400000)
        .toISOString()
        .split("T")[0];

      const existingRecord = await StudyRecord.findOne({
        where: { user_id: userId, study_date: today },
        transaction,
      });

      if (existingRecord) {
        existingRecord.duration_minutes += durationMinutes;
        await existingRecord.save({ transaction });
      } else {
        await StudyRecord.create(
          {
            user_id: userId,
            user_name: userName,
            study_date: today,
            duration_minutes: durationMinutes,
          },
          { transaction }
        );
      }

      let userStreak = await UserStreak.findOne({
        where: { user_id: userId },
        transaction,
      });

      if (!userStreak) {
        userStreak = await UserStreak.create(
          {
            user_id: userId,
            user_name: userName,
            current_streak: 1,
            longest_streak: 1,
            last_study_date: new Date(today),
          },
          { transaction }
        );
      } else {
        const lastDate = userStreak.last_study_date
          ? new Date(userStreak.last_study_date).toISOString().split("T")[0]
          : null;

        if (lastDate === today) {
        } else if (lastDate === yesterday || lastDate === null) {
          userStreak.current_streak += 1;
          if (userStreak.current_streak > userStreak.longest_streak) {
            userStreak.longest_streak = userStreak.current_streak;
          }
        } else {
          userStreak.current_streak = 1;
        }

        userStreak.last_study_date = new Date(today);
        userStreak.user_name = userName;
        await userStreak.save({ transaction });
      }

      await transaction.commit();

      return {
        success: true,
        message: "学习时长记录成功",
      };
    } catch (error) {
      await transaction.rollback();
      console.error("Failed to record study duration:", error);
      return {
        success: false,
        message: "记录失败，请稍后重试",
      };
    }
  }
}
