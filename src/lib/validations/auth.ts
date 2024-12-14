import * as z from "zod"

export const LogInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
})

export const signUpSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long",
  }),
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters long",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters",
    })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: "Username can only contain letters, numbers, underscores and dashes",
    }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
export type LogInFormValues = z.infer<typeof LogInSchema>
export type SignUpFormValues = z.infer<typeof signUpSchema>

