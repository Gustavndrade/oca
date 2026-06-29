import { z } from 'zod';

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório.' }),

  document: z
    .string()
    .regex(/^\d{11}$|^\d{14}$/, {
      message: 'Documento deve conter 11 dígitos (CPF) ou 14 dígitos (CNPJ), sem formatação.',
    }),

  password: z.string().min(8, { message: 'A senha deve ter no mínimo 8 caracteres.' }),
});

export type RegisterDto = z.infer<typeof RegisterSchema>;
