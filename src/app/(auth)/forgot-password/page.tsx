"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// UI Components
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

// Icons
import { CircleNotch, ArrowLeft } from "@phosphor-icons/react";

// Hooks
import { useToast } from "@/hooks/use-toast";
import { ForgotPassword } from "../../../../action/auth/forgot-password";

// Actions


// Validation Schema
const forgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email address")
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
    const [sending, setSending] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const handleSubmit = async (values: ForgotPasswordFormValues) => {
      
        try {
            const response = await ForgotPassword(values);
            if (response.success) {
                setSending(true);
                toast({
                    variant: "success",
                    title: "Password Reset",
                    description: response.message
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: response.error
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Unexpected Error",
                description: "An unexpected error occurred. Please try again."
            });
        }
    };

    const handleBackToHome = () => {
        router.push("/");
    };

    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row">
            {/* Left Column */}
            <div className="w-full lg:w-[480px] bg-black p-4 sm:p-6 lg:p-10 flex flex-col justify-center">
                {/* Header */}
                <div className="flex justify-between items-center mb-4 sm:mb-8 lg:mb-10 select-none">
                    <div 
                        onClick={handleBackToHome} 
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <Image
                            src="/logo.svg"
                            alt="Rexumi"
                            width={30}
                            height={30}
                            className="bg-center bg-cover"
                        />
                        <h1 className="text-lg sm:text-xl">Rexumi</h1>
                    </div>
                </div>

                {sending ? (
                    <div className="w-full max-w-md mx-auto space-y-5 select-none">
                        <h1 className="text-xl sm:text-2xl font-semibold mb-2">
                            You've got mail!
                        </h1>
                        <p className="rounded-[2px] p-4 bg-emerald-700 text-xs sm:text-sm mb-6 sm:mb-8 font-light">
                            A password reset link should have been sent to your
                            inbox, if an account existed with the email you
                            provided.
                        </p>
                    </div>
                ) : (
                    <div className="w-full max-w-md mx-auto select-none">
                        <h1 className="text-xl sm:text-2xl font-semibold mb-2">
                            Forgot your password?
                        </h1>
                        <p className="text-gray-400 text-xs sm:text-sm mb-6 sm:mb-8 font-light">
                            Enter your email address and we will send you a link
                            to reset your password if the account exists.
                        </p>

                        <Form {...form}>
                            <form 
                                onSubmit={form.handleSubmit(handleSubmit)}
                                className="space-y-4 sm:space-y-6"
                            >
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="john.doe@example.com"
                                                    {...field}
                                                    className="placeholder:text-gray-400"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                                    <Link href="/login" prefetch>
                                        <Button variant="link">
                                            <ArrowLeft size={24} />
                                            Back
                                        </Button>
                                    </Link>
                                    <Button
                                        type="submit"
                                        className="w-full rounded-[2px]"
                                        disabled={form.formState.isSubmitting}
                                    >
                                        {form.formState.isSubmitting ? (
                                            <CircleNotch
                                                size={24}
                                                className="animate-spin"
                                            />
                                        ) : (
                                            "Send Email"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                )}
            </div>

            {/* Right Column */}
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