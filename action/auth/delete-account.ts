import { DeleteAccountFormValues, deleteAccountSchema } from "@/lib/validations/setting";
import api from "@/utils/axios";

export const deleteAccount = async (data: DeleteAccountFormValues) => {
    try {
        // Validate the form data
        const validatedFields = deleteAccountSchema.safeParse(data);

        if (validatedFields.success) {
            const { password } = validatedFields.data;

            const response = await api.delete(`/auth/delete`, { 
                data: { password } 
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