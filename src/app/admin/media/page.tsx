'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  Copy, 
  Trash2, 
  Eye, 
  Check, 
  Calendar, 
  HardDrive, 
  Upload, 
  Image as ImageIcon, 
  X, 
  Search,
  CloudLightning,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Real/Premium mock media assets (using our generated backgrounds to feel incredibly production-ready!)
const initialMediaList = [
  {
    id: 'media_1',
    name: 'hero_bg.png',
    url: '/images/bg/hero_bg.png',
    size: '1.2 MB',
    date: 'May 19, 2026',
    dimensions: '1920 x 1080',
    type: 'image/png'
  },
  {
    id: 'media_2',
    name: 'featured_bg.png',
    url: '/images/bg/featured_bg.png',
    size: '890 KB',
    date: 'May 19, 2026',
    dimensions: '1440 x 900',
    type: 'image/png'
  },
  {
    id: 'media_3',
    name: 'athlete_bg.png',
    url: '/images/bg/athlete_bg.png',
    size: '2.1 MB',
    date: 'May 19, 2026',
    dimensions: '1920 x 1280',
    type: 'image/png'
  },
  {
    id: 'media_4',
    name: 'trust_bg.png',
    url: '/images/bg/trust_bg.png',
    size: '640 KB',
    date: 'May 19, 2026',
    dimensions: '1280 x 720',
    type: 'image/png'
  },
  {
    id: 'media_5',
    name: 'cta_bg.png',
    url: '/images/bg/cta_bg.png',
    size: '1.4 MB',
    date: 'May 19, 2026',
    dimensions: '1920 x 1080',
    type: 'image/png'
  },
  {
    id: 'media_6',
    name: 'verify_bg.png',
    url: '/images/bg/verify_bg.png',
    size: '1.1 MB',
    date: 'May 19, 2026',
    dimensions: '1440 x 960',
    type: 'image/png'
  }
];

