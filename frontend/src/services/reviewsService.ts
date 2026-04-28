/**
 * frontend/src/services/reviewsService.ts
 * Reviews API service.
 */

import { apiFetch } from "./api";

export interface Review {
  id: string;
  slug: string;
  title: string;
  body?: string;
  score?: number;
  is_published: boolean;
  created_at: string;
  updated_at?: string;
}

export async function listReviews(): Promise<Review[]> {
  return apiFetch<Review[]>("/api/v1/reviews");
}

export async function getReview(slug: string): Promise<Review> {
  return apiFetch<Review>(`/api/v1/reviews/${slug}`);
}
