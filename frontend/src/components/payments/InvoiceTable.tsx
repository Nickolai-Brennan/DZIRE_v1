/**
 * frontend/src/components/payments/InvoiceTable.tsx
 * Table component listing billing invoices.
 */
import React from "react";

interface Invoice {
  id: string;
  provider_invoice_id?: string;
  amount_due: number;
  amount_paid: number;
  currency: string;
  status: string;
  invoice_url?: string;
  pdf_url?: string;
}

interface InvoiceTableProps {
  invoices: Invoice[];
}

const statusColor = (status: string) => {
  switch (status) {
    case "paid":
      return "text-green-400";
    case "open":
      return "text-yellow-400";
    case "void":
    case "uncollectible":
      return "text-red-400";
    default:
      return "text-textMuted";
  }
};

export const InvoiceTable: React.FC<InvoiceTableProps> = ({ invoices }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-sm text-left">
        <thead className="bg-surfaceAlt text-textMuted uppercase text-xs">
          <tr>
            <th className="px-4 py-3">Invoice</th>
            <th className="px-4 py-3">Amount Due</th>
            <th className="px-4 py-3">Amount Paid</th>
            <th className="px-4 py-3">Currency</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr
              key={inv.id}
              className="border-t border-white/5 hover:bg-surfaceAlt/50 transition-colors"
            >
              <td className="px-4 py-3 text-textMuted font-mono text-xs">
                {inv.provider_invoice_id?.slice(-8) ?? inv.id.slice(-8)}
              </td>
              <td className="px-4 py-3 text-textPrimary">
                ${inv.amount_due.toFixed(2)}
              </td>
              <td className="px-4 py-3 text-textPrimary">
                ${inv.amount_paid.toFixed(2)}
              </td>
              <td className="px-4 py-3 text-textMuted uppercase">
                {inv.currency}
              </td>
              <td className={`px-4 py-3 font-medium ${statusColor(inv.status)}`}>
                {inv.status}
              </td>
              <td className="px-4 py-3 flex gap-3">
                {inv.invoice_url && (
                  <a
                    href={inv.invoice_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    View
                  </a>
                )}
                {inv.pdf_url && (
                  <a
                    href={inv.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    PDF
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
