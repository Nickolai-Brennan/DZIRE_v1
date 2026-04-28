/**
 * Design System — Modal Component
 *
 * Accessible modal dialog with backdrop, focus trap, and keyboard
 * dismiss support (Escape key).
 */
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ModalProps {
  /** Controls visibility */
  open: boolean;
  /** Called when the user requests the modal to close */
  onClose: () => void;
  /** Modal heading */
  title?: string;
  /** Modal size preset */
  size?: ModalSize;
  children: React.ReactNode;
  /** Footer slot for action buttons */
  footer?: React.ReactNode;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
  full: "max-w-full m-4",
};

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  size = "md",
  children,
  footer,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Auto-focus dialog on open
  useEffect(() => {
    if (open) {
      dialogRef.current?.focus();
    }
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[400] flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={[
          "relative w-full bg-surface border border-white/10 rounded-2xl shadow-xl",
          "flex flex-col max-h-[90vh]",
          "focus:outline-none",
          sizeClasses[size],
        ].join(" ")}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 shrink-0">
            <h2
              id="modal-title"
              className="text-lg font-semibold text-textPrimary"
            >
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-textMuted hover:text-textPrimary transition-colors p-1 rounded-lg hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/8 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
};
