import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateReservationDto) {
    const { guestIds, ...reservationData } = dto;

    return this.prisma.reservation.create({
      data: {
        ...reservationData,
        guests: guestIds?.length
          ? {
              create: guestIds.map((guestId) => ({ guestId })),
            }
          : undefined,
      },
      include: { guests: true, payments: true },
    });
  }

  findAll(propertyId?: string) {
    return this.prisma.reservation.findMany({
      where: propertyId ? { propertyId } : undefined,
      include: { unit: true, guests: { include: { guest: true } } },
    });
  }

  async findOne(id: string) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id },
      include: {
        unit: true,
        property: true,
        user: true,
        guests: { include: { guest: true } },
        payments: true,
        financialTransactions: true,
      },
    });
    if (!reservation) throw new NotFoundException(`Reservation ${id} not found`);
    return reservation;
  }

  async update(id: string, dto: UpdateReservationDto) {
    await this.findOne(id);
    const { guestIds, ...reservationData } = dto;

    return this.prisma.reservation.update({
      where: { id },
      data: {
        ...reservationData,
        ...(guestIds !== undefined && {
          guests: {
            deleteMany: {},
            create: guestIds.map((guestId) => ({ guestId })),
          },
        }),
      },
      include: { guests: true, payments: true },
    });
  }

  async cancel(id: string) {
    await this.findOne(id);
    return this.prisma.reservation.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.reservation.delete({ where: { id } });
  }
}
