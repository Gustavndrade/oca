// ========================================
// Property Types
// ========================================

export type PropertyType = "HOTEL" | "VACATION_HOUSE" | "INN";

export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  isActive: boolean;
  createdAt: Date;
  organizationId: string;
}

export interface CreatePropertyInput {
  name: string;
  type: PropertyType;
  organizationId: string;
}

export interface UpdatePropertyInput {
  name?: string;
  type?: PropertyType;
  isActive?: boolean;
}
