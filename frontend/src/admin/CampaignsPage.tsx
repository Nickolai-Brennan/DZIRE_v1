/**
 * frontend/src/admin/CampaignsPage.tsx
 * Admin campaigns manager — track marketing campaigns.
 */
import React, { useState } from "react";
import { AdminLayout } from "./AdminLayout";

type CampaignStatus =
  | "planning"
  | "active"
  | "paused"
  | "completed"
  | "cancelled";

interface Campaign {
  id: string;
  name: string;
  status: CampaignStatus;
  start_date: string;
  end_date: string;
  budget: number;
  spent: number;
}

const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: "1",
    name: "Summer 2025 Launch",
    status: "active",
    start_date: "2025-06-15",
    end_date: "2025-08-31",
    budget: 5000,
    spent: 1820,
  },
  {
    id: "2",
    name: "Influencer Collab Q3",
    status: "planning",
    start_date: "2025-07-01",
    end_date: "2025-09-30",
    budget: 12000,
    spent: 0,
  },
  {
    id: "3",
    name: "Back to School Promo",
    status: "planning",
    start_date: "2025-08-01",
    end_date: "2025-09-15",
    budget: 3500,
    spent: 0,
  },
  {
    id: "4",
    name: "Spring Collection",
    status: "completed",
    start_date: "2025-03-01",
    end_date: "2025-05-31",
    budget: 8000,
    spent: 7650,
  },
  {
    id: "5",
    name: "Valentine's Day Special",
    status: "completed",
    start_date: "2025-02-01",
    end_date: "2025-02-14",
    budget: 2000,
    spent: 1990,
  },
  {
    id: "6",
    name: "Holiday Gift Guide",
    status: "paused",
    start_date: "2025-11-01",
    end_date: "2025-12-31",
    budget: 6000,
    spent: 450,
  },
];

const STATUS_COLORS: Record<CampaignStatus, string> = {
  planning: "bg-purple-500/20 text-purple-400",
  active: "bg-green-500/20 text-green-400",
  paused: "bg-yellow-500/20 text-yellow-400",
  completed: "bg-blue-500/20 text-blue-400",
  cancelled: "bg-red-500/20 text-red-400",
};

export const CampaignsPage: React.FC = () => {
  const [campaigns] = useState<Campaign[]>(MOCK_CAMPAIGNS);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

  return (
    <AdminLayout title="Campaigns">
      <div className="flex items-center justify-between mb-6">
        <p className="text-textMuted text-sm">{campaigns.length} campaigns</p>
        <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          + New Campaign
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-textMuted text-left">
              <th className="pb-3 pr-4 font-medium">Name</th>
              <th className="pb-3 pr-4 font-medium">Status</th>
              <th className="pb-3 pr-4 font-medium">Start</th>
              <th className="pb-3 pr-4 font-medium">End</th>
              <th className="pb-3 pr-4 font-medium">Budget</th>
              <th className="pb-3 font-medium">Spent</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {campaigns.map((c) => (
              <tr key={c.id} className="hover:bg-white/3 transition-colors">
                <td className="py-3 pr-4 text-textPrimary font-medium">
                  {c.name}
                </td>
                <td className="py-3 pr-4">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${STATUS_COLORS[c.status]}`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="py-3 pr-4 text-textMuted">{c.start_date}</td>
                <td className="py-3 pr-4 text-textMuted">{c.end_date}</td>
                <td className="py-3 pr-4 text-textMuted">{fmt(c.budget)}</td>
                <td className="py-3 text-textMuted">{fmt(c.spent)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};
