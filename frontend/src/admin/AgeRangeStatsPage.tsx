/**
 * frontend/src/admin/AgeRangeStatsPage.tsx
 * Admin age range stats — self-reported age ranges, content preferences, and conversions.
 */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Users, ShieldCheck } from "lucide-react";
import { AdminLayout } from "./AdminLayout";
import { isAdminAuthenticated } from "../lib/auth/token";

const ageRangeData = [
  { range: "18–24", users: 1840, pct: 21.8, color: "#E11D48" },
  { range: "25–34", users: 3120, pct: 37.0, color: "#F5C451" },
  { range: "35–44", users: 1980, pct: 23.5, color: "#60A5FA" },
  { range: "45–54", users: 980, pct: 11.6, color: "#A78BFA" },
  { range: "55+", users: 512, pct: 6.1, color: "#34D399" },
];

const conversionByAge = [
  { range: "18–24", rate: 2.8 },
  { range: "25–34", rate: 4.5 },
  { range: "35–44", rate: 5.1 },
  { range: "45–54", rate: 4.8 },
  { range: "55+", rate: 3.2 },
];

const contentPreferences = [
  {
    category: "Positions",
    "18–24": 34,
    "25–34": 28,
    "35–44": 22,
    "45–54": 11,
    "55+": 5,
  },
  {
    category: "Reviews",
    "18–24": 18,
    "25–34": 35,
    "35–44": 28,
    "45–54": 14,
    "55+": 5,
  },
  {
    category: "Dictionary",
    "18–24": 30,
    "25–34": 32,
    "35–44": 24,
    "45–54": 10,
    "55+": 4,
  },
  {
    category: "Dolls",
    "18–24": 28,
    "25–34": 36,
    "35–44": 22,
    "45–54": 10,
    "55+": 4,
  },
  {
    category: "Stories",
    "18–24": 22,
    "25–34": 34,
    "35–44": 25,
    "45–54": 13,
    "55+": 6,
  },
  {
    category: "Articles",
    "18–24": 16,
    "25–34": 31,
    "35–44": 29,
    "45–54": 16,
    "55+": 8,
  },
];

const COLORS = ["#E11D48", "#F5C451", "#60A5FA", "#A78BFA", "#34D399"];

export const AgeRangeStatsPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  return (
    <AdminLayout title="Age Range Stats">
      {/* Privacy Note */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-300">
          Age range data is self-reported and optional. No age verification is
          enforced. All DZIRE users must confirm they are 18+ at signup. This
          data is aggregated and anonymous.
        </p>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Pie Chart */}
        <div className="bg-surface rounded-2xl p-6 border border-white/8">
          <div className="flex items-center gap-2 mb-5">
            <Users className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-textPrimary">
              Audience by Age Range
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={ageRangeData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="users"
                nameKey="range"
                label={(props) => {
                  const d = props as unknown as { range: string; pct: number };
                  return `${d.range}: ${d.pct}%`;
                }}
                labelLine={false}
              >
                {ageRangeData.map((entry, index) => (
                  <Cell
                    key={entry.range}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#15151C",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  color: "#F8FAFC",
                }}
                formatter={(
                  v,
                  _name,
                  props,
                ) => [`${v?.toLocaleString() ?? v} users`, (props.payload as { range?: string })?.range ?? ""]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Conversion by Age */}
        <div className="bg-surface rounded-2xl p-6 border border-white/8">
          <h2 className="text-lg font-bold text-textPrimary mb-5">
            Conversion Rate by Age Range
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={conversionByAge}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
              />
              <XAxis
                dataKey="range"
                tick={{ fill: "#94A3B8", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#94A3B8", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#15151C",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  color: "#F8FAFC",
                }}
                formatter={(v) => [`${v ?? ""}%`, "Conversion Rate"]}
              />
              <Bar
                dataKey="rate"
                fill="#F5C451"
                radius={[6, 6, 0, 0]}
                name="Conv. Rate"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Content Preference Table */}
      <div className="bg-surface rounded-2xl p-6 border border-white/8">
        <h2 className="text-lg font-bold text-textPrimary mb-5">
          Content Preferences by Age Range (% of content type audience)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-textMuted text-xs uppercase tracking-wider">
                <th className="pb-3">Content</th>
                {ageRangeData.map((a) => (
                  <th key={a.range} className="pb-3 text-right">
                    {a.range}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {contentPreferences.map((row) => (
                <tr key={row.category}>
                  <td className="py-3 text-textPrimary font-medium">
                    {row.category}
                  </td>
                  {ageRangeData.map((a) => (
                    <td
                      key={a.range}
                      className="py-3 text-right text-textMuted"
                    >
                      {row[a.range as keyof typeof row]}%
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Age Range Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
        {ageRangeData.map((item) => (
          <div
            key={item.range}
            className="bg-surface rounded-2xl p-5 border border-white/8 text-center"
          >
            <p className="text-2xl font-black text-textPrimary">{item.pct}%</p>
            <p className="text-sm text-textMuted mt-1">{item.range}</p>
            <p className="text-xs text-textMuted mt-0.5">
              {item.users.toLocaleString()} users
            </p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};
