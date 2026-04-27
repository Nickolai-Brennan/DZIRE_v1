import { AdminLayout } from '@/components/layout/AdminLayout';
import { StatCard } from '@/components/ui/StatCard';
import { mockAffiliateLinks, mockSponsorCampaigns, mockAdPlacements } from '@/data/mockMonetization';
import { ExternalLink } from 'lucide-react';
export function AdminMonetization() {
  return (
    <AdminLayout title="Monetization Dashboard">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[{label:'Affiliate Revenue',value:'$4,460',change:18},{label:'Sponsor Budget Active',value:'$13,000',change:12},{label:'Total Clicks',value:'16,074',change:8},{label:'Conversion Rate',value:'3.17%',change:0.4}].map(s=><StatCard key={s.label} {...s}/>)}
      </div>
      <div className="space-y-6">
        <div className="glass-card overflow-x-auto">
          <div className="px-5 py-3 border-b border-white/8"><h3 className="font-bold text-white">Affiliate Links</h3></div>
          <table className="w-full text-sm"><thead><tr className="border-b border-white/10">{['Product','Partner','Clicks','Conversions','Revenue','Status'].map(h=><th key={h} className="text-left px-4 py-3 text-white/40 font-medium">{h}</th>)}</tr></thead>
            <tbody>{mockAffiliateLinks.map(l=><tr key={l.id} className="border-b border-white/5 hover:bg-white/3"><td className="px-4 py-3"><div className="flex items-center gap-2 text-white font-medium">{l.name}<ExternalLink className="w-3 h-3 text-white/30"/></div></td><td className="px-4 py-3 text-white/60">{l.partner}</td><td className="px-4 py-3 text-white/60">{l.clicks.toLocaleString()}</td><td className="px-4 py-3 text-white/60">{l.conversions}</td><td className="px-4 py-3 text-green-400 font-semibold">${l.revenue.toLocaleString()}</td><td className="px-4 py-3"><span className={`text-xs font-semibold ${l.status==='active'?'text-green-400':'text-white/30'}`}>{l.status}</span></td></tr>)}</tbody>
          </table>
        </div>
        <div className="glass-card overflow-x-auto">
          <div className="px-5 py-3 border-b border-white/8"><h3 className="font-bold text-white">Sponsor Campaigns</h3></div>
          <table className="w-full text-sm"><thead><tr className="border-b border-white/10">{['Sponsor','Campaign','Impressions','Clicks','Budget','Status'].map(h=><th key={h} className="text-left px-4 py-3 text-white/40 font-medium">{h}</th>)}</tr></thead>
            <tbody>{mockSponsorCampaigns.map(c=><tr key={c.id} className="border-b border-white/5 hover:bg-white/3"><td className="px-4 py-3 text-white font-medium">{c.sponsorName}</td><td className="px-4 py-3 text-white/60">{c.campaignName}</td><td className="px-4 py-3 text-white/60">{c.impressions.toLocaleString()}</td><td className="px-4 py-3 text-white/60">{c.clicks.toLocaleString()}</td><td className="px-4 py-3 text-yellow-400 font-semibold">${c.budget.toLocaleString()}</td><td className="px-4 py-3"><span className="text-xs text-green-400 font-semibold">{c.status}</span></td></tr>)}</tbody>
          </table>
        </div>
        <div className="glass-card overflow-x-auto">
          <div className="px-5 py-3 border-b border-white/8"><h3 className="font-bold text-white">Ad Placements</h3></div>
          <table className="w-full text-sm"><thead><tr className="border-b border-white/10">{['Name','Location','Format','Impressions','Clicks','CTR'].map(h=><th key={h} className="text-left px-4 py-3 text-white/40 font-medium">{h}</th>)}</tr></thead>
            <tbody>{mockAdPlacements.map(a=><tr key={a.id} className="border-b border-white/5 hover:bg-white/3"><td className="px-4 py-3 text-white font-medium">{a.name}</td><td className="px-4 py-3 text-white/60">{a.location}</td><td className="px-4 py-3 text-white/40 font-mono text-xs">{a.format}</td><td className="px-4 py-3 text-white/60">{a.impressions.toLocaleString()}</td><td className="px-4 py-3 text-white/60">{a.clicks.toLocaleString()}</td><td className="px-4 py-3 text-rose-400 font-semibold">{a.ctr}%</td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
