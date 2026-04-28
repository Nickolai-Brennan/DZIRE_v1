/**
 * frontend/src/services/positionsService.ts
 * Positions API service.
 */

import { apiFetch } from "./api";

export interface Position {
  id: string;
  slug: string;
  title: string;
  description?: string;
  category?: string;
  difficulty?: string;
  score?: number;
  image_url?: string;
  is_published: boolean;
  created_at: string;
  updated_at?: string;
}

export async function listPositions(): Promise<Position[]> {
  return apiFetch<Position[]>("/api/v1/positions");
}

export async function getPosition(slug: string): Promise<Position> {
  return apiFetch<Position>(`/api/v1/positions/${slug}`);
}
