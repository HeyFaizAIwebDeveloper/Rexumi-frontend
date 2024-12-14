import api from "@/utils/axios";

export const VerifyResetToken = async (resetToken: string) => {
    try {
        const response = await api.post(
            `/auth/verify-reset-token/${resetToken}`
        );

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
