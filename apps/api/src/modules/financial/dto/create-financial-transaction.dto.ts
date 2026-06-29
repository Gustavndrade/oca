export class CreateFinancialTransactionDto {
  amount: number;
  description?: string;
  date?: Date;
  propertyId: string;
  categoryId: string;
  paymentId?: string;
  reservationId?: string;
}
