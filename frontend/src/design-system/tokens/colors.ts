/**
 * DZIRE Design System — Color Tokens
 *
 * Source of truth for all brand and semantic colors.
 * CSS custom properties in index.css mirror these values for Tailwind utility classes.
 */

export const colors = {
  // ── Brand surfaces ────────────────────────────────────────────────────────
  background: "#09090B",
  surface: "#15151C",
  surfaceAlt: "#1D1D26",

  // ── Brand palette ─────────────────────────────────────────────────────────
  primary: {
    DEFAULT: "#E11D48",
    hover: "#F43F5E",
    foreground: "#FFFFFF",
  },
  accent: {
    DEFAULT: "#F43F5E",
    hover: "#FB7185",
    foreground: "#FFFFFF",
  },
  gold: {
    DEFAULT: "#F5C451",
    hover: "#F7D070",
    foreground: "#09090B",
  },

  // ── Text ──────────────────────────────────────────────────────────────────
  text: {
    primary: "#F8FAFC",
    muted: "#A1A1AA",
  },

  // ── Semantic states ───────────────────────────────────────────────────────
  success: "#16A34A",
  warning: "#F59E0B",
  danger: "#DC2626",
  info: "#2563EB",

  // ── Premium tiers ─────────────────────────────────────────────────────────
  vip: "#C084FC",
  sponsor: "#FACC15",

  // ── Neutral scale ─────────────────────────────────────────────────────────
  neutral: {
    50: "#FAFAFA",
    100: "#F4F4F5",
    200: "#E4E4E7",
    500: "#71717A",
    700: "#3F3F46",
    900: "#18181B",
  },
} as const;

export type Colors = typeof colors;
