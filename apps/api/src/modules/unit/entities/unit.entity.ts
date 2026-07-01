import { Unit } from '@prisma/client';

export class UnitEntity implements Unit {
  id: string;
  capacity: number;
  identifier: string;
  notes: string | null;
  description: string;
  isActive: boolean;
  createdAt: Date;
  propertyId: string;
  defaultDailyPrice: number;
}
