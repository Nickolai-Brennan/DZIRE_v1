/**
 * Design System — Spacing Tokens
 * Base unit: 4px (0.25rem). Follows a consistent scale.
 */

export const spacing = {
  0: "0px",
  px: "1px",
  0.5: "2px",
  1: "4px",
  xs: "4px",
  1.5: "6px",
  2: "8px",
  sm: "8px",
  2.5: "10px",
  3: "12px",
  4: "16px",
  md: "16px",
  5: "20px",
  6: "24px",
  lg: "24px",
  7: "28px",
  8: "32px",
  xl: "32px",
  9: "36px",
  10: "40px",
  12: "48px",
  "2xl": "48px",
  14: "56px",
  16: "64px",
  "3xl": "64px",
  20: "80px",
  24: "96px",
  "4xl": "96px",
  32: "128px",
} as const;

export type Spacing = typeof spacing;
