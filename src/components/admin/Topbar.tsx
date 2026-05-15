'use client';

import { Bell, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export function Topbar() {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex-1 max-w-xl relative">
        <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-2 md:py-2.5 pl-10 md:pl-12 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 transition-all text-sm"
        />
      </div>

      <div className="flex items-center gap-3 md:gap-6 ml-4">
        <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5 md:w-6 md:h-6" />
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0A0A0A]"
          />
        </button>
        
        <div className="flex items-center gap-3 md:pl-6 md:border-l md:border-white/10">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] md:text-sm font-medium text-white">System Status</p>
            <p className="text-[8px] md:text-xs text-emerald-500 flex items-center justify-end gap-1">
              <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-emerald-500" /> Nominal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
