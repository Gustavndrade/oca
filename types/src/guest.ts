// ========================================
// Guest Types
// ========================================

export type DocumentType = "CPF" | "RG" | "CNH" | "PASSPORT";

export interface Guest {
  id: string;
  fullName: string;
  document: string;
  documentType: DocumentType;
  email: string | null;
  phone: string | null;
  createdAt: Date;
}

export interface CreateGuestInput {
  fullName: string;
  document: string;
  documentType: DocumentType;
  email?: string;
  phone?: string;
}

export interface UpdateGuestInput extends Partial<CreateGuestInput> {}

export interface GuestFilters {
  search?: string;
  page?: number;
  perPage?: number;
}
