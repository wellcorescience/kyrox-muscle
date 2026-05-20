'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/admin/Sidebar';
import { Topbar } from '@/components/admin/Topbar';
import { Menu } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-white overflow-hidden font-sans">
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        <header className="h-20 bg-[#0A0A0A] border-b border-white/5 flex items-center gap-4 px-4 lg:px-8 z-10 sticky top-0">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-xl hover:bg-white/5 text-zinc-400"
          >
            <Menu size={24} />
          </button>
          <div className="flex-1">
            <Topbar />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 relative scroll-smooth">
          {children}
        </main>
      </div>
    </div>
  );
}
