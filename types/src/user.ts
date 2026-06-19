// ========================================
// User Types
// ========================================

export type Role = "ADMIN" | "MANAGER" | "STAFF";

export interface User {
  id: string;
  name: string;
  cpf: string | null;
  cnpj: string | null;
  createdAt: Date;
  isActive: boolean;
}

export interface UserWithOrganizations extends User {
  organization: UserOrganization[];
}

export interface UserOrganization {
  organizationId: string;
  userId: string;
  role: Role;
}

export interface UserProperty {
  userId: string;
  propertyId: string;
}

export interface LoginInput {
  document: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  document: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
}

export interface AuthResponse {
  user: Omit<User, "createdAt">;
  tokens: AuthTokens;
}
