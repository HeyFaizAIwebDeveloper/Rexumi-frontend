"use client";

import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useCallback,
    useMemo,
} from "react";
import { useToast } from "@/hooks/use-toast";
import api from "@/utils/axios";
import { AtsScore } from "@/types/type";

// Enhanced type definitions
interface AtsScoreChecker extends AtsScore {
    // Store in session storage
    data( // Store in session storage
        data: any
    ): unknown;
    id: string;
}
interface AtsUsage {
    userId: string;
    count: number;
    lastCheckedAt: string;
}

interface AtsScoreContextType {
    getAllAtsScores: (id: string) => Promise<AtsScore[] | undefined>;
    getAtsScore: (id: string) => Promise<AtsScoreChecker | undefined>;
    checkAtsScore: (id: string) => Promise<AtsScoreChecker | undefined>;
    clearAtsScore: () => void;
    getAtsUsage: () => Promise<AtsUsage | undefined>;
}

const AtsScoreContext = createContext<AtsScoreContextType | undefined>(
    undefined
);

export const AtsScoreProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const { toast } = useToast();

    const showErrorToast = useCallback(
        (title: string, error: any) => {
            toast({
                variant: "destructive",
                title,
                description: error.message || "An unexpected error occurred",
            });
        },
        [toast]
    );

    const getAtsScore = useCallback(
        async (id: string): Promise<AtsScoreChecker | undefined> => {
            try {
                // First, check session storage
                const storedScore = localStorage.getItem(`atsScore_${id}`);
                if (storedScore) {
                    const parsedScore = JSON.parse(storedScore);

                    return parsedScore;
                }

                // If not in storage, fetch from API
                const response = await api.get(`/ai/ats-data/${id}`);
                const score = response.data;

                // Store in session storage
                localStorage.setItem(`atsScore_${id}`, JSON.stringify(score));
                return score;
            } catch (error: any) {
                showErrorToast("Error fetching ATS score", error);
                return undefined;
            }
        },
        [showErrorToast]
    );

    const getAllAtsScores = useCallback(
        async (id: string): Promise<AtsScore[] | undefined> => {
            try {
                const response = await api.get(`/ai/ats-all-data/${id}`);
                const allScores = response.data;

                // Optional: Store in session storage
                localStorage.setItem(
                    "all-atsScores",
                    JSON.stringify(allScores)
                );

                return allScores;
            } catch (error: any) {
                showErrorToast("Error fetching ATS scores", error);
                return undefined;
            }
        },
        [showErrorToast]
    );

    const checkAtsScore = useCallback(
        async (id: string): Promise<AtsScoreChecker | undefined> => {
            // First, check session storage
            const storedScore = localStorage.getItem(`atsScore_${id}`);

            if (storedScore) {
                // If a stored score exists, remove it
                localStorage.removeItem(`atsScore_${id}`);
            } else {
                try {
                    // Make a POST request to check ATS score
                    const response = await api.post(`/ai/ats-checker/${id}`);

                    if (response.data.success) {
                        // If successful, store and set the score
                        const score = response.data;
                        localStorage.setItem(
                            `atsScore_${id}`,
                            JSON.stringify(score)
                        );
                        return score;
                    } else {
                        // If not successful, try to get existing ATS score
                        getAtsScore(id);
                        return response.data;
                    }
                } catch (error: any) {
                    // Handle any errors
                    showErrorToast("Error checking ATS score", error);
                    return undefined;
                }
            }
        },
        [showErrorToast]
    );

    const getAtsUsage = useCallback(async (): Promise<AtsUsage | undefined> => {
        try {
            // First, check local storage
            const storedUsage = localStorage.getItem("atsUsage");
            if (storedUsage) {
                return JSON.parse(storedUsage);
            }

            // Fetch from API if not in local storage
            const response = await api.get(`/ai/ats-usage`);
            const usageData = response.data;

            // Store in local storage
            localStorage.setItem("atsUsage", JSON.stringify(usageData));

            return usageData;
        } catch (error: any) {
            showErrorToast("Error fetching ATS usage", error);
            return undefined;
        }
    }, [showErrorToast]);

    const clearAtsScore = useCallback(() => {
        // Optionally clear session storage
        localStorage.removeItem("atsScore");
    }, []);

    // Memoize context value to prevent unnecessary re-renders
    const contextValue = useMemo(
        () => ({
            getAllAtsScores,
            getAtsScore,
            checkAtsScore,
            clearAtsScore,
            getAtsUsage, // Add new method
        }),
        [
            getAllAtsScores,
            getAtsScore,
            checkAtsScore,
            clearAtsScore,
            getAtsUsage,
        ]
    );

    return (
        <AtsScoreContext.Provider value={contextValue}>
            {children}
        </AtsScoreContext.Provider>
    );
};

export const useAtsScore = () => {
    const context = useContext(AtsScoreContext);
    if (context === undefined) {
        throw new Error("useAtsScore must be used within an AtsScoreProvider");
    }
    return context;
};
