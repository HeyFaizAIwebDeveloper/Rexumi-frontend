"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
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

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { toast } = useToast();
    const router = useRouter();
    const [resumes, setResumes] = useState<ResumeMetadata[]>([]);
    const [resumeData, setResumeData] = useState<ResumeDataType | null>(null);

    const handleApiError = (error: any, defaultMessage: string) => {
        toast({
            title: "Error",
            description: error.response?.data?.message || defaultMessage,
            variant: "destructive",
        });
        // router.push("/")

        throw error;
    };

    const getResumes = async () => {
        try {
            const response = await api.get("/resume/getresumes");
            setResumes(response.data.data);
        } catch (error) {
            handleApiError(error, "Failed to fetch resumes");
        }
    };

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
            setResumeData(response.data.data);
        } catch (error) {
            handleApiError(error, "Failed to fetch resume data");
        }
    };

    const createNewResume = async (name: string) => {
        try {
            const response = await api.post("/resume/new", { name });
            const newResume = response.data.data;
            setResumeData(null)
            setResumes((prev) => [...prev, newResume]);
            return newResume;
        } catch (error) {
            handleApiError(error, "Failed to create resume");
        }
    };

    const deleteResume = async (id: string) => {
        try {
            await api.delete(`/resume/delete/${id}`);
            setResumes((prev) => prev.filter((resume) => resume._id !== id));
            setResumeData(null)
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
        throw new Error("useResumeContext must be used within a ResumeProvider");
    }
    return context;
};