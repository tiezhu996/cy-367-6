import { overviewData } from "./overview.data";
import { RankingService } from "../ranking/ranking.service";

const rankingService = new RankingService();

export class OverviewService {
  async getOverview() {
    const ranking = await rankingService.getTopRanking(10);
    return {
      ...overviewData,
      ranking,
    };
  }
}
