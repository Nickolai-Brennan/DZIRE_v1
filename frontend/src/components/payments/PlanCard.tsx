/**
 * frontend/src/components/payments/PlanCard.tsx
 * Single VIP plan card with subscribe button.
 */
import React from "react";

interface Plan {
  id: string;
  name: string;
  price: number;
  billing_interval: string;
  description?: string;
  features?: string[];
}

interface PlanCardProps {
  plan: Plan;
  highlighted?: boolean;
  onSubscribe: (planId: string) => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  highlighted = false,
  onSubscribe,
}) => {
  return (
    <div
      className={`relative p-8 rounded-2xl border flex flex-col transition-all ${
        highlighted
          ? "bg-primary/10 border-primary shadow-lg shadow-primary/20"
          : "bg-surfaceAlt border-white/10"
      }`}
    >
      {highlighted && (
        <span className="absolute top-4 right-4 text-xs font-bold bg-primary text-white px-3 py-1 rounded-full">
          Most Popular
        </span>
      )}

      <h2 className="text-xl font-bold text-textPrimary mb-2">{plan.name}</h2>

      <div className="text-3xl font-bold text-primary mb-1">
        ${plan.price}
        <span className="text-sm text-textMuted font-normal">
          /{plan.billing_interval}
        </span>
      </div>

      {plan.description && (
        <p className="text-textMuted text-sm mt-3 mb-4">{plan.description}</p>
      )}

      {plan.features && plan.features.length > 0 && (
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

      <button
        onClick={() => onSubscribe(plan.id)}
        className={`mt-auto w-full py-3 rounded-lg font-semibold transition-opacity hover:opacity-90 ${
          highlighted
            ? "bg-primary text-white"
            : "bg-white/10 text-textPrimary hover:bg-white/20"
        }`}
      >
        Subscribe
      </button>
    </div>
  );
};
