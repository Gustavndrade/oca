import { Reservation, ReservationStatus } from '@prisma/client';

export { ReservationStatus };

export class ReservationEntity implements Reservation {
  id: string;
  checkin: Date;
  checkout: Date;
  totalAmount: number;
  createdAt: Date;
  status: ReservationStatus;
  propertyId: string;
  unitId: string;
  userId: string;
}
