"use client";

import api from "@/utils/axios";
import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
} from "react";

interface User {
    _id: string;
    email: string;
    name: string;
    username: string;
    verified: boolean;
}

interface UserContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};

const USER_STORAGE_KEY = "user_details";

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        if (typeof window !== "undefined") {
            const storedUser = sessionStorage.getItem(USER_STORAGE_KEY);
            return storedUser ? JSON.parse(storedUser) : null;
        }
        return null;
    });

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const storedUser = sessionStorage.getItem(USER_STORAGE_KEY);

            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setIsAuthenticated(true);
                setLoading(false);
                return;
            }

            try {
                const response = await api.get("/user/me");
                const data: User = response.data.data;
                sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data));
                setUser(data);
                setIsAuthenticated(true);
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : "An error occurred";
                setError(errorMessage);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    const contextValue: UserContextType = {
        user,
        loading,
        error,
        isAuthenticated,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
