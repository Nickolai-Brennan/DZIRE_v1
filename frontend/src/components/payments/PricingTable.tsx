/**
 * frontend/src/components/payments/PricingTable.tsx
 * Grid of plan cards for the subscription page.
 */
import React from "react";
import { PlanCard } from "./PlanCard";

interface Plan {
  id: string;
  name: string;
  price: number;
  billing_interval: string;
  description?: string;
  features?: string[];
  status: string;
}

interface PricingTableProps {
  plans: Plan[];
  onSubscribe: (planId: string) => void;
}

export const PricingTable: React.FC<PricingTableProps> = ({
  plans,
  onSubscribe,
}) => {
  if (plans.length === 0) {
    return (
      <p className="text-center text-textMuted italic">
        No plans available right now.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans.map((plan, idx) => (
        <PlanCard
          key={plan.id}
          plan={plan}
          highlighted={idx === 1}
          onSubscribe={onSubscribe}
        />
      ))}
    </div>
  );
};
