import { Header } from './Header';
import { Footer } from './Footer';
import { AdminFloatingButton } from '@/components/admin/AdminFloatingButton';
interface Props { children: React.ReactNode; }
export function PublicLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-[#09090B]">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <AdminFloatingButton />
    </div>
  );
}
