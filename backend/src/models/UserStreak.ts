import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class UserStreak extends Model {
  public id!: number;
  public user_id!: string;
  public user_name!: string;
  public current_streak!: number;
  public longest_streak!: number;
  public last_study_date!: Date | null;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

UserStreak.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: true,
    },
    user_name: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    current_streak: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    longest_streak: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    last_study_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "user_streaks",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
