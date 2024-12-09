import { ResumeFromValues } from "@/lib/validations/resume";
import api from "@/utils/axios";

export const updateResumeData = async (
    resumeId: string, 
    resumeData: ResumeFromValues
): Promise<ResumeFromValues> => {
    try {
        const response = await api.put(`/resume/update/${resumeId}`, resumeData);
        return response.data.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || 
            "Failed to update resume data"
        );
    }
};