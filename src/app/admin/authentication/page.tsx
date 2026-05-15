'use client';

import { useState } from 'react';
import { 
  Search, 
  FileText, 
  Zap, 
  Eye, 
  Ban, 
  CheckCircle,
  MoreVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockAuthCodeRecords, mockProducts } from '@/lib/mock-data';
import { AuthCodeRecord } from '@/types/auth';
import { BulkGenerateModal } from '@/components/admin/BulkGenerateModal';
import { exportCodesToExcel } from '@/lib/excel-export';

export default function AdminAuthenticationPage() {
  const [records, setRecords] = useState<AuthCodeRecord[]>(mockAuthCodeRecords);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterProduct, setFilterProduct] = useState('all');

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.batch_number?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProduct = filterProduct === 'all' || record.product_id === filterProduct;
    return matchesSearch && matchesProduct;
  });

  const handleGenerated = (newRecords: AuthCodeRecord[]) => {
    setRecords([...newRecords, ...records]);
  };

  const handleExport = () => {
    const exportData = filteredRecords.map(r => {
      const product = mockProducts.find(p => p.id === r.product_id);
      return {
        Code: r.code,
        Product: product?.name || 'Unknown',
        'Batch Number': r.batch_number || 'N/A',
        'Created Date': new Date(r.created_at).toLocaleDateString()
      };
    });
    exportCodesToExcel(exportData, `kyrox-auth-codes-${new Date().getFullYear()}.xlsx`);
  };

  const toggleStatus = (id: string) => {
    setRecords(records.map(r => 
      r.id === id ? { ...r, is_active: !r.is_active } : r
    ));
  };

  const getProductName = (id: string) => {
    return mockProducts.find(p => p.id === id)?.name || 'Unknown Product';
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">Authentication Management</h1>
          <p className="text-sm text-zinc-400">Security infrastructure for bulk product verification and tracking.</p>
        </div>
        <div className="flex flex-wrap gap-3 w-full lg:w-auto">
          <button 
            onClick={handleExport}
            className="px-4 py-2 bg-zinc-900/50 border border-white/10 rounded-xl text-white hover:bg-white/5 transition-colors flex items-center justify-center gap-2 flex-1 lg:flex-none text-sm"
          >
            <FileText size={16} />
            <span>Export</span>
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 flex-1 lg:flex-none shadow-lg shadow-white/5 text-sm"
          >
            <Zap size={16} fill="currentColor" />
            <span>Bulk Generate</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Codes', value: records.length, color: 'text-white' },
          { label: 'Active', value: records.filter(r => r.is_active).length, color: 'text-emerald-400' },
          { label: 'Disabled', value: records.filter(r => !r.is_active).length, color: 'text-red-400' },
          { label: 'Verified', value: records.reduce((acc, r) => acc + r.scan_count, 0), color: 'text-zinc-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-zinc-900/40 border border-white/5 rounded-2xl p-4 md:p-5">
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <p className={`text-xl md:text-2xl font-bold ${stat.color}`}>{stat.value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-4 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input
            type="text"
            placeholder="Search code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all text-sm"
          />
        </div>
        <select
          value={filterProduct}
          onChange={(e) => setFilterProduct(e.target.value)}
          className="bg-zinc-900 border border-white/10 rounded-xl py-2 px-4 text-white focus:outline-none transition-all appearance-none md:min-w-[200px] text-sm"
        >
          <option value="all">All Products</option>
          {mockProducts.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      <div className="bg-zinc-900/40 border border-white/5 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                  <th className="px-6 py-5">Code</th>
                  <th className="px-6 py-5">Product</th>
                  <th className="px-6 py-5">Batch</th>
                  <th className="px-6 py-5">Scans</th>
                  <th className="px-6 py-5">Status</th>
                  <th className="px-6 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <AnimatePresence mode="popLayout">
                  {filteredRecords.map((record) => (
                    <motion.tr 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={record.id} 
                      className="group hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${record.is_active ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-red-500'}`} />
                          <span className="font-mono text-sm tracking-widest text-white">{record.code}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-zinc-300">{getProductName(record.product_id)}</td>
                      <td className="px-6 py-4 text-xs font-mono text-zinc-500">{record.batch_number || '---'}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold ${record.scan_count > 5 ? 'text-amber-500' : 'text-zinc-300'}`}>
                            {record.scan_count}
                          </span>
                          {record.scan_count > 0 && <CheckCircle size={14} className="text-emerald-500/50" />}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase border ${
                          record.is_active 
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                            : 'bg-red-500/10 border-red-500/20 text-red-400'
                        }`}>
                          {record.is_active ? 'Active' : 'Disabled'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => toggleStatus(record.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              record.is_active ? 'text-zinc-500 hover:text-red-400 hover:bg-red-400/10' : 'text-zinc-500 hover:text-emerald-400 hover:bg-emerald-400/10'
                            }`}
                          >
                            {record.is_active ? <Ban size={16} /> : <CheckCircle size={16} />}
                          </button>
                          <button className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-colors">
                            <Eye size={16} />
                          </button>
                          <button className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-colors">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <BulkGenerateModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onGenerated={handleGenerated} 
      />
    </div>
  );
}
