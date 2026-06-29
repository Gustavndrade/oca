import { Organization } from '@prisma/client';

export class OrganizationEntity implements Organization {
  id: string;
  name: string;
  email: string;
  cnpj: string;
  phone: string;
  createdAt: Date;
  isActive: boolean;
}
