export interface AuthCodeRecord {
  id: string;
  product_id: string;
  product_name?: string;
  code: string;
  batch_number: string | null;
  scan_count: number;
  first_scanned_at: string | null;
  created_at: string;
  is_active: boolean;
}

export type VerificationStatusType = 'Valid' | 'Suspicious' | 'Invalid';
