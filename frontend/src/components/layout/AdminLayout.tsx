import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
interface Props { children: React.ReactNode; title: string; }
export function AdminLayout({ children, title }: Props) {
  return (
    <div className="flex h-screen bg-[#09090B] overflow-hidden">
      <AdminSidebar/>
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminTopbar title={title}/>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
