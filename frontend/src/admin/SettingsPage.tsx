/**
 * frontend/src/admin/SettingsPage.tsx
 * Admin settings — site configuration, integrations, and security settings.
 */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Settings,
  Globe,
  Shield,
  Bell,
  Plug,
  Mail,
  Eye,
  EyeOff,
  CheckCircle,
} from "lucide-react";
import { AdminLayout } from "./AdminLayout";
import { isAdminAuthenticated } from "../lib/auth/token";

const SECTION_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  site: Globe,
  security: Shield,
  notifications: Bell,
  integrations: Plug,
  email: Mail,
};

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [siteSettings, setSiteSettings] = useState({
    siteName: "DZIRE",
    tagline: "The Adult Lifestyle Magazine",
    siteUrl: "https://dzire.com",
    maintenanceMode: false,
    analyticsEnabled: true,
  });

  const [notifSettings, setNotifSettings] = useState({
    newSignup: true,
    vipPurchase: true,
    affiliateClick: false,
    dailyDigest: true,
  });

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  const handleSave = (section: string) => {
    setSaved(section);
    setTimeout(() => setSaved(null), 2500);
  };

  const inputClass =
    "w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-textPrimary placeholder:text-textMuted focus:outline-none focus:border-primary text-sm";
  const labelClass = "block text-xs text-textMuted uppercase tracking-wider mb-1";
  const toggleClass = (on: boolean) =>
    `relative inline-flex w-11 h-6 rounded-full transition-colors cursor-pointer ${on ? "bg-primary" : "bg-white/10"}`;

  return (
    <AdminLayout title="Settings">
      <div className="max-w-3xl space-y-8">
        {/* Site Settings */}
        <section className="bg-surface rounded-2xl p-6 border border-white/8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-bold text-textPrimary">Site Settings</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Site Name</label>
              <input
                type="text"
                className={inputClass}
                value={siteSettings.siteName}
                onChange={(e) => setSiteSettings((s) => ({ ...s, siteName: e.target.value }))}
              />
            </div>
            <div>
              <label className={labelClass}>Tagline</label>
              <input
                type="text"
                className={inputClass}
                value={siteSettings.tagline}
                onChange={(e) => setSiteSettings((s) => ({ ...s, tagline: e.target.value }))}
              />
            </div>
            <div>
              <label className={labelClass}>Site URL</label>
              <input
                type="url"
                className={inputClass}
                value={siteSettings.siteUrl}
                onChange={(e) => setSiteSettings((s) => ({ ...s, siteUrl: e.target.value }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-textPrimary">Maintenance Mode</p>
                <p className="text-xs text-textMuted">Show maintenance page to visitors</p>
              </div>
              <button
                onClick={() => setSiteSettings((s) => ({ ...s, maintenanceMode: !s.maintenanceMode }))}
                className={toggleClass(siteSettings.maintenanceMode)}
              >
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${siteSettings.maintenanceMode ? "left-5" : "left-0.5"}`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-textPrimary">Analytics Tracking</p>
                <p className="text-xs text-textMuted">Enable event tracking across the site</p>
              </div>
              <button
                onClick={() => setSiteSettings((s) => ({ ...s, analyticsEnabled: !s.analyticsEnabled }))}
                className={toggleClass(siteSettings.analyticsEnabled)}
              >
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${siteSettings.analyticsEnabled ? "left-5" : "left-0.5"}`} />
              </button>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => handleSave("site")}
              className="px-6 py-2 bg-primary hover:bg-accent text-white font-bold rounded-xl text-sm transition-colors"
            >
              Save Site Settings
            </button>
            {saved === "site" && (
              <span className="flex items-center gap-1 text-green-400 text-sm">
                <CheckCircle className="w-4 h-4" /> Saved
              </span>
            )}
          </div>
        </section>

        {/* Security */}
        <section className="bg-surface rounded-2xl p-6 border border-white/8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-yellow-500/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-lg font-bold text-textPrimary">Security</h2>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-5">
            <p className="text-sm text-yellow-300 font-medium">⚠ Temporary admin credentials are active.</p>
            <p className="text-xs text-yellow-400/80 mt-1">Change your admin password before going to production.</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={inputClass + " pr-10"}
                  placeholder="Enter new password"
                />
                <button
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-textMuted hover:text-textPrimary"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className={labelClass}>Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className={inputClass}
                placeholder="Confirm new password"
              />
            </div>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => handleSave("security")}
              className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-background font-bold rounded-xl text-sm transition-colors"
            >
              Update Password
            </button>
            {saved === "security" && (
              <span className="flex items-center gap-1 text-green-400 text-sm">
                <CheckCircle className="w-4 h-4" /> Updated
              </span>
            )}
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-surface rounded-2xl p-6 border border-white/8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-lg font-bold text-textPrimary">Notifications</h2>
          </div>
          <div className="space-y-4">
            {[
              { key: "newSignup", label: "New Newsletter Signup", desc: "Notify when someone subscribes to the newsletter" },
              { key: "vipPurchase", label: "VIP Purchase", desc: "Notify when a new VIP subscription is purchased" },
              { key: "affiliateClick", label: "Affiliate Clicks", desc: "Log every affiliate CTA click to notifications" },
              { key: "dailyDigest", label: "Daily Digest Email", desc: "Receive a daily summary of key metrics" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-textPrimary">{item.label}</p>
                  <p className="text-xs text-textMuted">{item.desc}</p>
                </div>
                <button
                  onClick={() => setNotifSettings((s) => ({ ...s, [item.key]: !s[item.key as keyof typeof s] }))}
                  className={toggleClass(notifSettings[item.key as keyof typeof notifSettings])}
                >
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${notifSettings[item.key as keyof typeof notifSettings] ? "left-5" : "left-0.5"}`} />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => handleSave("notifications")}
              className="px-6 py-2 bg-primary hover:bg-accent text-white font-bold rounded-xl text-sm transition-colors"
            >
              Save Notifications
            </button>
            {saved === "notifications" && (
              <span className="flex items-center gap-1 text-green-400 text-sm">
                <CheckCircle className="w-4 h-4" /> Saved
              </span>
            )}
          </div>
        </section>

        {/* Integration Placeholders */}
        <section className="bg-surface rounded-2xl p-6 border border-white/8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Plug className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-lg font-bold text-textPrimary">Integrations</h2>
          </div>
          <div className="space-y-3">
            {[
              { name: "Stripe", desc: "Payment processing for VIP subscriptions", connected: false },
              { name: "Mailchimp / ConvertKit", desc: "Newsletter delivery and automation", connected: false },
              { name: "Google Analytics", desc: "Advanced traffic analytics", connected: false },
              { name: "Google Search Console", desc: "SEO rankings and crawl data", connected: false },
            ].map((integration) => (
              <div
                key={integration.name}
                className="flex items-center justify-between bg-surfaceAlt rounded-xl p-4 border border-white/8"
              >
                <div>
                  <p className="text-sm font-medium text-textPrimary">{integration.name}</p>
                  <p className="text-xs text-textMuted">{integration.desc}</p>
                </div>
                <button className="text-xs px-4 py-1.5 bg-primary/20 border border-primary/30 text-primary rounded-lg hover:bg-primary/30 transition-colors font-medium">
                  Connect
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};
