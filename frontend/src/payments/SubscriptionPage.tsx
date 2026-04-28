/**
 * frontend/src/payments/SubscriptionPage.tsx
 * Stripe Checkout subscription page — shows VIP plans and redirects to Stripe.
 */
import React, { useEffect, useState } from "react";
import { PricingTable } from "../components/payments/PricingTable";

interface Plan {
  id: string;
  name: string;
  price: number;
  billing_interval: string;
  description?: string;
  features?: string[];
  status: string;
}

export const SubscriptionPage: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/subscriptions/plans")
      .then((r) => (r.ok ? r.json() : []))
      .then((data: Plan[]) =>
        setPlans(data.filter((p) => p.status === "active")),
      )
      .catch(() => setPlans([]))
      .finally(() => setLoading(false));
  }, []);

  const handleSubscribe = async (priceId: string) => {
    try {
      const userId = localStorage.getItem("user_id") ?? "";
      const res = await fetch("/api/subscriptions/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price_id: priceId, user_id: userId }),
      });
      if (!res.ok) throw new Error("Failed to create checkout session");
      const { url } = await res.json();
      window.location.href = url;
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Unable to start checkout. Please try again.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-textPrimary mb-4">
          Choose Your Plan
        </h1>
        <p className="text-textMuted text-lg max-w-xl mx-auto">
          Unlock VIP content, ad-free experience, and exclusive features.
        </p>
      </div>

      {loading && <p className="text-center text-textMuted">Loading plans…</p>}

      {!loading && <PricingTable plans={plans} onSubscribe={handleSubscribe} />}
    </div>
  );
};
