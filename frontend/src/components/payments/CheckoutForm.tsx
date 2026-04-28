/**
 * frontend/src/components/payments/CheckoutForm.tsx
 * Checkout form component.
 * Uses Stripe Checkout redirect — clicking the button creates a session and
 * redirects the user to the hosted Stripe Checkout page.
 */
import React, { useState } from "react";

interface CheckoutFormProps {
  priceId: string;
  userId: string;
  label?: string;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  priceId,
  userId,
  label = "Subscribe Now",
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/subscriptions/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price_id: priceId, user_id: userId }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.detail ?? "Checkout failed");
      }
      const { url } = await res.json();
      window.location.href = url;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        {loading ? "Redirecting to Stripe…" : label}
      </button>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </div>
  );
};
