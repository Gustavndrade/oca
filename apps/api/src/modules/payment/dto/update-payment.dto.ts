import { CreatePaymentDto } from './create-payment.dto';

export class UpdatePaymentDto implements Partial<CreatePaymentDto> {
  value?: number;
  paymentType?: import('@prisma/client').PaymentType;
  status?: import('@prisma/client').PaymentStatus;
  paidAt?: Date;
}
