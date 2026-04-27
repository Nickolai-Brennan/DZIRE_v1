// Component Template for DZIRE_v1
// Replace [Domain], [Component], and props with actual values.
// File: frontend/src/components/[domain]/[ComponentName].tsx

import { useState } from "react";
// import { [DomainType] } from "@/types/[domain]";

// --- Types ---
interface [ComponentName]Props {
  // Add props here
  title: string;
  // onAction?: (id: string) => void;
}

// --- Component ---
export function [ComponentName]({ title }: [ComponentName]Props) {
  // Local state (add as needed)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Event handlers
  const handleClick = () => {
    setIsLoading(true);
    try {
      // Action logic here
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Render
  if (isLoading) {
    return <div className="animate-pulse text-sm text-gray-400">Loading...</div>;
  }

  if (error) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {/* Add content here */}
      <button
        onClick={handleClick}
        className="mt-3 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      >
        Action
      </button>
    </div>
  );
}
