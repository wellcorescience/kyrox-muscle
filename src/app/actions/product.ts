'use server';

import { createClient } from '@supabase/supabase-js';
import type { Product } from '@/types/product';
import { products as fallbackStaticProducts } from '@/constants/products';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function mapDbProductToProduct(dbProduct: any): any {
  const isWhey = dbProduct.category === 'whey-protein';
  return {
    id: dbProduct.id,
    slug: dbProduct.slug || '',
    name: dbProduct.name || '',
    category: dbProduct.category || 'mass-gainer',
    categoryLabel: dbProduct.category === 'whey-protein' ? 'Whey Protein' : 'Mass Gainer',
    flavor: dbProduct.flavor || (isWhey ? 'Rich Chocolate' : 'Chocolate Fudge'),
    weight: dbProduct.weight || (isWhey ? '1 kg' : '3 kg'),
    highlights: isWhey 
      ? ['26g Protein', 'Whey Isolate Blend', '3g Creatine'] 
      : ['423 kcal', '72g Carbs', 'Weight Gain Support'],
    image: dbProduct.image || '',
    gallery: isWhey
      ? ['Front Pack', 'Whey Isolate Blend', 'Creatine Detail', 'Lean Muscle Fuel']
      : ['Front Pack', 'Formula Detail', 'Nutrition Panel', 'Lifestyle Shot'],
    description: dbProduct.description || '',
    benefits: isWhey
      ? ['Lean Muscle Growth', 'Recovery', 'Strength Enhancement']
      : ['Weight Gain Support', 'Recovery Support', 'Energy Support'],
    nutritionFacts: isWhey
      ? [
          { label: 'Protein', value: '26g' },
          { label: 'Creatine', value: '3g' },
          { label: 'Blend', value: 'Whey Isolate' },
        ]
      : [
          { label: 'Calories', value: '423 kcal' },
          { label: 'Protein', value: '17g' },
          { label: 'Carbs', value: '72g' },
        ],
    ingredients: isWhey
      ? [
          'Whey protein isolate blend',
          'Creatine monohydrate',
          'Cocoa powder',
          'Low-sugar flavor system',
        ]
      : [
          'Complex carbohydrate blend',
          'Whey protein concentrate',
          'Digestive enzyme support',
          'Cocoa flavor system',
        ],
    usageInstructions: isWhey
      ? [
          'Mix one serving with water or milk.',
          'Consume post-workout or any time protein intake is needed.',
          'Use daily to support lean muscle nutrition.',
        ]
      : [
          'Mix one serving with water or milk.',
          'Consume post-workout or between meals.',
          'Use consistently during weight-gain phases.',
        ],
    proteinGrams: isWhey ? 26 : 17,
    calories: isWhey ? 145 : 423,
    releaseOrder: isWhey ? 1 : 2,
    isFeatured: !!dbProduct.featured,
    mrp: Number(dbProduct.price || 4000),
    price: Number(dbProduct.price || 4000),
    stock: Number(dbProduct.stock || 0),
    stockQuantity: Number(dbProduct.stock || 0),
    status: dbProduct.status || 'In Stock',
    updatedAt: dbProduct.created_at || new Date().toISOString(),
    availableFlavors: ['Kulfi', 'Chocolate'],
  };
}

export async function getDbProducts() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase products select failed, falling back to static products:', error.message);
      return { success: true, products: fallbackStaticProducts };
    }

    if (!data || data.length === 0) {
      console.info('Supabase products table is empty. Serving static fallback products.');
      return { success: true, products: fallbackStaticProducts };
    }

    const mapped = data.map(mapDbProductToProduct);
    return { success: true, products: mapped };
  } catch (err: any) {
    console.error('Error fetching dynamic products:', err);
    return { success: false, products: fallbackStaticProducts, error: err.message };
  }
}

export async function getDbProductBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      console.warn(`Product not found for slug: ${slug}, searching fallback static list.`);
      const staticFound = fallbackStaticProducts.find(p => p.slug === slug);
      if (staticFound) return { success: true, product: staticFound };
      return { success: false, error: 'Product not found' };
    }

    return { success: true, product: mapDbProductToProduct(data) };
  } catch (err: any) {
    console.error('Error fetching product by slug:', err);
    return { success: false, error: err.message };
  }
}

export async function createOrUpdateDbProduct(productId: string | null, formData: any) {
  try {
    const dbPayload = {
      name: formData.name,
      slug: formData.slug,
      category: formData.category,
      description: formData.description,
      price: Number(formData.price || formData.mrp || 0),
      stock: Number(formData.stock || formData.stockQuantity || 0),
      status: formData.status || 'In Stock',
      featured: !!formData.featured || !!formData.isFeatured,
      flavor: formData.flavor,
      weight: formData.weight,
      image: formData.image || (formData.images && formData.images[0]) || '',
    };

    let realId = productId;
    if (productId && !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(productId)) {
      const { data: found } = await supabase
        .from('products')
        .select('id')
        .eq('slug', productId)
        .maybeSingle();
      if (found) {
        realId = found.id;
      } else {
        realId = null; // Insert as a new product if slug doesn't exist in DB
      }
    }

    if (realId) {
      const { data, error } = await supabase
        .from('products')
        .update(dbPayload)
        .eq('id', realId)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return { success: true, product: data };
    } else {
      const { data, error } = await supabase
        .from('products')
        .insert([dbPayload])
        .select()
        .single();

      if (error) throw new Error(error.message);
      return { success: true, product: data };
    }
  } catch (err: any) {
    console.error('Error saving database product:', err);
    return { success: false, error: err.message || 'Failed to save product' };
  }
}

export async function deleteDbProduct(id: string) {
  try {
    let realId = id;
    if (id && !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
      const { data: found } = await supabase
        .from('products')
        .select('id')
        .eq('slug', id)
        .maybeSingle();
      if (found) realId = found.id;
    }

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', realId);

    if (error) throw new Error(error.message);
    return { success: true };
  } catch (err: any) {
    console.error('Error deleting product from database:', err);
    return { success: false, error: err.message || 'Failed to delete product' };
  }
}

export async function getDbProductById(id: string) {
  try {
    const isUuid = id && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);

    const query = supabase.from('products').select('*');
    if (isUuid) {
      query.eq('id', id);
    } else {
      query.eq('slug', id);
    }

    const { data, error } = await query.maybeSingle();

    if (error || !data) {
      console.warn(`Product not found in DB for query (${isUuid ? 'UUID' : 'Slug'}): ${id}, searching fallback static list.`);
      const staticFound = fallbackStaticProducts.find(p => p.id === id || p.slug === id);
      if (staticFound) return { success: true, product: staticFound };
      return { success: false, error: 'Product not found' };
    }

    return { success: true, product: mapDbProductToProduct(data) };
  } catch (err: any) {
    console.error('Error fetching product by id:', err);
    return { success: false, error: err.message };
  }
}
