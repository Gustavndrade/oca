import { FinancialTransaction } from '@prisma/client';

export class FinancialTransactionEntity implements FinancialTransaction {
  id: string;
  amount: number;
  description: string | null;
  date: Date;
  propertyId: string;
  categoryId: string;
  paymentId: string | null;
  reservationId: string | null;
}
