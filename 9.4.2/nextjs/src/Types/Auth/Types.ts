import { z } from 'zod'

export const LoginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

export const RegisterSchema = z.object({
  name: z.string().min(1, 'First name is required').max(32),
  surname: z.string().min(1, 'Last name is required').max(32),
  userName: z
    .string()
    .min(2, 'Username must be at least 2 characters')
    .max(32)
    .refine((val) => !val.includes('@'), {
      message: 'Username cannot be an email address',
    }),
  emailAddress: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, 'Must be at least 8 characters')
    .regex(/[a-z]/, 'Must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),
})

export type LoginState =
  | {
      errors?: {
        username?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

export type RegisterState =
  | {
      errors?: {
        name?: string[]
        surname?: string[]
        userName?: string[]
        emailAddress?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined
