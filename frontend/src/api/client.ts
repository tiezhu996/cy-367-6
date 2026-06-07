import { API_BASE_URL } from "../constants/app";
import type { OverviewResponse, RankingItem } from "../types";

export async function fetchOverview(): Promise<OverviewResponse> {
  const response = await fetch(`${API_BASE_URL}/overview`, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Overview request failed: ${response.status}`);
  }

  return response.json() as Promise<OverviewResponse>;
}

export async function fetchRanking(limit: number = 10): Promise<RankingItem[]> {
  const response = await fetch(`${API_BASE_URL}/ranking/top?limit=${limit}`, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Ranking request failed: ${response.status}`);
  }

  const result = await response.json();
  return result.data as RankingItem[];
}

export async function recordStudyDuration(
  userId: string,
  userName: string,
  durationMinutes: number
): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${API_BASE_URL}/ranking/record`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      user_id: userId,
      user_name: userName,
      duration_minutes: durationMinutes,
    }),
  });

  return response.json() as Promise<{ success: boolean; message: string }>;
}
