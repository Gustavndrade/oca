// ========================================
// Unit Types
// ========================================

export interface Unit {
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

export interface CreateUnitInput {
  capacity: number;
  identifier: string;
  description: string;
  notes?: string;
  propertyId: string;
  defaultDailyPrice?: number;
}

export interface UpdateUnitInput {
  capacity?: number;
  identifier?: string;
  description?: string;
  notes?: string;
  isActive?: boolean;
  defaultDailyPrice?: number;
}
