'use client';

import { useEffect, useState } from 'react';
import { ProductTable } from '@/components/admin/ProductTable';
import { getDbProducts, deleteDbProduct } from '@/app/actions/product';
import { AdminProduct } from '@/types/admin';
import { Loader2 } from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await getDbProducts();
      if (res.success && res.products) {
        setProducts(res.products as unknown as AdminProduct[]);
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const res = await deleteDbProduct(id);
      if (res.success) {
        setProducts(products.filter(p => p.id !== id));
      } else {
        alert(res.error || 'Failed to delete product.');
      }
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Products</h1>
        <p className="text-zinc-400">Manage your product catalog, inventory, and variants.</p>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center border border-white/5 bg-zinc-900/10 backdrop-blur-sm rounded-2xl">
          <Loader2 className="animate-spin text-electric-300 h-8 w-8" />
        </div>
      ) : (
        <ProductTable products={products} onDelete={handleDelete} />
      )}
    </div>
  );
}
