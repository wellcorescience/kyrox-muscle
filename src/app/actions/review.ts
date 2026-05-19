'use server';

import { createClient } from '@supabase/supabase-js';
import { CreateReviewData, ReviewStatus } from '@/types/review';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function submitReview(data: CreateReviewData) {
  try {
    const { data: newReview, error } = await supabase
      .from('reviews')
      .insert([
        {
          product_id: data.product_id,
          customer_name: data.customer_name,
          city: data.city,
          rating: data.rating,
          review_text: data.review_text,
          status: 'Pending',
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error creating review:', error);
      throw new Error(error.message);
    }

    return { success: true, review: newReview };
  } catch (err: any) {
    console.error('Error in submitReview action:', err);
    return { success: false, error: err.message || 'Failed to submit review' };
  }
}

export async function getApprovedReviews(productId: string) {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_id', productId)
      .eq('status', 'Approved')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error fetching approved reviews:', error);
      throw new Error(error.message);
    }

    return { success: true, reviews: data };
  } catch (err: any) {
    console.error('Error in getApprovedReviews action:', err);
    return { success: false, error: err.message || 'Failed to fetch reviews' };
  }
}

export async function getAllReviews() {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error fetching all reviews:', error);
      throw new Error(error.message);
    }

    return { success: true, reviews: data };
  } catch (err: any) {
    console.error('Error in getAllReviews action:', err);
    return { success: false, error: err.message || 'Failed to fetch reviews' };
  }
}

export async function updateReviewStatus(id: string, status: ReviewStatus) {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error updating review:', error);
      throw new Error(error.message);
    }

    return { success: true, review: data };
  } catch (err: any) {
    console.error('Error in updateReviewStatus action:', err);
    return { success: false, error: err.message || 'Failed to update review' };
  }
}

export async function deleteReview(id: string) {
  try {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase error deleting review:', error);
      throw new Error(error.message);
    }

    return { success: true };
  } catch (err: any) {
    console.error('Error in deleteReview action:', err);
    return { success: false, error: err.message || 'Failed to delete review' };
  }
}
