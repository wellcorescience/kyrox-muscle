import { ProductForm } from '@/components/admin/ProductForm';
import { mockProducts } from '@/lib/mock-data';
import { notFound } from 'next/navigation';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto">
      <ProductForm initialData={product} isEditing={true} />
    </div>
  );
}
