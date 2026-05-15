'use client';

import { Package, ShieldCheck, Database, ScanLine } from 'lucide-react';
import { StatCard } from '@/components/admin/StatCard';
import { mockDashboardMetrics } from '@/lib/mock-data';

const icons = [Package, Database, ShieldCheck, ScanLine];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Dashboard</h1>
        <p className="text-zinc-400">Overview of your platform&apos;s performance and inventory.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockDashboardMetrics.map((metric, index) => (
          <StatCard 
            key={metric.label} 
            metric={metric} 
            icon={icons[index]} 
            delay={index * 0.1} 
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 bg-zinc-900/40 border border-white/5 rounded-2xl p-6 h-96 flex items-center justify-center">
           {/* Placeholder for a chart (e.g., Recharts) */}
           <p className="text-zinc-500">Scan Activity Chart Placeholder</p>
        </div>
        <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 h-96 flex items-center justify-center">
           {/* Placeholder for Recent Activity */}
           <p className="text-zinc-500">Recent Activity Feed Placeholder</p>
        </div>
      </div>
    </div>
  );
}
