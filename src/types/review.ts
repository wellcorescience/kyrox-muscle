export type ReviewStatus = 'Pending' | 'Approved' | 'Rejected';

export interface Review {
  id: string; // uuid
  product_id: string;
  customer_name: string;
  city?: string | null;
  rating: number; // 1-5
  review_text: string;
  status: ReviewStatus;
  created_at: string;
}

export interface CreateReviewData {
  product_id: string;
  customer_name: string;
  city?: string;
  rating: number;
  review_text: string;
}
