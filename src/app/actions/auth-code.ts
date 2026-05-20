'use server';

import { supabase } from '@/lib/supabase';
import { AuthCodeRecord } from '@/types/auth';

export async function getAuthCodeRecords() {
  try {
    const { data, error } = await supabase
      .from('auth_codes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error fetching auth codes:', error);
      throw new Error(error.message);
    }

    return { success: true, records: (data as AuthCodeRecord[]) || [] };
  } catch (err: any) {
    console.error('Error fetching auth codes:', err);
    return { success: false, error: err.message || 'Failed to fetch auth codes', records: [] };
  }
}

export async function generateAuthCodesAction(
  productId: string,
  productName: string,
  quantity: number,
  batchNumber: string | null
) {
  try {
    // Generate a dynamic prefix based on the product name, e.g. "MG" for Mass Gainer
    const words = productName.split(' ').filter(w => w.trim().length > 0);
    const prefix = words.length > 0 
      ? words.map(w => w[0]).join('').substring(0, 3).toUpperCase() 
      : 'GEN';

    const generateRandomCode = (pfx: string) => {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      let result = `KYX-${pfx}-`;
      for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };

    const newCodes = [];
    for (let i = 0; i < quantity; i++) {
      newCodes.push({
        product_id: productId,
        product_name: productName,
        code: generateRandomCode(prefix),
        batch_number: batchNumber || null,
        scan_count: 0,
        first_scanned_at: null,
        is_active: true,
      });
    }

    const { data, error } = await supabase
      .from('auth_codes')
      .insert(newCodes)
      .select();

    if (error) {
      console.error('Supabase error inserting auth codes:', error);
      throw new Error(error.message);
    }

    return { success: true, records: (data as AuthCodeRecord[]) || [] };
  } catch (err: any) {
    console.error('Error generating auth codes:', err);
    return { success: false, error: err.message || 'Failed to generate auth codes', records: [] };
  }
}

export async function toggleAuthCodeStatusAction(id: string, currentStatus: boolean) {
  try {
    const { data, error } = await supabase
      .from('auth_codes')
      .update({ is_active: !currentStatus })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error toggling auth code status:', error);
      throw new Error(error.message);
    }

    return { success: true, record: data as AuthCodeRecord };
  } catch (err: any) {
    console.error('Error toggling auth code status:', err);
    return { success: false, error: err.message || 'Failed to toggle status' };
  }
}

export async function verifyAuthCodeAction(codeToVerify: string) {
  try {
    const cleanCode = codeToVerify.trim().toUpperCase();
    if (!cleanCode) {
      return { success: false, error: 'Code is empty' };
    }

    const { data: record, error: findError } = await supabase
      .from('auth_codes')
      .select('*')
      .eq('code', cleanCode)
      .maybeSingle();

    if (findError) {
      console.error('Supabase error looking up auth code:', findError);
      throw new Error(findError.message);
    }

    if (!record) {
      return { success: true, status: 'invalid' as const, record: null };
    }

    if (!record.is_active) {
      return { success: true, status: 'invalid' as const, record: record as AuthCodeRecord };
    }

    const isFirstScan = record.scan_count === 0;
    const newScanCount = record.scan_count + 1;
    const firstScannedAt = isFirstScan ? new Date().toISOString() : record.first_scanned_at;

    const { data: updatedRecord, error: updateError } = await supabase
      .from('auth_codes')
      .update({
        scan_count: newScanCount,
        first_scanned_at: firstScannedAt,
      })
      .eq('id', record.id)
      .select()
      .single();

    if (updateError) {
      console.error('Supabase error updating scan count:', updateError);
      throw new Error(updateError.message);
    }

    const status = isFirstScan ? ('valid' as const) : ('duplicate' as const);

    return { success: true, status, record: updatedRecord as AuthCodeRecord };
  } catch (err: any) {
    console.error('Error verifying auth code:', err);
    return { success: false, error: err.message || 'Failed to verify auth code' };
  }
}
