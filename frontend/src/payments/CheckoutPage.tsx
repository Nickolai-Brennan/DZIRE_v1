/**
 * frontend/src/payments/CheckoutPage.tsx
 * Post-checkout landing page — shows success or cancel status.
 */
import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import { PaymentStatus } from "../components/payments/PaymentStatus";

export const CheckoutPage: React.FC = () => {
  const [params] = useSearchParams();
  const checkout = params.get("checkout");

  const success = checkout === "success";
  const cancelled = checkout === "cancel";

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <PaymentStatus success={success} cancelled={cancelled} />
      <div className="mt-8">
        {success ? (
          <Link
            to="/billing"
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            View Billing
          </Link>
        ) : (
          <Link
            to="/subscribe"
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Try Again
          </Link>
        )}
      </div>
    </div>
  );
};
