// ========================================
// Financial Types
// ========================================

export type FinancialType = "INCOME" | "EXPENSE";

export interface FinancialCategory {
  id: string;
  name: string;
  type: FinancialType;
  propertyId: string;
}

export interface CreateFinancialCategoryInput {
  name: string;
  type: FinancialType;
  propertyId: string;
}

export interface FinancialTransaction {
  id: string;
  amount: number;
  description: string | null;
  date: Date;
  propertyId: string;
  categoryId: string;
  paymentId: string | null;
  reservationId: string | null;
}

export interface CreateFinancialTransactionInput {
  amount: number;
  description?: string;
  date?: string;
  propertyId: string;
  categoryId: string;
  paymentId?: string;
  reservationId?: string;
}

export interface FinancialFilters {
  type?: FinancialType;
  categoryId?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  perPage?: number;
}
