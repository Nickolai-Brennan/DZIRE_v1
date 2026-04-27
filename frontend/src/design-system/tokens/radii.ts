/**
 * DZIRE Design System — Border Radius Tokens
 */

export const radii = {
  sm: "6px",
  md: "10px",
  lg: "14px",
  xl: "20px",
  "2xl": "28px",
  full: "999px",
} as const;

export type Radii = typeof radii;
