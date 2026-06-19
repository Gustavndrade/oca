// ========================================
// Reservation Types
// ========================================

export type ReservationStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

export interface Reservation {
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

export interface CreateReservationInput {
  checkin: string;
  checkout: string;
  totalAmount: number;
  propertyId: string;
  unitId: string;
  guestIds?: string[];
}

export interface UpdateReservationInput {
  status?: ReservationStatus;
  totalAmount?: number;
}

export interface ReservationFilters {
  status?: ReservationStatus;
  checkinFrom?: string;
  checkinTo?: string;
  unitId?: string;
  page?: number;
  perPage?: number;
}
