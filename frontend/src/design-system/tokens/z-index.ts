/**
 * Design System — Z-Index Tokens
 * Establishes a clear stacking order for the application.
 */

export const zIndex = {
  base: 0,
  raised: 10,
  dropdown: 100,
  sticky: 200,
  overlay: 300,
  modal: 400,
  popover: 500,
  toast: 600,
  tooltip: 700,
  max: 9999,
} as const;

export type ZIndex = typeof zIndex;
