import { ProductForm } from '@/components/admin/ProductForm';
import { getDbProductById } from '@/app/actions/product';
import { notFound } from 'next/navigation';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await getDbProductById(id);

  if (!res.success || !res.product) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto">
      <ProductForm initialData={res.product as any} isEditing={true} />
    </div>
  );
}
