/**
 * DZIRE Design System — Shadow Tokens
 */

export const shadows = {
  sm: "0 1px 2px rgba(0,0,0,0.06)",
  md: "0 6px 16px rgba(0,0,0,0.08)",
  lg: "0 12px 32px rgba(0,0,0,0.12)",
  glow: "0 0 24px rgba(225,29,72,0.35)",
  glowGold: "0 0 24px rgba(245,196,81,0.35)",
  glowVip: "0 0 24px rgba(192,132,252,0.35)",
} as const;

export type Shadows = typeof shadows;
