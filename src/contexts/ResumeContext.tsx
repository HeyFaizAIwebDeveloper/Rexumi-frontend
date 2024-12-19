"use client";

import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect,
    useCallback,
} from "react";
import { ResumeFromValues } from "@/lib/validations/resume";
import { useToast } from "@/hooks/use-toast";
import api from "@/utils/axios";
import { useRouter } from "next/navigation";

interface ResumeMetadata {
    _id: string;
    name: string;
    slug: string;
    userId: { email: string };
    resumeData?: string;
    createdAt: string;
}

interface ResumeDataType extends ResumeFromValues {
    _id?: string;
}

interface ResumeContextType {
    resumes: ResumeMetadata[];
    resumeData: ResumeDataType | null;
    setResumeData: React.Dispatch<React.SetStateAction<ResumeDataType | null>>;
    getResumes: () => Promise<void>;
    getResumeById: (id: string) => Promise<ResumeMetadata>;
    getResumeData: (id: string) => Promise<void>;
    createNewResume: (name: string) => Promise<ResumeMetadata>;
    deleteResume: (id: string) => Promise<void>;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const { toast } = useToast();
    const router = useRouter();
    const [resumes, setResumes] = useState<ResumeMetadata[]>(() => {
        // Initialize resumes from localStorage or empty array
        try {
            const storedResumes = localStorage.getItem("resumes");
            return storedResumes ? JSON.parse(storedResumes) : [];
        } catch (error) {
            // If parsing fails, return an empty array
            console.error("Error parsing stored resumes:", error);
            return [];
        }
    });
    const [resumeData, setResumeData] = useState<ResumeDataType | null>(() => {
        // Initialize resumeData from localStorage or null
        try {
            const storedResumeData = localStorage.getItem("currentResumeData");
            return storedResumeData ? JSON.parse(storedResumeData) : null;
        } catch (error) {
            // If parsing fails, return null
            console.error("Error parsing stored resume data:", error);
            return null;
        }
    });

    // Update localStorage when resumes change
    useEffect(() => {
        localStorage.setItem("resumes", JSON.stringify(resumes));
    }, [resumes]);

    // Update localStorage when resumeData changes
    useEffect(() => {
        if (resumeData) {
            localStorage.setItem(
                "currentResumeData",
                JSON.stringify(resumeData)
            );
        } else {
            localStorage.removeItem("currentResumeData");
        }
    }, [resumeData]);

    const handleApiError = (error: any, defaultMessage: string) => {
        toast({
            title: "Error",
            description: error.response?.data?.message || defaultMessage,
            variant: "destructive",
        });
        // Optionally uncomment if you want to redirect on error
        // router.push("/")

        throw error;
    };

    const getResumes = useCallback(async () => {
        try {
            const response = await api.get("/resume/getresumes");
            const fetchedResumes = response.data.data;
            setResumes(fetchedResumes);
            // Also update localStorage
            localStorage.setItem("resumes", JSON.stringify(fetchedResumes));
        } catch (error) {
            handleApiError(error, "Failed to fetch resumes");
        }
    }, []);

    const getResumeById = async (id: string) => {
        try {
            const response = await api.get(`/resume/${id}`);
            return response.data.data;
        } catch (error) {
            handleApiError(error, "Failed to fetch resume data");
        }
    };

    const getResumeData = async (id: string) => {
        try {
            const response = await api.get(`/resume/getdata/${id}`);
            const fetchedResumeData = response.data.data;
            setResumeData(fetchedResumeData);
            // Also update localStorage
            localStorage.setItem(
                "currentResumeData",
                JSON.stringify(fetchedResumeData)
            );
        } catch (error) {
            handleApiError(error, "Failed to fetch resume data");
        }
    };

    const createNewResume = async (name: string) => {
        try {
            const response = await api.post("/resume/new", { name });
            const newResume = response.data.data;
            setResumeData(null);
            setResumes((prev) => [...prev, newResume]);
            return newResume;
        } catch (error) {
            handleApiError(error, "Failed to create resume");
        }
    };

    const deleteResume = async (id: string) => {
        try {
            await api.delete(`/resume/delete/${id}`);
            const updatedResumes = resumes.filter(
                (resume) => resume._id !== id
            );
            setResumes(updatedResumes);
            setResumeData(null);
            toast({
                title: "Success",
                description: "Resume deleted successfully",
            });
        } catch (error) {
            handleApiError(error, "Failed to delete resume");
        }
    };

    return (
        <ResumeContext.Provider
            value={{
                resumes,
                resumeData,
                setResumeData,
                getResumes,
                getResumeById,
                getResumeData,
                createNewResume,
                deleteResume,
            }}
        >
            {children}
        </ResumeContext.Provider>
    );
};

export const useResumeContext = () => {
    const context = useContext(ResumeContext);
    if (context === undefined) {
        throw new Error(
            "useResumeContext must be used within a ResumeProvider"
        );
    }
    return context;
};
