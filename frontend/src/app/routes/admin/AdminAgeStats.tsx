import { AdminLayout } from '@/components/layout/AdminLayout';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
const AGE = [{range:'18–24',pct:22},{range:'25–34',pct:38},{range:'35–44',pct:24},{range:'45–54',pct:11},{range:'55+',pct:5}];
export function AdminAgeStats() {
  return (
    <AdminLayout title="Age Range Stats">
      <div className="glass-card p-6 mb-6">
        <h3 className="font-bold text-white mb-4">Self-Reported Age Distribution</h3>
        <ResponsiveContainer width="100%" height={280}><BarChart data={AGE}><XAxis dataKey="range" stroke="#A1A1AA" tick={{fontSize:12}}/><YAxis stroke="#A1A1AA" tick={{fontSize:12}} unit="%"/><Tooltip contentStyle={{background:'#1D1D26',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#F8FAFC'}} formatter={(v)=>`${v}%`}/><Bar dataKey="pct" fill="#E11D48" radius={[4,4,0,0]}/></BarChart></ResponsiveContainer>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {AGE.map(a=><div key={a.range} className="glass-card p-4 text-center"><p className="text-white font-black text-2xl">{a.pct}%</p><p className="text-white/40 text-xs mt-1">{a.range}</p></div>)}
      </div>
    </AdminLayout>
  );
}
