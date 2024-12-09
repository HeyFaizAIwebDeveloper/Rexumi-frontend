"use client";

import { useToast } from "@/hooks/use-toast";
import api from "@/utils/axios";
import { useRouter } from "next/navigation";
import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";

interface User {
    _id: string;
    email: string;
    username: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    refreshToken:string;
}

interface UserContextType {
    user: User | null;
    checkAuth: () => boolean;
    loading: boolean;
}

// Create a Context
export const UserContext = createContext<UserContextType | undefined>(
    undefined
);


// Create a Provider Component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { toast } = useToast();
    const router = useRouter();
    const [user, setUser] = useState(null); // User state
    const [loading, setLoading] = useState(true); // Loading state

    const handleApiError = (error: any, defaultMessage: string) => {
        router.push("/dashboard/resumes")
        toast({
            title: "Error",
            description: error.response?.data?.message || defaultMessage,
            variant: "destructive",
        });
        throw error;
    };

    // Simulate fetching user data (e.g., from an API or local storage)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get("/user/me");
                setUser(response.data.data);
                setLoading(false)
            } catch (error) {
                handleApiError(error, "Failed to fetch resumes");
            }
        };

        fetchUser();
    }, []);

    // Check if user is authenticated
    const checkAuth = () => {
        return user !== null; // User is authenticated if user is not null
    };

    return (
        <UserContext.Provider value={{ user, checkAuth, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const userContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useResumeContext must be used within a ResumeProvider");
    }
    return context;
};