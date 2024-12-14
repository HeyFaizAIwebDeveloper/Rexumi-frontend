"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { CircleNotch, ArrowLeft } from "@phosphor-icons/react";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
    ResetPasswordFormValues,
    resetPasswordSchema,
} from "@/lib/validations/auth";
import { ResetPassword } from "../../../../../action/auth/reset-password";
import { VerifyResetToken } from "../../../../../action/auth/verify-reset-token";

export default function ResetPasswordPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [tokenExpire, setTokenExpire] = useState(false);
    const router = useRouter();
    const { toast } = useToast();
    const params = useParams();
    const Token = params.resetToken as string;

    const form = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            newPassword: "",
        },
    });

    useEffect(() => {
        const verifyToken = async () => {
            const response = await VerifyResetToken(Token);
            if (!response.data.resetPasswordToken) {
                return router.push("/login");
            }

            if (!response.data.resetPasswordExpire) {
                setTokenExpire(true);
            }
        };

        if (Token) {
            verifyToken();
        }
    }, [router, Token]);

    async function onSubmit(values: ResetPasswordFormValues) {
        try {
            const response = await ResetPassword(Token, values);
            if (response.success) {
                toast({
                    variant: "success",
                    title: "Your password has been reset successfully!",
                    description: response.message,
                });
                router.refresh();
                router.push("/login");
            } else {
                toast({
                    variant: "destructive",
                    title: response.error,
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "An unexpected error occurred",
            });
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Control") {
            setShowPassword(true);
        }
    };

    const handleKeyUp = (e: React.KeyboardEvent) => {
        if (e.key === "Control") {
            setShowPassword(false);
        }
    };

    const onclick = () => {
        router.push("/");
    };

    const back = () => {
        router.refresh();
        router.push("/login");
    };

    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row">
            {/* Left Column - Login Form */}
            <div className="w-full lg:w-[480px] bg-black p-4 sm:p-6 lg:p-10 flex flex-col justify-center">
                {/* Header */}
                <div className="flex justify-between items-center mb-4 sm:mb-8 lg:mb-10 select-none">
                    <div
                        onClick={onclick}
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <div className="w-6 h-6 sm:w-8 sm:h-8">
                            <Image
                                src={"/logo.svg"}
                                alt="Rexumi"
                                height={30}
                                width={30}
                                className="bg-center bg-cover"
                            />
                        </div>
                        <h1 className="text-lg sm:text-xl">Rexumi</h1>
                    </div>
                </div>

                {tokenExpire ? (
                    <div className="w-full max-w-md mx-auto space-y-5 select-none ">
                        <h1 className="text-xl sm:text-2xl font-semibold mb-2">
                            Your session has expired
                        </h1>
                        <p className="flex flex-wrap rounded-[2px] gap-1.5  items-center p-4 bg-red-700 text-xs sm:text-sm mb-6 sm:mb-8 font-light">
                            It looks like the reset token you provided is
                            invalid. Please try restarting the password reset
                            process again.
                        </p>

                        <Button
                            onClick={back}
                            variant="secondary"
                            className="text-xs sm:text-sm w-full"
                        >
                            <ArrowLeft size={24} />
                            Back
                        </Button>
                    </div>
                ) : (
                    <div className="w-full max-w-md mx-auto">
                        <h1 className="text-xl sm:text-2xl font-semibold mb-2">
                            Reset your password
                        </h1>
                        <p className="flex flex-wrap gap-1.5 items-center text-gray-400 text-xs sm:text-sm mb-6 sm:mb-8 font-light">
                            Enter a new password below, and make sure it's
                            secure.
                        </p>

                        {/* Form */}
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4 sm:space-y-6"
                            >
                                <FormField
                                    control={form.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs sm:text-sm">
                                                Password
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type={
                                                        showPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    onKeyDown={handleKeyDown}
                                                    onKeyUp={handleKeyUp}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <p className="text-xs text-gray-400">
                                                Hold{" "}
                                                <kbd className="px-1 sm:px-2 font-medium py-0.5 sm:py-1 text-xs">
                                                    Ctrl
                                                </kbd>{" "}
                                                to display your password
                                                temporarily.
                                            </p>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Actions */}
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                                    <Button
                                        type="submit"
                                        variant="default"
                                        className="w-full rounded-[2px]"
                                    >
                                        {form.formState.isSubmitting ? (
                                            <CircleNotch
                                                size={24}
                                                className="animate-spin"
                                            />
                                        ) : (
                                            "Change Password"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                )}
            </div>

            {/* Right Column - Background Image */}
            <div className="hidden lg:block flex-1 relative">
                <Image
                    src="/bg.jpeg"
                    alt="background"
                    fill
                    quality={100}
                    className="object-cover"
                    priority
                />
                <div className="absolute select-none text-black p-2 bottom-4 right-4 font-light text-xs bg-opacity-50 bg-white shadow-md backdrop-filter backdrop-blur-md">
                    Photograph Created by AI
                </div>
            </div>
        </div>
    );
}
