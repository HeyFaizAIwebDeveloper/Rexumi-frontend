import * as z from "zod"

export const accountFormSchema = z.object({
  picture: z.string().url({
    message: "Please enter a valid URL.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

export const passwordFormSchema = z.object({
  newPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const deleteAccountSchema = z.object({
    confirmText: z.string().refine((val) => val === "delete", {
        message: 'Please type "delete" to confirm',
    }),
    password: z.string().min(1, "Password is required"),
});
  
export type DeleteAccountFormValues = z.infer<typeof deleteAccountSchema>
export type AccountFormValues = z.infer<typeof accountFormSchema>
export type PasswordFormValues = z.infer<typeof passwordFormSchema>