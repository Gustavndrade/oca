export class CreateReservationDto {
  checkin: Date;
  checkout: Date;
  totalAmount: number;
  propertyId: string;
  unitId: string;
  userId: string;
  /** IDs dos hóspedes vinculados à reserva */
  guestIds?: string[];
}
