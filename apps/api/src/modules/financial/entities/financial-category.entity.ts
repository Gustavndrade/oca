import { FinancialCategory, FinancialType } from '@prisma/client';

export { FinancialType };

export class FinancialCategoryEntity implements FinancialCategory {
  id: string;
  name: string;
  type: FinancialType;
  propertyId: string;
}
