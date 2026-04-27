import { AdminLayout } from '@/components/layout/AdminLayout';
import { StatCard } from '@/components/ui/StatCard';
import { mockAdminStats, mockScheduleItems } from '@/data/mockAdminStats';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
const TRAFFIC = Array.from({length:7},(_,i)=>({ day:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i], views:Math.floor(800+Math.random()*600) }));
export function AdminDashboard() {
  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {mockAdminStats.slice(0,8).map(s=><StatCard key={s.label} label={s.label} value={s.value} change={s.change}/>)}
      </div>
      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <div className="glass-card p-5">
          <h3 className="font-bold text-white mb-4">Weekly Traffic</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={TRAFFIC}><XAxis dataKey="day" stroke="#A1A1AA" tick={{fontSize:11}}/><YAxis stroke="#A1A1AA" tick={{fontSize:11}}/><Tooltip contentStyle={{background:'#1D1D26',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#F8FAFC'}}/><Bar dataKey="views" fill="#E11D48" radius={[4,4,0,0]}/></BarChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card p-5">
          <h3 className="font-bold text-white mb-4">Newsletter Growth</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={TRAFFIC}><XAxis dataKey="day" stroke="#A1A1AA" tick={{fontSize:11}}/><YAxis stroke="#A1A1AA" tick={{fontSize:11}}/><Tooltip contentStyle={{background:'#1D1D26',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#F8FAFC'}}/><Line type="monotone" dataKey="views" stroke="#F5C451" strokeWidth={2} dot={false}/></LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="glass-card p-5">
        <h3 className="font-bold text-white mb-4">Upcoming Schedule</h3>
        <div className="space-y-3">
          {mockScheduleItems.map(item=>(
            <div key={item.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <div><p className="text-sm font-semibold text-white">{item.title}</p><p className="text-xs text-white/40">{item.contentType}</p></div>
              <div className="text-right">
                <p className="text-xs text-white/40">{new Date(item.scheduledAt).toLocaleDateString()}</p>
                <span className={`text-xs font-semibold ${item.status==='scheduled'?'text-green-400':item.status==='draft'?'text-yellow-400':'text-white/40'}`}>{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
