/**
 * frontend/src/components/payments/PaymentStatus.tsx
 * Displays the result of a Stripe Checkout redirect.
 */
import React from "react";

interface PaymentStatusProps {
  success: boolean;
  cancelled: boolean;
}

export const PaymentStatus: React.FC<PaymentStatusProps> = ({
  success,
  cancelled,
}) => {
  if (success) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-4xl">
          ✓
        </div>
        <h2 className="text-2xl font-bold text-textPrimary">
          Payment Successful!
        </h2>
        <p className="text-textMuted">
          Your VIP membership is now active. Enjoy exclusive content and
          features.
        </p>
      </div>
    );
  }

  if (cancelled) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center text-4xl">
          ✕
        </div>
        <h2 className="text-2xl font-bold text-textPrimary">
          Checkout Cancelled
        </h2>
        <p className="text-textMuted">
          Your payment was not completed. No charges were made.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold text-textPrimary">Checkout</h2>
      <p className="text-textMuted">Processing your request…</p>
    </div>
  );
};
