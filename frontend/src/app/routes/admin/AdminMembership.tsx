import { AdminLayout } from '@/components/layout/AdminLayout';
import { StatCard } from '@/components/ui/StatCard';
export function AdminMembership() {
  const stats = [{label:'VIP Members',value:'412',change:5.2},{label:'Free Users',value:'7,829',change:8.1},{label:'Conversion Rate',value:'5.01%',change:0.8},{label:'Locked Content Clicks',value:'2,341',change:14}];
  return (
    <AdminLayout title="Membership Stats">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">{stats.map(s=><StatCard key={s.label} {...s}/>)}</div>
      <div className="glass-card p-6"><p className="text-white/40 text-sm">Full membership analytics and cohort data coming in the next release.</p></div>
    </AdminLayout>
  );
}
