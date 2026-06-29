import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { FinancialCategoryService } from '../services/financial-category.service';
import { CreateFinancialCategoryDto } from '../dto/create-financial-category.dto';
import { UpdateFinancialCategoryDto } from '../dto/update-financial-category.dto';

@Controller('financial-categories')
export class FinancialCategoryController {
  constructor(
    private readonly financialCategoryService: FinancialCategoryService,
  ) {}

  @Post()
  create(@Body() dto: CreateFinancialCategoryDto) {
    return this.financialCategoryService.create(dto);
  }

  @Get()
  findAll(@Query('propertyId') propertyId?: string) {
    return this.financialCategoryService.findAll(propertyId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.financialCategoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFinancialCategoryDto) {
    return this.financialCategoryService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.financialCategoryService.remove(id);
  }
}
