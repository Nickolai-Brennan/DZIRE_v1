import { AdminLayout } from '@/components/layout/AdminLayout';
import { StatCard } from '@/components/ui/StatCard';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
const EVENTS_DATA = Array.from({length:14},(_,i)=>({ day:`Day ${i+1}`, cta:Math.floor(200+Math.random()*300), newsletter:Math.floor(20+Math.random()*80), affiliate:Math.floor(50+Math.random()*200) }));
const FUNNELS = [{name:'Page View',value:12483},{name:'CTA Click',value:4210},{name:'Product Page',value:1842},{name:'Offer Click',value:892},{name:'Conversion',value:312}];
export function AdminAnalytics() {
  return (
    <AdminLayout title="Analytics">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[{label:'CTA Clicks',value:'4,210',change:18},{label:'Affiliate Clicks',value:'9,847',change:22},{label:'Sponsor Clicks',value:'4,213',change:-2},{label:'Avg. Session',value:'4m 32s',change:8}].map(s=><StatCard key={s.label} {...s}/>)}
      </div>
      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <div className="glass-card p-5">
          <h3 className="font-bold text-white mb-4">Event Tracking (14 days)</h3>
          <ResponsiveContainer width="100%" height={220}><LineChart data={EVENTS_DATA}><XAxis dataKey="day" stroke="#A1A1AA" tick={{fontSize:10}}/><YAxis stroke="#A1A1AA" tick={{fontSize:10}}/><Tooltip contentStyle={{background:'#1D1D26',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#F8FAFC'}}/><Line type="monotone" dataKey="cta" stroke="#E11D48" strokeWidth={2} dot={false}/><Line type="monotone" dataKey="newsletter" stroke="#F5C451" strokeWidth={2} dot={false}/><Line type="monotone" dataKey="affiliate" stroke="#A1A1AA" strokeWidth={2} dot={false}/></LineChart></ResponsiveContainer>
        </div>
        <div className="glass-card p-5">
          <h3 className="font-bold text-white mb-4">Conversion Funnel</h3>
          <ResponsiveContainer width="100%" height={220}><BarChart data={FUNNELS} layout="vertical"><XAxis type="number" stroke="#A1A1AA" tick={{fontSize:10}}/><YAxis dataKey="name" type="category" stroke="#A1A1AA" tick={{fontSize:10}} width={90}/><Tooltip contentStyle={{background:'#1D1D26',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#F8FAFC'}}/><Bar dataKey="value" fill="#F5C451" radius={[0,4,4,0]}/></BarChart></ResponsiveContainer>
        </div>
      </div>
    </AdminLayout>
  );
}
