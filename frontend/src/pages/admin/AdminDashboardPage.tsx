/**
 * frontend/src/pages/admin/AdminDashboardPage.tsx
 * Admin dashboard — full analytics overview with metric cards,
 * traffic chart, top content table, and recent activity feed.
 */
import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  Eye,
  Users,
  Mail,
  Crown,
  Link2,
  Building2,
  TrendingUp,
  Star,
} from "lucide-react";
import { AdminLayout } from "../../admin/AdminLayout";
import { mockAdminStats, mockMonetization } from "../../data/mockAdminStats";
import { mockDolls } from "../../data/mockDolls";
import { isAdminAuthenticated } from "../../lib/auth/token";

const trafficData = [
  { day: "Mon", views: 18200, users: 3400 },
  { day: "Tue", views: 21500, users: 4100 },
  { day: "Wed", views: 19800, users: 3700 },
  { day: "Thu", views: 24300, users: 5200 },
  { day: "Fri", views: 28100, users: 6000 },
  { day: "Sat", views: 31400, users: 7200 },
  { day: "Sun", views: 26500, users: 5800 },
];

const contentTypeData = [
  { name: "Positions", views: 42000 },
  { name: "Reviews", views: 31500 },
  { name: "Dictionary", views: 19800 },
  { name: "Dolls", views: 27400 },
  { name: "Stories", views: 14200 },
  { name: "Articles", views: 22100 },
];

const METRIC_CARDS = [
  {
    label: "Page Views",
    value: mockAdminStats.pageViews.toLocaleString(),
    icon: Eye,
    color: "text-primary",
    bg: "bg-primary/10",
    change: "+12.4%",
    up: true,
  },
  {
    label: "Active Users",
    value: mockAdminStats.activeUsers.toLocaleString(),
    icon: Users,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    change: "+8.1%",
    up: true,
  },
  {
    label: "Newsletter Signups",
    value: mockAdminStats.newsletterSignups.toLocaleString(),
    icon: Mail,
    color: "text-green-400",
    bg: "bg-green-500/10",
    change: "+23.7%",
    up: true,
  },
  {
    label: "VIP Members",
    value: mockAdminStats.vipMembers.toLocaleString(),
    icon: Crown,
    color: "text-gold",
    bg: "bg-gold/10",
    change: "+5.2%",
    up: true,
  },
  {
    label: "Affiliate Clicks",
    value: mockAdminStats.affiliateClicks.toLocaleString(),
    icon: Link2,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    change: "+17.9%",
    up: true,
  },
  {
    label: "Sponsor Clicks",
    value: mockAdminStats.sponsorClicks.toLocaleString(),
    icon: Building2,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    change: "-2.3%",
    up: false,
  },
];

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  const featuredDolls = mockDolls.filter((d) => d.isFeatured).slice(0, 3);

  return (
    <AdminLayout title="Dashboard">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {METRIC_CARDS.map((card) => (
          <div
            key={card.label}
            className="bg-surface rounded-2xl p-5 border border-white/8"
          >
            <div
              className={`w-9 h-9 rounded-xl ${card.bg} flex items-center justify-center mb-3`}
            >
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
            <p className="text-2xl font-black text-textPrimary">{card.value}</p>
            <p className="text-xs text-textMuted mt-1">{card.label}</p>
            <p
              className={`text-xs mt-1 font-medium ${card.up ? "text-green-400" : "text-red-400"}`}
            >
              {card.change} vs last week
            </p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Traffic Chart */}
        <div className="lg:col-span-2 bg-surface rounded-2xl p-6 border border-white/8">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-textPrimary">
              Traffic — Last 7 Days
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={trafficData}>
              <defs>
                <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E11D48" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#E11D48" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="usersGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#60A5FA" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
              />
              <XAxis
                dataKey="day"
                tick={{ fill: "#94A3B8", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#94A3B8", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#15151C",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  color: "#F8FAFC",
                }}
              />
              <Area
                type="monotone"
                dataKey="views"
                stroke="#E11D48"
                strokeWidth={2}
                fill="url(#viewsGrad)"
                name="Page Views"
              />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#60A5FA"
                strokeWidth={2}
                fill="url(#usersGrad)"
                name="Users"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Content Type Chart */}
        <div className="bg-surface rounded-2xl p-6 border border-white/8">
          <h2 className="text-lg font-bold text-textPrimary mb-6">
            Views by Content Type
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={contentTypeData} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
                horizontal={false}
              />
              <XAxis
                type="number"
                tick={{ fill: "#94A3B8", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                dataKey="name"
                type="category"
                tick={{ fill: "#94A3B8", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={65}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#15151C",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  color: "#F8FAFC",
                }}
              />
              <Bar dataKey="views" fill="#E11D48" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Top Content */}
        <div className="lg:col-span-2 bg-surface rounded-2xl p-6 border border-white/8">
          <h2 className="text-lg font-bold text-textPrimary mb-5">
            Top Content
          </h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-textMuted text-xs uppercase tracking-wider">
                <th className="pb-3">Title</th>
                <th className="pb-3">Type</th>
                <th className="pb-3 text-right">Views</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockAdminStats.topContent.map((item, i) => (
                <tr key={i}>
                  <td className="py-3 text-textPrimary font-medium">
                    {item.title}
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full bg-surfaceAlt text-xs text-textMuted capitalize">
                      {item.type}
                    </span>
                  </td>
                  <td className="py-3 text-right text-gold font-bold">
                    {item.views.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Activity */}
        <div className="bg-surface rounded-2xl p-6 border border-white/8">
          <h2 className="text-lg font-bold text-textPrimary mb-5">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {mockAdminStats.recentActivity.map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <p className="text-sm text-textPrimary">{item.action}</p>
                  <p className="text-xs text-textMuted mt-0.5">
                    {item.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DZIRE Dolls Snapshot */}
      <div className="bg-surface rounded-2xl p-6 border border-white/8 mb-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-textPrimary">
            DZIRE Dolls Snapshot
          </h2>
          <Link
            to="/admin/dolls"
            className="text-sm text-primary hover:underline"
          >
            Manage Dolls →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {featuredDolls.map((doll) => (
            <div
              key={doll.id}
              className="flex items-center gap-4 bg-surfaceAlt rounded-xl p-4 border border-white/8"
            >
              <img
                src={doll.image}
                alt={doll.name}
                className="w-12 h-12 rounded-full object-cover shrink-0"
              />
              <div>
                <p className="font-bold text-textPrimary text-sm">
                  {doll.name}
                </p>
                <p className="text-xs text-textMuted">{doll.tagline}</p>
                {doll.isSponsored && (
                  <span className="text-xs text-gold">● Sponsored</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Affiliate Revenue Snapshot */}
      <div className="bg-surface rounded-2xl p-6 border border-white/8">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-gold" />
            <h2 className="text-lg font-bold text-textPrimary">
              Revenue Snapshot
            </h2>
          </div>
          <Link
            to="/admin/monetization"
            className="text-sm text-primary hover:underline"
          >
            View Full Report →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {mockMonetization.affiliatePartners.slice(0, 3).map((partner) => (
            <div
              key={partner.name}
              className="bg-surfaceAlt rounded-xl p-4 border border-white/8"
            >
              <p className="font-bold text-textPrimary text-sm">
                {partner.name}
              </p>
              <p className="text-xs text-textMuted mb-2">{partner.category}</p>
              <p className="text-gold font-black text-lg">
                ${partner.revenue.toLocaleString()}
              </p>
              <p className="text-xs text-textMuted">
                {partner.clicks} clicks · {partner.conversions} sales
              </p>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};
