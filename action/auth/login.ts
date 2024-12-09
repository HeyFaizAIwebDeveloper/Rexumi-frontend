import api from "@/utils/axios";
import { LogInFormValues, LogInSchema } from "@/lib/validations/auth";
import { setAccessToken, setRefreshToken } from "@/utils/cookies";

// Function to handle user login
export const handleLogin = async (data: LogInFormValues) => {
    try {
        // Validate the login form data against the schema
        const validatedFields = LogInSchema.safeParse(data);
        if (validatedFields.success) {
            // Destructure email and password from validated data
            const { email, password } = validatedFields.data;
    
            // Send POST request to the login endpoint
            const response = await api.post(`/auth/login`, {
                email, 
                password, 
            });
            // Check if the response status is 200 (OK)
            if (response.status === 200) {
                // Correctly destructuring the accessToken and refreshToken from the response
                const { accessToken, refreshToken } = response.data.data;

                // Store the tokens in cookies
                setRefreshToken(refreshToken);
                setAccessToken(accessToken);

                // Return the response data
                return response.data;
            } else {
                // Throw an error if the status is not 200
                throw new Error("Login failed");
            }
        } else {
            // Handle validation errors
            throw new Error("Validation failed");
        }
    } catch (error:any) {
        // Check if the error has a response from the server
        if (error.response && error.response.data) {
            // Return the error message from the server response
            return {
                error: error.response.data.message || "An unexpected error occurred",
            };
        } else {
            // Return a generic error message for network errors or other issues
            return { error: "An unexpected error occurred" };
        }
    }
};