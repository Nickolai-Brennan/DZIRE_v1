/**
 * Design System — Border Radius Tokens
 */

export const radii = {
  none: "0px",
  sm: "6px",
  md: "10px",
  lg: "14px",
  xl: "20px",
  "2xl": "28px",
  "3xl": "40px",
  full: "999px",
} as const;

export type Radii = typeof radii;
