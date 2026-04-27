/**
 * Design System — FormField Component
 *
 * Wraps a label, optional hint, required indicator, and error message
 * around any form control child.
 */
import React from 'react';

export interface FormFieldProps {
  /** HTML id used to associate label with control */
  id: string;
  label: string;
  /** Helper text displayed below the label */
  hint?: string;
  /** Validation error message */
  error?: string;
  /** Mark the field as required */
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  hint,
  error,
  required = false,
  children,
  className = '',
}) => {
  const descriptionId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {/* Label */}
      <label
        htmlFor={id}
        className="text-sm font-medium text-textPrimary"
      >
        {label}
        {required && (
          <span className="ml-1 text-primary" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {/* Hint */}
      {hint && (
        <p id={descriptionId} className="text-xs text-textMuted">
          {hint}
        </p>
      )}

      {/* Control — forward aria props via cloneElement */}
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
            id,
            'aria-describedby':
              [descriptionId, errorId].filter(Boolean).join(' ') || undefined,
            'aria-invalid': error ? true : undefined,
            'aria-required': required ? true : undefined,
          })
        : children}

      {/* Error */}
      {error && (
        <p id={errorId} className="text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

// ── Shared input style helper (export for reuse) ───────────────
export const inputBaseClasses =
  'w-full rounded-xl bg-surfaceAlt border border-white/10 px-4 py-2.5 text-sm text-textPrimary placeholder:text-textMuted ' +
  'focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 ' +
  'aria-invalid:border-red-500 aria-invalid:ring-red-500/30 ' +
  'disabled:opacity-50 disabled:cursor-not-allowed ' +
  'transition-colors duration-200';
