import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateFinancialTransactionDto } from '../dto/create-financial-transaction.dto';
import { UpdateFinancialTransactionDto } from '../dto/update-financial-transaction.dto';

@Injectable()
export class FinancialTransactionService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateFinancialTransactionDto) {
    return this.prisma.financialTransaction.create({ data: dto });
  }

  findAll(propertyId?: string) {
    return this.prisma.financialTransaction.findMany({
      where: propertyId ? { propertyId } : undefined,
      include: { category: true },
    });
  }

  async findOne(id: string) {
    const transaction = await this.prisma.financialTransaction.findUnique({
      where: { id },
      include: { category: true, payment: true, reservation: true },
    });
    if (!transaction)
      throw new NotFoundException(`FinancialTransaction ${id} not found`);
    return transaction;
  }

  async update(id: string, dto: UpdateFinancialTransactionDto) {
    await this.findOne(id);
    return this.prisma.financialTransaction.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.financialTransaction.delete({ where: { id } });
  }
}
