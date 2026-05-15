import { products } from "@/constants/products";
import type {
  AdminProduct,
  AuthenticationRecord,
  DashboardMetric,
  InventoryStatus,
  MediaAsset,
} from "@/types/admin";

const inventoryByProductId: Record<string, number> = {
  "kyrox-mass-gainer": 84,
  "kyrox-anabolic-mass-gainer": 18,
  "kyrox-nitra-whey-protein": 0,
};

export function getInventoryStatus(stockQuantity: number): InventoryStatus {
  if (stockQuantity <= 0) {
    return "out-of-stock";
  }

  if (stockQuantity <= 24) {
    return "low-stock";
  }

  return "in-stock";
}

export const adminProducts: AdminProduct[] = products.map((product, index) => {
  const stockQuantity = inventoryByProductId[product.id] ?? 0;

  return {
    ...product,
    stockQuantity,
    status: getInventoryStatus(stockQuantity),
    updatedAt: ["Today", "Yesterday", "2 days ago"][index] ?? "This week",
  };
});

export const authenticationRecords: AuthenticationRecord[] = [
  {
    id: "auth-001",
    productId: "kyrox-mass-gainer",
    productName: "Kyrox Muscle Mass Gainer",
    uniqueCode: "KYX-MG-9F42",
    batchNumber: "BATCH-MG-2605",
    scanCount: 128,
    status: "Verified",
  },
  {
    id: "auth-002",
    productId: "kyrox-anabolic-mass-gainer",
    productName: "Kyrox Muscle Anabolic Mass Gainer",
    uniqueCode: "KYX-AMG-72KQ",
    batchNumber: "BATCH-AMG-2605",
    scanCount: 76,
    status: "Pending",
  },
  {
    id: "auth-003",
    productId: "kyrox-nitra-whey-protein",
    productName: "Kyrox Muscle Nitra Whey Protein",
    uniqueCode: "KYX-NW-3X19",
    batchNumber: "BATCH-NW-2604",
    scanCount: 214,
    status: "Verified",
  },
];

export const mediaAssets: MediaAsset[] = [
  {
    id: "media-001",
    name: "Mass Gainer Front Pack",
    type: "Product Image",
    size: "1.8 MB",
    linkedProduct: "Kyrox Muscle Mass Gainer",
  },
  {
    id: "media-002",
    name: "Nitra Whey Label Detail",
    type: "Label",
    size: "940 KB",
    linkedProduct: "Kyrox Muscle Nitra Whey Protein",
  },
  {
    id: "media-003",
    name: "Training Lifestyle Visual",
    type: "Lifestyle",
    size: "2.4 MB",
    linkedProduct: "Brand Library",
  },
];

export const dashboardMetrics: DashboardMetric[] = [
  {
    label: "Total Products",
    value: String(adminProducts.length),
    helper: "Active catalog SKUs",
  },
  {
    label: "Inventory Count",
    value: String(
      adminProducts.reduce((total, product) => total + product.stockQuantity, 0),
    ),
    helper: "Units in tracked stock",
  },
  {
    label: "Verification Codes",
    value: String(authenticationRecords.length),
    helper: "Generated product codes",
  },
  {
    label: "Total Scans",
    value: String(
      authenticationRecords.reduce(
        (total, record) => total + record.scanCount,
        0,
      ),
    ),
    helper: "Consumer authenticity scans",
  },
];
