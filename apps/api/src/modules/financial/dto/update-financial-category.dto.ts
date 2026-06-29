import { CreateFinancialCategoryDto } from './create-financial-category.dto';

export class UpdateFinancialCategoryDto
  implements Partial<CreateFinancialCategoryDto>
{
  name?: string;
  type?: import('@prisma/client').FinancialType;
}
