import { Module } from '@nestjs/common';
import { FinancialCategoryController } from './controllers/financial-category.controller';
import { FinancialTransactionController } from './controllers/financial-transaction.controller';
import { FinancialCategoryService } from './services/financial-category.service';
import { FinancialTransactionService } from './services/financial-transaction.service';

@Module({
  controllers: [FinancialCategoryController, FinancialTransactionController],
  providers: [FinancialCategoryService, FinancialTransactionService],
  exports: [FinancialCategoryService, FinancialTransactionService],
})
export class FinancialModule {}
