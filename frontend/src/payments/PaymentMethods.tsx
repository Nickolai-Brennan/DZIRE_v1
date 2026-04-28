/**
 * frontend/src/payments/PaymentMethods.tsx
 * Lists saved payment methods for the logged-in user.
 */
import React, { useEffect, useState } from "react";

interface PaymentMethod {
  id: string;
  type: string;
  brand?: string;
  last4?: string;
  exp_month?: number;
  exp_year?: number;
  is_default: boolean;
}

export const PaymentMethods: React.FC = () => {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("user_id") ?? "";

  useEffect(() => {
    if (!userId) return;
    fetch(`/api/payments/methods?user_id=${userId}`)
      .then((r) => (r.ok ? r.json() : []))
      .then(setMethods)
      .catch(() => setMethods([]))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <p className="text-textMuted">Loading payment methods…</p>;

  if (methods.length === 0) {
    return (
      <p className="text-textMuted italic">
        No saved payment methods. Add one via the{" "}
        <a href="/billing" className="text-primary underline">
          billing portal
        </a>
        .
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {methods.map((m) => (
        <li
          key={m.id}
          className="flex items-center gap-4 p-4 bg-surfaceAlt rounded-xl border border-white/10"
        >
          <span className="text-2xl">💳</span>
          <div>
            <p className="font-semibold text-textPrimary capitalize">
              {m.brand ?? m.type} ending in {m.last4 ?? "••••"}
            </p>
            <p className="text-sm text-textMuted">
              Expires {m.exp_month}/{m.exp_year}
              {m.is_default && (
                <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                  Default
                </span>
              )}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};
