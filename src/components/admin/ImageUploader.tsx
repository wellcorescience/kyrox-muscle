'use client';

import { useState, useCallback } from 'react';
import { UploadCloud, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    // Placeholder functionality: just add dummy image strings
    // In a real app, this would upload to Supabase Storage
    const newImages = Array.from(e.dataTransfer.files).map(file => URL.createObjectURL(file));
    onChange([...images, ...newImages]);
  }, [images, onChange]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      onChange([...images, ...newImages]);
    }
  };

  const removeImage = (indexToRemove: number) => {
    onChange(images.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-4">
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-colors ${
          isDragging 
            ? 'border-white bg-white/5' 
            : 'border-white/10 hover:border-white/20 bg-zinc-900/40 hover:bg-zinc-900/60'
        }`}
      >
        <input 
          type="file" 
          multiple 
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileSelect}
        />
        
        <div className="p-4 rounded-full bg-white/5 mb-4 pointer-events-none">
          <UploadCloud className="text-zinc-400" size={32} />
        </div>
        <p className="text-white font-medium text-center pointer-events-none mb-1">
          Click or drag images to upload
        </p>
        <p className="text-zinc-500 text-sm text-center pointer-events-none">
          SVG, PNG, JPG or GIF (max. 5MB)
        </p>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          <AnimatePresence>
            {images.map((img, index) => (
              <motion.div
                key={img}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group bg-zinc-900"
              >
                {/* Normally we'd use next/image but for these Object URLs a standard img is needed */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={`Upload ${index}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => removeImage(index)}
                    className="p-2 bg-red-500/80 text-white rounded-lg hover:bg-red-500 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
