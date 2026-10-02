export type ActiveView = 'partner-store' | 'executive-centre';

export interface InventoryItem {
  id: string;
  name: string;
  brand: string;
  sku: string;
  category: string;
  detectedQuantity: number;
  currentStock: number;
  unitCost: number;
  sellingPrice: number;
  marginPercent: number;
  confidence: number;
  batchNumber: string;
  expiryDate: string;
  status: 'pending' | 'verified' | 'pushed';
  selected: boolean;
}

export interface CancellationReason {
  id: string;
  reason: string;
  percentageBefore: number;
  percentageAfter: number;
  monthlyLostOrders: number;
  monthlyLostRevenueInr: number;
  rootCause: string;
  mitigationStrategy: string;
}

export interface MetricComparison {
  label: string;
  sixMonthsAgo: string;
  currentValue: string;
  optimizedValue: string;
  dangerStatus: boolean;
  unit: string;
  description: string;
  improvementDirection: 'lower' | 'higher';
}

export interface SampleInvoice {
  id: string;
  title: string;
  type: 'invoice' | 'shelf';
  distributor: string;
  date: string;
  itemCount: number;
  invoiceNumber: string;
  totalAmount: number;
  items: InventoryItem[];
}
