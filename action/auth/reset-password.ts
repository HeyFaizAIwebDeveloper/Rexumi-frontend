import { ResetPasswordFormValues, resetPasswordSchema } from "@/lib/validations/auth";
import api from "@/utils/axios";

export const ResetPassword = async (
    resetToken: string,
    data: ResetPasswordFormValues
) => {
    try {
        // Validate the form data
        const validatedFields = resetPasswordSchema.safeParse(data);
        if (validatedFields.success) {
            const { newPassword } = validatedFields.data;

            const response = await api.post(`/auth/reset-password/${resetToken}`, { newPassword });
            if (response.status === 200) {
                return response.data;
            }
        }
    } catch (error: any) {
        if (error.response && error.response.data) {
            return {
                error:
                    error.response.data.message ||
                    "An unexpected error occurred",
            };
        } else {
            return { error: "An unexpected error occurred" };
        }
    }
};
