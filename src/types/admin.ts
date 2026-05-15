import type { Product } from "@/types/product";

export type ProductStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';
export type InventoryStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

export type AdminProduct = Product & {
  stockQuantity: number;
  status: ProductStatus | InventoryStatus;
  updatedAt: string;
};

export type VerificationStatus = 'Valid' | 'Suspicious' | 'Invalid';

export interface AuthCode {
  id: string;
  productId: string;
  productName: string;
  uniqueCode: string;
  batchNumber: string;
  scanCount: number;
  status: VerificationStatus;
  createdAt: string;
  lastScannedAt?: string;
}

export interface AuthenticationRecord {
  id: string;
  productId: string;
  productName: string;
  uniqueCode: string;
  batchNumber: string;
  scanCount: number;
  status: string;
}

export interface MediaAsset {
  id: string;
  name: string;
  type: string;
  size: string;
  linkedProduct: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'Admin' | 'SuperAdmin';
  avatarUrl?: string;
}

export type DashboardMetric = {
  label: string;
  value: string;
  trend?: string;
  isPositive?: boolean;
  helper?: string;
};
