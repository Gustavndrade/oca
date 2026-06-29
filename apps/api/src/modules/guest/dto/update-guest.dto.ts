import { CreateGuestDto } from './create-guest.dto';

export class UpdateGuestDto implements Partial<CreateGuestDto> {
  fullName?: string;
  document?: string;
  documentType?: import('@prisma/client').DocumentType;
  email?: string;
  phone?: string;
}
