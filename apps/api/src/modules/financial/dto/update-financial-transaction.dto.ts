import { CreateFinancialTransactionDto } from './create-financial-transaction.dto';

export class UpdateFinancialTransactionDto
  implements Partial<CreateFinancialTransactionDto>
{
  amount?: number;
  description?: string;
  date?: Date;
  categoryId?: string;
  paymentId?: string;
  reservationId?: string;
}
