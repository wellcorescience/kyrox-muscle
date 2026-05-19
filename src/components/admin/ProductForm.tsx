'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Loader2 } from 'lucide-react';
import { AdminProduct } from '@/types/admin';
import { ImageUpload } from './ImageUpload';
import { createOrUpdateDbProduct } from '@/app/actions/product';

interface ProductFormProps {
  initialData?: AdminProduct;
  isEditing?: boolean;
}

export function ProductForm({ initialData, isEditing = false }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    category: initialData?.category || 'mass-gainer',
    categoryLabel: initialData?.categoryLabel || 'Mass Gainer',
    flavor: initialData?.flavor || '',
    weight: initialData?.weight || '',
    stockQuantity: initialData?.stockQuantity || 0,
    price: initialData?.mrp || (initialData as any)?.price || 0,
    status: initialData?.status || 'In Stock',
    featured: initialData?.isFeatured || (initialData as any)?.featured || false,
    description: initialData?.description || '',
    images: initialData?.image ? [initialData.image, ...(initialData.gallery || [])] : [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImagesChange = (images: string[]) => {
    setFormData(prev => ({ ...prev, images }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    
    try {
      const res = await createOrUpdateDbProduct(initialData?.id || null, formData);
      if (res.success) {
        router.push('/admin/products');
        router.refresh();
      } else {
        setErrorMessage(res.error || 'Failed to save product details.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p className="text-zinc-400">
            {isEditing ? 'Update existing product details in your Supabase database.' : 'Create a new product listing in your dynamic catalog.'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            type="button" 
            onClick={() => router.back()}
            className="px-4 py-2 border border-white/10 rounded-xl text-white hover:bg-white/5 transition-colors flex items-center gap-2"
          >
            <X size={18} />
            <span>Cancel</span>
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="px-4 py-2 bg-white text-black font-medium rounded-xl hover:bg-zinc-200 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            <span>{loading ? 'Saving...' : 'Save Product'}</span>
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400 rounded-xl">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 space-y-6">
            <h2 className="text-xl font-semibold text-white">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Product Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-zinc-500"
                  placeholder="e.g. Kyrox Mass Gainer"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Slug</label>
                  <input 
                    type="text" 
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    required
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-zinc-500"
                    placeholder="kyrox-mass-gainer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Price (MRP in ₹)</label>
                  <input 
                    type="number" 
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-zinc-500"
                    placeholder="e.g. 4000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Category</label>
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 appearance-none"
                  >
                    <option value="mass-gainer">Mass Gainer</option>
                    <option value="whey-protein">Whey Protein</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Weight / Volume</label>
                  <input 
                    type="text" 
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-zinc-500"
                    placeholder="e.g. 3 kg or 1 kg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Description</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 resize-none"
                  placeholder="Product description..."
                />
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 space-y-6">
            <h2 className="text-xl font-semibold text-white">Media</h2>
            <ImageUpload images={formData.images} onChange={handleImagesChange} />
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 space-y-6">
            <h2 className="text-xl font-semibold text-white">Inventory & Status</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Stock Quantity</label>
                <input 
                  type="number" 
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleChange}
                  className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-zinc-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Status</label>
                <select 
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 appearance-none"
                >
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Featured Product</h3>
                  <p className="text-sm text-zinc-500">Show this product on the homepage</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="sr-only peer" />
                  <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 space-y-6">
            <h2 className="text-xl font-semibold text-white">Variants</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Flavor</label>
                <input 
                  type="text" 
                  name="flavor"
                  value={formData.flavor}
                  onChange={handleChange}
                  className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-zinc-500"
                  placeholder="e.g. Double Rich Chocolate"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
