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
  defaultCheckinTime: string;
  defaultCheckoutTime: string;
}

export interface CreatePropertyInput {
  name: string;
  type: PropertyType;
  organizationId: string;
  defaultCheckinTime?: string;
  defaultCheckoutTime?: string;
}

export interface UpdatePropertyInput {
  name?: string;
  type?: PropertyType;
  isActive?: boolean;
  defaultCheckinTime?: string;
  defaultCheckoutTime?: string;
}
