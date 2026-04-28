/**
 * frontend/src/admin/social-size-chart/SafeZoneNotes.tsx
 * Displays safe zone notes in a styled info box.
 */
import React from "react";

export interface SafeZoneNotesProps {
  notes: string;
}

export const SafeZoneNotes: React.FC<SafeZoneNotesProps> = ({ notes }) => {
  if (!notes) return null;
  return (
    <div className="flex gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm text-blue-300">
      <span className="flex-shrink-0 mt-0.5">ℹ️</span>
      <p>{notes}</p>
    </div>
  );
};
