'use client';

import { useState } from 'react';
import { ProductTable } from '@/components/admin/ProductTable';
import { mockProducts } from '@/lib/mock-data';
import { AdminProduct } from '@/types/admin';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>(mockProducts);

  const handleDelete = (id: string) => {
    // In a real app, this would trigger a confirmation modal and then an API call
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Products</h1>
        <p className="text-zinc-400">Manage your product catalog, inventory, and variants.</p>
      </div>

      <ProductTable products={products} onDelete={handleDelete} />
    </div>
  );
}
