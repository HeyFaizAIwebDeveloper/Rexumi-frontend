"use client";

import { useUserContext } from "@/contexts/UserContex";
import { useToast } from "@/hooks/use-toast";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { VerifyEmail } from "../../../../../action/auth/verify-email";
import { CircleNotch } from "@phosphor-icons/react";

export default function VerifyEmailPage() {
    const { toast } = useToast();
    const router = useRouter();
    const params = useParams();
    const Token = params.id as string;
    const { user, isAuthenticated } = useUserContext();
    const [isValidToken, setIsValidToken] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isVerified, setIsVerified] = useState(user?.verified || false);

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await VerifyEmail(Token);
                if (response.success) {
                    setIsValidToken(true);
                    setIsVerified(true);
                    if (response.data === "Verification email already sent") {
                        toast({
                            variant: "destructive",
                            title: "Verification email already sent",
                            description: "Please check your email inbox",
                        });
                    } else {
                        toast({
                            variant: "success",
                            title: "Your email has been verified successfully! Please login to continue.",
                        });

                        router.refresh();
                        isAuthenticated
                            ? router.push("/settings")
                            : router.push("/login");
                    }
                }
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "An unexpected error occurred",
                    description: `${error}`,
                });
                isAuthenticated
                    ? router.push("/settings")
                    : router.push("/login");
            } finally {
                setLoading(false);
            }
        };
        if (Token) {
            if (!isVerified) {
                verifyEmail();
            }
        }
    }, [Token, isAuthenticated, isVerified, router, toast, user?.verified]);

    return (
        <>
            {loading && (
                <div className=" min-h-screen w-full flex justify-center items-center">
                    <CircleNotch
                        size={40}
                        weight="bold"
                        className="animate-spin"
                    />
                </div>
            )}
        </>
    );
}
