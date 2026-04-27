import React from 'react';
import { Table } from './Table';

interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  rows,
  emptyTitle = 'No data',
  emptyDescription = 'Nothing to display yet.',
  className = '',
}: DataTableProps<T>) {
  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-textPrimary font-semibold mb-1">{emptyTitle}</p>
        <p className="text-textMuted text-sm">{emptyDescription}</p>
      </div>
    );
  }

  return <Table columns={columns} rows={rows} className={className} />;
}
