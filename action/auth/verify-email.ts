import api from "@/utils/axios";

export const VerifyEmail = async (verifyToken: string) => {
    try {
        const response = await api.post(`/auth/verify-email/${verifyToken}`);
        return response.data;
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