export default function MediaPage() {
  const [mediaList, setMediaList] = useState(initialMediaList);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleCopyUrl = (url: string, id: string) => {
    // Generate absolute path mockup URL
    const absoluteUrl = typeof window !== 'undefined' ? `${window.location.origin}${url}` : url;
    navigator.clipboard.writeText(absoluteUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this media asset?')) {
      setMediaList(mediaList.filter(item => item.id !== id));
      if (selectedImage?.id === id) {
        setSelectedImage(null);
      }
    }
  };

  const handleMockUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      const newAsset = {
        id: `media_${Date.now()}`,
        name: 'new_supplement_upload.png',
        url: '/images/bg/featured_bg.png', // Fallback to avoid missing files
        size: '720 KB',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        dimensions: '1200 x 1200',
        type: 'image/png'
      };
      setMediaList([newAsset, ...mediaList]);
      setIsUploading(false);
    }, 1500);
  };

  const filteredMedia = mediaList.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2 uppercase">Media Library</h1>
          <p className="text-zinc-400">Manage, preview, and deploy supplement visual assets via Cloudinary storage pipeline.</p>
        </div>

        {/* Upload Button */}
        <button
          onClick={handleMockUpload}
          disabled={isUploading}
          className="inline-flex items-center justify-center gap-2 border border-electric-400 bg-electric-500 hover:bg-white text-black font-bold uppercase tracking-wider text-xs py-3.5 px-6 transition-all disabled:opacity-50"
        >
          {isUploading ? (
            <>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 border-2 border-black border-t-transparent rounded-full"
              />
              <span>Uploading to Cloudinary...</span>
            </>
          ) : (
            <>
              <Upload size={15} />
              <span>Upload New Media</span>
            </>
          )}
        </button>
      </div>

      {/* Cloudinary Info Strip */}
      <div className="flex items-center gap-3 border border-electric-500/25 bg-electric-500/[0.03] p-4 rounded-xl">
        <CloudLightning className="text-electric-400 shrink-0" size={20} />
        <p className="text-xs text-zinc-300">
          <strong>Cloudinary Storage Integrated:</strong> All uploaded assets are automatically optimized, compressed, and served via Cloudinary CDN for instant storefront loading speeds.
        </p>
      </div>

      {/* Search Filter Bar */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
          <Search size={16} />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search media assets by name..."
          className="w-full bg-zinc-950 border border-white/10 rounded-xl py-4.5 pl-11 pr-5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-electric-300 transition-colors"
        />
      </div>

      {/* Thumbnail Grid */}
      {filteredMedia.length === 0 ? (
        <div className="border border-white/5 bg-zinc-950/40 p-12 text-center rounded-2xl">
          <ImageIcon className="mx-auto text-zinc-600 mb-4" size={40} />
          <h3 className="font-bold text-white uppercase text-lg">No assets found</h3>
          <p className="text-zinc-500 text-xs mt-1">Try modifying your search or upload a new asset.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <AnimatePresence>
            {filteredMedia.map((media) => (
              <motion.div
                layout
                key={media.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="group border border-white/10 bg-zinc-950/60 rounded-xl overflow-hidden relative flex flex-col justify-between"
              >
                {/* Thumbnail container */}
                <div className="aspect-square bg-zinc-900 relative overflow-hidden flex items-center justify-center">
                  <Image
                    src={media.url}
                    alt={media.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Action overlays */}
                  <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button
                      onClick={() => setSelectedImage(media)}
                      className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-white text-zinc-300 hover:text-black grid place-items-center transition-colors"
                      title="Preview Media"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleCopyUrl(media.url, media.id)}
                      className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-white text-zinc-300 hover:text-black grid place-items-center transition-colors"
                      title="Copy CDN URL"
                    >
                      {copiedId === media.id ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                    </button>
                    <button
                      onClick={() => handleDelete(media.id)}
                      className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-red-500 text-zinc-300 hover:text-white grid place-items-center transition-colors"
                      title="Delete Asset"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Details Footer */}
                <div className="p-3 border-t border-white/5">
                  <p className="text-xs font-bold text-white truncate uppercase" title={media.name}>
                    {media.name}
                  </p>
                  <div className="flex items-center justify-between text-[9px] font-bold text-zinc-500 uppercase mt-1">
                    <span>{media.size}</span>
                    <span>{media.dimensions}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* METADATA INSPECT / PREVIEW MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-zinc-950 border border-white/10 rounded-2xl max-w-4xl w-full overflow-hidden grid lg:grid-cols-5 relative z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-white text-zinc-400 hover:text-black grid place-items-center border border-white/10 transition-colors"
              >
                <X size={16} />
              </button>

              {/* Left Column - Large Image */}
              <div className="lg:col-span-3 bg-black relative aspect-[4/3] lg:aspect-auto min-h-[18rem] lg:h-full flex items-center justify-center p-8">
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.name}
                  fill
                  className="object-contain p-4"
                />
              </div>

              {/* Right Column - Metadata Info */}
              <div className="lg:col-span-2 p-6 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1 bg-electric-500/15 border border-electric-500/35 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-electric-300 mb-4 rounded-full">
                    <CloudLightning size={10} /> Cloudinary Node
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight break-all">
                    {selectedImage.name}
                  </h3>
                  
                  <div className="space-y-4 mt-6">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                      <span className="text-[10px] font-bold uppercase text-zinc-500 flex items-center gap-1.5">
                        <HardDrive size={12} /> File Size
                      </span>
                      <span className="text-xs font-bold text-zinc-300">{selectedImage.size}</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                      <span className="text-[10px] font-bold uppercase text-zinc-500 flex items-center gap-1.5">
                        <Calendar size={12} /> Uploaded On
                      </span>
                      <span className="text-xs font-bold text-zinc-300">{selectedImage.date}</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                      <span className="text-[10px] font-bold uppercase text-zinc-500">Dimensions</span>
                      <span className="text-xs font-bold text-zinc-300">{selectedImage.dimensions}</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                      <span className="text-[10px] font-bold uppercase text-zinc-500">File Type</span>
                      <span className="text-xs font-mono text-zinc-300">{selectedImage.type}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-2">
                  <button
                    onClick={() => handleCopyUrl(selectedImage.url, selectedImage.id)}
                    className="w-full py-3 bg-electric-500 hover:bg-white text-black text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                  >
                    {copiedId === selectedImage.id ? (
                      <>
                        <Check size={14} className="text-emerald-600" />
                        <span>CDN URL Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy CDN Image URL</span>
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => handleDelete(selectedImage.id)}
                    className="w-full py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 size={14} />
                    <span>Delete Media Asset</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
