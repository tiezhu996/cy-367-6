import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RankingService } from "./ranking.service";

const service = new RankingService();

export const recordStudyValidators = [
  body("user_id").isString().isLength({ min: 1, max: 80 }),
  body("user_name").isString().isLength({ min: 1, max: 80 }),
  body("duration_minutes").isInt({ min: 1, max: 1440 }),
];

export async function getTopRanking(request: Request, response: Response) {
  const limit = Number(request.query.limit) || 10;
  const safeLimit = Math.min(Math.max(limit, 1), 100);
  const data = await service.getTopRanking(safeLimit);
  response.json({ data });
}

export async function recordStudyDuration(request: Request, response: Response) {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({
      success: false,
      message: "参数校验失败",
      errors: errors.array(),
    });
  }

  const { user_id, user_name, duration_minutes } = request.body;
  const result = await service.recordStudyDuration(
    user_id,
    user_name,
    duration_minutes
  );

  if (result.success) {
    response.json(result);
  } else {
    response.status(500).json(result);
  }
}
