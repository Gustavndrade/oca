import { Property, PropertyType } from '@prisma/client';

export { PropertyType };

export class PropertyEntity implements Property {
  id: string;
  name: string;
  type: PropertyType;
  isActive: boolean;
  createdAt: Date;
  organizationId: string;
  defaultCheckinTime: string;
  defaultCheckoutTime: string;
}
