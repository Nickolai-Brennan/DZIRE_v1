import { AdminLayout } from '@/components/layout/AdminLayout';
const GEO = [{country:'United States',sessions:42130,conversions:892},{country:'United Kingdom',sessions:12040,conversions:211},{country:'Canada',sessions:9820,conversions:178},{country:'Australia',sessions:6741,conversions:143},{country:'Germany',sessions:4210,conversions:88}];
export function AdminGeoStats() {
  return (
    <AdminLayout title="Geographic Stats">
      <div className="glass-card overflow-x-auto">
        <table className="w-full text-sm"><thead><tr className="border-b border-white/10">{['Country','Sessions','Conversions','Rate'].map(h=><th key={h} className="text-left px-4 py-3 text-white/40 font-medium">{h}</th>)}</tr></thead>
          <tbody>{GEO.map(g=><tr key={g.country} className="border-b border-white/5 hover:bg-white/3"><td className="px-4 py-3 text-white font-medium">{g.country}</td><td className="px-4 py-3 text-white/60">{g.sessions.toLocaleString()}</td><td className="px-4 py-3 text-white/60">{g.conversions}</td><td className="px-4 py-3 text-green-400 font-semibold">{((g.conversions/g.sessions)*100).toFixed(2)}%</td></tr>)}</tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
