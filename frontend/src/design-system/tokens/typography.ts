/**
 * Design System — Typography Tokens
 *
 * Display: Barlow Condensed  → headlines, hero titles, editorial
 * Body:    Inter             → UI, articles, dashboards
 * Mono:    JetBrains Mono    → code, IDs, metrics, logs
 */

export const typography = {
  // ── Font families ─────────────────────────────────────────
  display: "'Barlow Condensed', sans-serif",
  body: "'Inter', sans-serif",
  mono: "'JetBrains Mono', monospace",

  // ── Font size scale (px) ──────────────────────────────────
  scale: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '60px',
    '7xl': '72px',
  },

  // ── Font weights ──────────────────────────────────────────
  weight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  // ── Line heights ──────────────────────────────────────────
  leading: {
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },

  // ── Letter spacing ────────────────────────────────────────
  tracking: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

export type Typography = typeof typography;
