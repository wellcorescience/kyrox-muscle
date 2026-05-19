'use client';

import { useState, useCallback } from 'react';
import { UploadCloud, X, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
}

interface UploadingImage {
  id: string;
  file: File;
  progress: number;
  error?: string;
}

export function ImageUpload({ images, onChange }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingImages, setUploadingImages] = useState<UploadingImage[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const uploadFile = async (file: File, id: string) => {
    return new Promise<void>((resolve, reject) => {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName || !uploadPreset) {
        setUploadingImages(prev =>
          prev.map(img =>
            img.id === id ? { ...img, error: 'Cloudinary configuration missing' } : img
          )
        );
        reject(new Error('Cloudinary config missing'));
        return;
      }

      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      const xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded * 100) / e.total);
          setUploadingImages(prev =>
            prev.map(img => (img.id === id ? { ...img, progress } : img))
          );
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          onChange([...images, response.secure_url]);
          setUploadingImages(prev => prev.filter(img => img.id !== id));
          resolve();
        } else {
          setUploadingImages(prev =>
            prev.map(img => (img.id === id ? { ...img, error: 'Upload failed' } : img))
          );
          reject(new Error('Upload failed'));
        }
      };

      xhr.onerror = () => {
        setUploadingImages(prev =>
          prev.map(img => (img.id === id ? { ...img, error: 'Network error' } : img))
        );
        reject(new Error('Network error'));
      };

      xhr.send(formData);
    });
  };

  const processFiles = (files: File[]) => {
    const validFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    files.forEach(file => {
      const id = Math.random().toString(36).substring(7);

      if (!validFormats.includes(file.type)) {
        setUploadingImages(prev => [
          ...prev,
          { id, file, progress: 0, error: 'Unsupported format. Use JPG, PNG or WEBP.' }
        ]);
        return;
      }

      if (file.size > maxSize) {
        setUploadingImages(prev => [
          ...prev,
          { id, file, progress: 0, error: 'File too large. Max 10MB.' }
        ]);
        return;
      }

      setUploadingImages(prev => [...prev, { id, file, progress: 0 }]);
      uploadFile(file, id).catch(() => {});
    });
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  }, [images, onChange]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(Array.from(e.target.files));
      e.target.value = ''; // Reset input
    }
  };

  const removeImage = (indexToRemove: number) => {
    onChange(images.filter((_, index) => index !== indexToRemove));
  };

  const removeUploadingImage = (idToRemove: string) => {
    setUploadingImages(prev => prev.filter(img => img.id !== idToRemove));
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
          accept="image/jpeg, image/png, image/webp"
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
          JPG, PNG or WEBP (max. 10MB)
        </p>
      </div>

      {(images.length > 0 || uploadingImages.length > 0) && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          <AnimatePresence>
            {/* Successfully uploaded images */}
            {images.map((img, index) => (
              <motion.div
                key={img}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group bg-zinc-900"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={`Upload ${index}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="p-2 bg-red-500/80 text-white rounded-lg hover:bg-red-500 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </motion.div>
            ))}

            {/* Images currently uploading or with errors */}
            {uploadingImages.map((img) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-zinc-900 flex flex-col items-center justify-center p-2"
              >
                {img.error ? (
                  <div className="flex flex-col items-center text-center space-y-2">
                    <AlertCircle className="text-red-500" size={24} />
                    <span className="text-xs text-red-400 font-medium leading-tight">
                      {img.error}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeUploadingImage(img.id)}
                      className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-md hover:bg-black/70 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center w-full px-4">
                    <Loader2 className="text-zinc-400 animate-spin mb-2" size={24} />
                    <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        className="bg-white h-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${img.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
