// ========================================
// Payment Types
// ========================================

export type PaymentType = "CREDIT_CARD" | "DEBIT_CARD" | "PIX" | "MONEY";
export type PaymentStatus = "PENDING" | "PAID" | "CANCELLED";

export interface Payment {
  id: string;
  value: number;
  paymentType: PaymentType;
  paidAt: Date | null;
  status: PaymentStatus;
  reservationId: string;
}

export interface CreatePaymentInput {
  value: number;
  paymentType: PaymentType;
  reservationId: string;
}

export interface UpdatePaymentInput {
  status?: PaymentStatus;
  paidAt?: string;
}
