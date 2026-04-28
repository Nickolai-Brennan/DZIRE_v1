/**
 * frontend/src/pages/VIPSubscribePage.tsx
 * Public VIP subscription plans page.
 */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface VipPlan {
  id: string;
  name: string;
  price: number;
  billing_interval: string;
  description?: string;
  features?: string[];
  status: string;
}

export const VIPSubscribePage: React.FC = () => {
  const [plans, setPlans] = useState<VipPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/vip/plans")
      .then((r) => (r.ok ? r.json() : []))
      .then((data: VipPlan[]) =>
        setPlans(data.filter((p) => p.status === "active")),
      )
      .catch(() => setPlans([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-textPrimary mb-4">
          VIP Membership
        </h1>
        <p className="text-textMuted text-lg max-w-xl mx-auto">
          Get exclusive access to VIP-only content, early releases, and premium
          features.
        </p>
      </div>

      {loading && <p className="text-center text-textMuted">Loading plans…</p>}

      {!loading && plans.length === 0 && (
        <p className="text-center text-textMuted italic">
          No VIP plans available right now.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="p-8 bg-surfaceAlt rounded-2xl border border-white/10 flex flex-col"
          >
            <h2 className="text-xl font-bold text-textPrimary mb-2">
              {plan.name}
            </h2>
            <div className="text-3xl font-bold text-primary mb-1">
              ${plan.price}
              <span className="text-sm text-textMuted font-normal">
                /{plan.billing_interval}
              </span>
            </div>
            {plan.description && (
              <p className="text-textMuted text-sm mt-3 mb-4">
                {plan.description}
              </p>
            )}
            {plan.features &&
              Array.isArray(plan.features) &&
              plan.features.length > 0 && (
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-textMuted"
                    >
                      <span className="text-primary mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              )}
            <button className="mt-auto w-full py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
              Subscribe
            </button>
          </div>
        ))}
      </div>

      <p className="text-center text-textMuted text-sm mt-8">
        Already a VIP member?{" "}
        <Link to="/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};
