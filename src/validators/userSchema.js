import { z } from 'zod'

export const userSignUpSchema = z.object({
    email: z.string().email(),
    username: z.string().min(3),
    password: z
    .string()
    .min(6)
    .max(16)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,16}$/
    ),
});