/**
 * Design System — Color Tokens
 * Aligned with the DZIRE brand palette (dark luxury).
 * These values mirror the @theme variables in index.css and extend them
 * with a full semantic + utility token set.
 */

export const colors = {
  // ── Core brand ───────────────────────────────────────────
  background: '#09090B',
  surface: '#15151C',
  surfaceAlt: '#1D1D26',

  // ── Primary (rose-red) ───────────────────────────────────
  primary: {
    50: '#FFF1F2',
    100: '#FFE4E6',
    200: '#FECDD3',
    400: '#FB7185',
    500: '#E11D48',
    600: '#BE123C',
    700: '#9F1239',
    900: '#4C0519',
  },

  // ── Accent (hot pink / fuchsia) ──────────────────────────
  accent: {
    400: '#F472B6',
    500: '#F43F5E',
    600: '#E11D48',
  },

  // ── Gold ─────────────────────────────────────────────────
  gold: {
    400: '#F9D97C',
    500: '#F5C451',
    600: '#D4A017',
  },

  // ── Secondary (teal) ─────────────────────────────────────
  secondary: {
    50: '#ECFEFF',
    100: '#CFFAFE',
    500: '#06B6D4',
    600: '#0891B2',
    900: '#164E63',
  },

  // ── Neutral ──────────────────────────────────────────────
  neutral: {
    50: '#FAFAFA',
    100: '#F4F4F5',
    200: '#E4E4E7',
    400: '#A1A1AA',
    500: '#71717A',
    700: '#3F3F46',
    800: '#27272A',
    900: '#18181B',
  },

  // ── Text ─────────────────────────────────────────────────
  textPrimary: '#F8FAFC',
  textMuted: '#A1A1AA',
  textSubtle: '#71717A',

  // ── Semantic ─────────────────────────────────────────────
  success: '#16A34A',
  successLight: '#22C55E',
  warning: '#F59E0B',
  warningLight: '#FCD34D',
  danger: '#DC2626',
  dangerLight: '#F87171',
  info: '#2563EB',
  infoLight: '#60A5FA',

  // ── Special roles ─────────────────────────────────────────
  vip: '#C084FC',
  vipDark: '#7E22CE',
  sponsor: '#FACC15',
  sponsorDark: '#B45309',

  // ── Overlay / glass ──────────────────────────────────────
  overlayLight: 'rgba(255,255,255,0.06)',
  overlayMedium: 'rgba(255,255,255,0.12)',
  overlayDark: 'rgba(0,0,0,0.60)',
} as const;

export type Colors = typeof colors;
