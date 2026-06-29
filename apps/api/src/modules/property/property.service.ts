import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Injectable()
export class PropertyService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreatePropertyDto) {
    return this.prisma.property.create({ data: dto });
  }

  findAll(organizationId?: string) {
    return this.prisma.property.findMany({
      where: organizationId ? { organizationId } : undefined,
    });
  }

  async findOne(id: string) {
    const property = await this.prisma.property.findUnique({
      where: { id },
      include: { units: true, userProperties: true },
    });
    if (!property) throw new NotFoundException(`Property ${id} not found`);
    return property;
  }

  async update(id: string, dto: UpdatePropertyDto) {
    await this.findOne(id);
    return this.prisma.property.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.property.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
