// ========================================
// Organization Types
// ========================================

export interface Organization {
  id: string;
  name: string;
  email: string;
  cnpj: string;
  phone: string;
  createdAt: Date;
  isActive: boolean;
}

export interface CreateOrganizationInput {
  name: string;
  email: string;
  cnpj: string;
  phone: string;
}

export interface UpdateOrganizationInput extends Partial<CreateOrganizationInput> {
  isActive?: boolean;
}
