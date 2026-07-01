import { z } from 'zod';
import { CreateUserSchema } from './create-user.dto';

export const UpdateUserSchema = CreateUserSchema.partial().extend({
  isActive: z.boolean().optional(),
});

export class UpdateUserDto implements z.infer<typeof UpdateUserSchema> {
  name?: string;
  document?: string;
  password?: string;
  isActive?: boolean;
}

export const UpdateProfileSchema = z
  .object({
    name: z.string().min(1, { message: 'Nome não pode ser vazio.' }).optional(),
    oldPassword: z.string().optional(),
    newPassword: z
      .string()
      .min(8, { message: 'A nova senha deve ter no mínimo 8 caracteres.' })
      .optional(),
  })
  .refine(
    (data) => {
      if (data.newPassword && !data.oldPassword) {
        return false;
      }
      return true;
    },
    {
      message: 'Senha antiga é obrigatória para alterar a senha.',
      path: ['oldPassword'],
    },
  );

export class UpdateProfileDto implements z.infer<typeof UpdateProfileSchema> {
  name?: string;
  oldPassword?: string;
  newPassword?: string;
}
