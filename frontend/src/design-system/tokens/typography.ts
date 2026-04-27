/**
 * DZIRE Design System — Typography Tokens
 */

export const typography = {
  // Font families
  display: "Barlow Condensed, sans-serif",
  body: "Inter, sans-serif",
  mono: "JetBrains Mono, monospace",

  // Type scale
  scale: {
    xs: "12px",
    sm: "14px",
    base: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "30px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "60px",
  },

  // Font weights
  weight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
  },

  // Line heights
  leading: {
    tight: "1.2",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },
} as const;

export type Typography = typeof typography;
