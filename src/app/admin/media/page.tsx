'use client';

import { ImageUploader } from '@/components/admin/ImageUploader';

export default function MediaPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Media Library</h1>
        <p className="text-zinc-400">Manage your product images, banners, and other visual assets.</p>
      </div>

      <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Upload New Media</h2>
        <ImageUploader images={[]} onChange={() => {}} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {/* Placeholders for existing media */}
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="aspect-square bg-zinc-800 rounded-xl border border-white/5 flex items-center justify-center relative group overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
               <span className="text-xs text-white truncate">image_{i}.jpg</span>
             </div>
             <span className="text-zinc-600 text-sm">IMG Placeholder</span>
          </div>
        ))}
      </div>
    </div>
  );
}
