import { ConflictException, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateProfileDto } from './dto/update-user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const existing = await this.prisma.user.findUnique({
      where: { document: dto.document },
    });

    if (existing) {
      throw new ConflictException(
        'Não foi possível concluir o cadastro. Verifique os dados e tente novamente.',
      );
    }

    const hashedPassword = await argon2.hash(dto.password);
    return this.prisma.user.create({
      data: { ...dto, password: hashedPassword },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        document: true,
        createdAt: true,
        isActive: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { organization: true, userProperties: true },
    });

    if (!user) throw new NotFoundException(`Usuário ${id} não encontrado.`);

    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.findOne(id);

    const data: UpdateUserDto & { password?: string } = { ...dto };

    if (dto.password) {
      data.password = await argon2.hash(dto.password);
    }

    return this.prisma.user.update({ where: { id }, data });
  }

  async updateProfile(id: string, dto: UpdateProfileDto) {
    const user = await this.findOne(id);

    const data: { name?: string; password?: string } = {};

    if (dto.name) {
      data.name = dto.name;
    }

    if (dto.newPassword && dto.oldPassword) {
      const isPasswordValid = await argon2.verify(user.password, dto.oldPassword);
      if (!isPasswordValid) {
        throw new BadRequestException('A senha antiga informada está incorreta.');
      }
      data.password = await argon2.hash(dto.newPassword);
    }

    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
