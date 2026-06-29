import { Guest, DocumentType } from '@prisma/client';

export { DocumentType };

export class GuestEntity implements Guest {
  id: string;
  fullName: string;
  document: string;
  documentType: DocumentType;
  email: string | null;
  phone: string | null;
  createdAt: Date;
}
