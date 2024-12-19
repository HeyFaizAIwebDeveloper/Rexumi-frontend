import { passwordFormSchema, PasswordFormValues } from "@/lib/validations/setting";
import api from "@/utils/axios";


export const changePassword = async (data: PasswordFormValues) => {
    try {
        // Validate the form data
        const validatedFields = passwordFormSchema.safeParse(data);

        if (validatedFields.success) {
            const { newPassword, confirmPassword } = validatedFields.data;

            const response = await api.post(`/auth/change-password`, { 
                newPassword,
                confirmPassword
             });
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