import React from "react";

interface ScorePillProps {
  score: number;
  label: string;
  max?: number;
}

export const ScorePill: React.FC<ScorePillProps> = ({
  score,
  label,
  max = 10,
}) => {
  const percentage = (score / max) * 100;

  const getColorClass = () => {
    if (percentage >= 80)
      return "bg-green-500/20 text-green-400 border-green-500/30";
    if (percentage >= 60)
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    if (percentage >= 40)
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    return "bg-red-500/20 text-red-400 border-red-500/30";
  };

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${getColorClass()}`}
    >
      <span className="text-sm font-medium">{label}</span>
      <span className="text-lg font-bold">{score.toFixed(1)}</span>
    </div>
  );
};
