import { PropertyType } from '@prisma/client';

export class CreatePropertyDto {
  name: string;
  type: PropertyType;
  organizationId: string;
}
