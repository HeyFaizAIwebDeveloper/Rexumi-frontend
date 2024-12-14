import {
    ForgotPasswordFormValues,
    forgotPasswordSchema,
} from "@/lib/validations/auth";
import api from "@/utils/axios";

export const ForgotPassword = async (data: ForgotPasswordFormValues) => {
    try {
        // Validate the form data
        const validatedFields = forgotPasswordSchema.safeParse(data);

        if (validatedFields.success) {
            const { email } = validatedFields.data;

            const response = await api.post(`/auth/reset-password`, { email });
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
