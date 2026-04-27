import { AdminLayout } from '@/components/layout/AdminLayout';
import { mockSeoReports } from '@/data/mockAdminStats';
export function AdminSeoReports() {
  return (
    <AdminLayout title="SEO Reports">
      <div className="glass-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-white/10">{['Page','Impressions','Clicks','CTR','Avg Position'].map(h=><th key={h} className="text-left px-4 py-3 text-white/40 font-medium">{h}</th>)}</tr></thead>
          <tbody>
            {mockSeoReports.map(r=>(
              <tr key={r.page} className="border-b border-white/5 hover:bg-white/3">
                <td className="px-4 py-3 text-white font-mono text-xs">{r.page}</td>
                <td className="px-4 py-3 text-white/60">{r.impressions.toLocaleString()}</td>
                <td className="px-4 py-3 text-white/60">{r.clicks.toLocaleString()}</td>
                <td className="px-4 py-3"><span className="font-bold text-green-400">{r.ctr}%</span></td>
                <td className="px-4 py-3 text-white/60">{r.avgPosition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
