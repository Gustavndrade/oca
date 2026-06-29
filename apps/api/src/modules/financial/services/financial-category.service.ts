import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateFinancialCategoryDto } from '../dto/create-financial-category.dto';
import { UpdateFinancialCategoryDto } from '../dto/update-financial-category.dto';

@Injectable()
export class FinancialCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateFinancialCategoryDto) {
    return this.prisma.financialCategory.create({ data: dto });
  }

  findAll(propertyId?: string) {
    return this.prisma.financialCategory.findMany({
      where: propertyId ? { propertyId } : undefined,
    });
  }

  async findOne(id: string) {
    const category = await this.prisma.financialCategory.findUnique({
      where: { id },
      include: { transactions: true },
    });
    if (!category) throw new NotFoundException(`FinancialCategory ${id} not found`);
    return category;
  }

  async update(id: string, dto: UpdateFinancialCategoryDto) {
    await this.findOne(id);
    return this.prisma.financialCategory.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.financialCategory.delete({ where: { id } });
  }
}
