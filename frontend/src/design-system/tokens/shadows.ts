/**
 * Design System — Shadow Tokens
 * Designed for the dark luxury DZIRE aesthetic.
 */

export const shadows = {
  none: 'none',
  sm: '0 1px 2px rgba(0,0,0,0.06)',
  md: '0 6px 16px rgba(0,0,0,0.08)',
  lg: '0 12px 32px rgba(0,0,0,0.12)',
  xl: '0 20px 48px rgba(0,0,0,0.20)',
  inner: 'inset 0 2px 4px rgba(0,0,0,0.15)',

  // Brand glow effects
  glowPrimary: '0 0 24px rgba(225,29,72,0.35)',
  glowGold: '0 0 20px rgba(245,196,81,0.30)',
  glowVip: '0 0 20px rgba(192,132,252,0.30)',

  // Glass card
  glass: '0 8px 32px rgba(0,0,0,0.36), inset 0 1px 0 rgba(255,255,255,0.06)',
} as const;

export type Shadows = typeof shadows;
