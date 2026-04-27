import { useState } from 'react';
import { Lock } from 'lucide-react';
import { AdminLoginModal } from '@/components/modals/AdminLoginModal';
export function AdminFloatingButton() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button onClick={()=>setShowModal(true)} title="Admin"
        className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full bg-[#1D1D26] border border-white/20 flex items-center justify-center text-white/40 hover:text-white hover:border-rose-500/50 transition-all shadow-lg"
        aria-label="Admin login">
        <Lock className="w-4 h-4"/>
      </button>
      {showModal && <AdminLoginModal onClose={()=>setShowModal(false)}/>}
    </>
  );
}
