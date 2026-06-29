import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto implements Partial<CreateUserDto> {
  name?: string;
  document?: string;
  password?: string;
  isActive?: boolean;
}
