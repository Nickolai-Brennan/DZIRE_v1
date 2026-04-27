import { AdminLayout } from '@/components/layout/AdminLayout';
import { StatCard } from '@/components/ui/StatCard';
import { mockAdminStats } from '@/data/mockAdminStats';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
const TOP_PAGES = [{page:'/positions',views:34210},{page:'/reviews',views:22108},{page:'/dzire-dolls',views:18320},{page:'/',views:15440},{page:'/dictionary',views:8920}];
const DEVICES = [{name:'Mobile',value:62},{name:'Desktop',value:31},{name:'Tablet',value:7}];
const COLORS = ['#E11D48','#F5C451','#A1A1AA'];
export function AdminSiteStats() {
  return (
    <AdminLayout title="Site Stats">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"><StatCard label="Page Views" value={mockAdminStats.pageViews.toLocaleString()} change={12}/><StatCard label="Active Users" value={mockAdminStats.activeUsers.toLocaleString()} change={8}/><StatCard label="Newsletter" value={mockAdminStats.newsletterSignups.toLocaleString()} change={15}/><StatCard label="VIP Members" value={mockAdminStats.vipMembers.toLocaleString()} change={5}/></div>
      <div className="grid sm:grid-cols-3 gap-6 mb-8">
        <div className="sm:col-span-2 glass-card p-5">
          <h3 className="font-bold text-white mb-4">Top Pages</h3>
          <ResponsiveContainer width="100%" height={240}><BarChart data={TOP_PAGES} layout="vertical"><XAxis type="number" stroke="#A1A1AA" tick={{fontSize:11}}/><YAxis dataKey="page" type="category" stroke="#A1A1AA" tick={{fontSize:11}} width={120}/><Tooltip contentStyle={{background:'#1D1D26',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#F8FAFC'}}/><Bar dataKey="views" fill="#E11D48" radius={[0,4,4,0]}/></BarChart></ResponsiveContainer>
        </div>
        <div className="glass-card p-5">
          <h3 className="font-bold text-white mb-4">Device Split</h3>
          <ResponsiveContainer width="100%" height={200}><PieChart><Pie data={DEVICES} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">{DEVICES.map((_,i)=><Cell key={i} fill={COLORS[i]}/>)}</Pie><Tooltip contentStyle={{background:'#1D1D26',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#F8FAFC'}}/></PieChart></ResponsiveContainer>
          <div className="space-y-2 mt-2">{DEVICES.map((d,i)=><div key={d.name} className="flex items-center justify-between text-sm"><div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full" style={{background:COLORS[i]}}/><span className="text-white/60">{d.name}</span></div><span className="text-white font-semibold">{d.value}%</span></div>)}</div>
        </div>
      </div>
    </AdminLayout>
  );
}
