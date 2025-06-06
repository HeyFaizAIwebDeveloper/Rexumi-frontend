import api from "@/utils/axios";
import { deleteToken } from "@/utils/cookies";

export const handleLogout = async () => {
    try {
        const response = await api.post("/auth/logout");
        if (response.status == 200) {
            deleteToken();
            localStorage.removeItem('currentResumeData');
            localStorage.removeItem('atsUsage');
            localStorage.removeItem('resumes');
            for (const key in localStorage) {
                if (key.includes('atsScore_')) {
                    localStorage.removeItem(key);
                }
            }
            return response.data;
        }
    } catch (error: any) {
        if (error.response && error.response.data) {
            // Return the error message from the server response
            return {
                error:
                    error.response.data.message ||
                    "An unexpected error occurred",
            };
        } else {
            // Return a generic error message for network errors or other issues
            return { error: "An unexpected error occurred" };
        }
    }
};
