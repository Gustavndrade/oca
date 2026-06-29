import { ReservationStatus } from '@prisma/client';
import { CreateReservationDto } from './create-reservation.dto';

export class UpdateReservationDto implements Partial<CreateReservationDto> {
  checkin?: Date;
  checkout?: Date;
  totalAmount?: number;
  status?: ReservationStatus;
  guestIds?: string[];
}
