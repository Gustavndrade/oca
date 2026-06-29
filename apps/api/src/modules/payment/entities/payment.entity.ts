import { Payment, PaymentType, PaymentStatus } from '@prisma/client';

export { PaymentType, PaymentStatus };

export class PaymentEntity implements Payment {
  id: string;
  value: number;
  paymentType: PaymentType;
  paidAt: Date | null;
  status: PaymentStatus;
  reservationId: string;
}
