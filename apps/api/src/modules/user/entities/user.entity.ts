import { User } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  name: string;
  document: string | null;
  password: string;
  createdAt: Date;
  isActive: boolean;
}
