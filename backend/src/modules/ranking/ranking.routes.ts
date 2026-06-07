import { Router } from "express";
import {
  getTopRanking,
  recordStudyDuration,
  recordStudyValidators,
} from "./ranking.controller";

export const rankingRouter = Router();

rankingRouter.get("/ranking/top", getTopRanking);
rankingRouter.post("/ranking/record", ...recordStudyValidators, recordStudyDuration);
