import { PaymentType, PaymentStatus } from '@prisma/client';

export class CreatePaymentDto {
  value: number;
  paymentType: PaymentType;
  status: PaymentStatus;
  paidAt?: Date;
  reservationId: string;
}
