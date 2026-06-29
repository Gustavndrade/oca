import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';

@Injectable()
export class GuestService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateGuestDto) {
    return this.prisma.guest.create({ data: dto });
  }

  findAll() {
    return this.prisma.guest.findMany();
  }

  async findOne(id: string) {
    const guest = await this.prisma.guest.findUnique({
      where: { id },
      include: { guests: { include: { reservation: true } } },
    });
    if (!guest) throw new NotFoundException(`Guest ${id} not found`);
    return guest;
  }

  async update(id: string, dto: UpdateGuestDto) {
    await this.findOne(id);
    return this.prisma.guest.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.guest.delete({ where: { id } });
  }
}
