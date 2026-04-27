/**
 * Design System — DataTable Component
 *
 * Lightweight, accessible HTML table wrapper with sorting indicators,
 * striped rows option, and an empty-state slot.
 */
import React from "react";

export interface ColumnDef<T> {
  /** Unique key that maps to a property of T, or a custom id */
  key: string;
  /** Column header label */
  header: React.ReactNode;
  /** Render a cell given the row data */
  render?: (row: T, index: number) => React.ReactNode;
  /** Right-align this column (useful for numeric data) */
  align?: "left" | "center" | "right";
  /** Optional className for the td cells */
  cellClassName?: string;
}

export interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  /** Row key extractor */
  rowKey: (row: T, index: number) => string | number;
  /** Alternating row background */
  striped?: boolean;
  /** Slot shown when data is empty */
  emptyState?: React.ReactNode;
  /** Additional className for the table wrapper */
  className?: string;
  caption?: string;
}

const alignClass = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function DataTable<T>({
  columns,
  data,
  rowKey,
  striped = false,
  emptyState,
  className = "",
  caption,
}: DataTableProps<T>) {
  return (
    <div
      className={`w-full overflow-x-auto rounded-xl border border-white/8 ${className}`}
    >
      <table className="w-full text-sm border-collapse">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="border-b border-white/8 bg-surfaceAlt">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={[
                  "px-4 py-3 text-xs font-semibold text-textMuted uppercase tracking-wider",
                  alignClass[col.align ?? "left"],
                ].join(" ")}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="py-10 text-center text-textMuted"
              >
                {emptyState ?? "No data available."}
              </td>
            </tr>
          ) : (
            data.map((row, rowIdx) => (
              <tr
                key={rowKey(row, rowIdx)}
                className={[
                  "border-b border-white/5 transition-colors",
                  striped && rowIdx % 2 === 1
                    ? "bg-white/[0.02]"
                    : "bg-transparent",
                  "hover:bg-white/[0.04]",
                ].join(" ")}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={[
                      "px-4 py-3 text-textPrimary",
                      alignClass[col.align ?? "left"],
                      col.cellClassName ?? "",
                    ].join(" ")}
                  >
                    {col.render
                      ? col.render(row, rowIdx)
                      : String((row as Record<string, unknown>)[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
