import { SignUpFormValues, signUpSchema } from "@/lib/validations/auth";
import api from "@/utils/axios";

// Function to handle user register
export const Registerhandle = async (data: SignUpFormValues) => {
    try {
        // Validate the form data
        const validatedFields = signUpSchema.safeParse(data);

        if (validatedFields.success) {
            const { email, username, name, password } = validatedFields.data;

            // Send POST request to the register endpoint
            const response = await api.post(`/auth/register`, {
                email,
                username,
                name,
                password,
            });
            
            // Return the user data if the response is successful
            return response.data;
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
