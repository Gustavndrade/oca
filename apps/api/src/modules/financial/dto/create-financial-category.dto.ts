import { FinancialType } from '@prisma/client';

export class CreateFinancialCategoryDto {
  name: string;
  type: FinancialType;
  propertyId: string;
}
