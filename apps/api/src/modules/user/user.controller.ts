import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserSchema, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserSchema, UpdateUserDto, UpdateProfileSchema, UpdateProfileDto } from './dto/update-user.dto';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { UserEntity } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  create(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Get(':id')
  async findUser(@Param("id") id: string) {
    return this.userService.findUser(id);
  }

  @Patch(':id')
  async deleteUser(@Param("id") id: string) {
    return this.userService.deleteUser(id);
  }
}
