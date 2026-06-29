import { DocumentType } from '@prisma/client';

export class CreateGuestDto {
  fullName: string;
  document: string;
  documentType: DocumentType;
  email?: string;
  phone?: string;
}
