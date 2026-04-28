/**
 * frontend/src/components/monetization/CouponBox.tsx
 * Coupon / promo code input box.
 * Passes the code to the Stripe Checkout session via the backend.
 */
import React, { useState } from "react";

interface CouponBoxProps {
  onApply?: (code: string) => void;
}

export const CouponBox: React.FC<CouponBoxProps> = ({ onApply }) => {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "applied" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleApply = () => {
    const trimmed = code.trim();
    if (!trimmed) {
      setStatus("error");
      setMessage("Please enter a coupon code.");
      return;
    }
    // Optimistic: notify parent and show applied state.
    // Full validation happens at Stripe Checkout session creation.
    setStatus("applied");
    setMessage(`Coupon "${trimmed}" will be applied at checkout.`);
    onApply?.(trimmed);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-textMuted font-medium">
        Promo Code
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setStatus("idle");
            setMessage("");
          }}
          placeholder="Enter code"
          className="flex-1 px-3 py-2 bg-surfaceAlt border border-white/10 rounded-lg text-textPrimary text-sm focus:outline-none focus:border-primary"
        />
        <button
          onClick={handleApply}
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Apply
        </button>
      </div>
      {message && (
        <p
          className={`text-xs ${
            status === "applied" ? "text-green-400" : "text-red-400"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};
