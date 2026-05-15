'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { DashboardMetric } from '@/types/admin';

interface StatCardProps {
  metric: DashboardMetric;
  icon: LucideIcon;
  delay?: number;
}

export function StatCard({ metric, icon: Icon, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={{ y: -5 }}
      className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden group cursor-default"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Metallic highlight effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/2 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
          <Icon size={24} className="text-zinc-400 group-hover:text-white transition-colors" />
        </div>
        {metric.trend && (
          <span className={`text-sm font-medium px-2 py-1 rounded-full bg-white/5 border border-white/5 ${metric.isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
            {metric.trend}
          </span>
        )}
      </div>

      <div className="relative z-10">
        <h3 className="text-zinc-500 text-sm font-medium mb-1">{metric.label}</h3>
        <p className="text-3xl font-bold text-white tracking-tight">{metric.value}</p>
      </div>
    </motion.div>
  );
}
