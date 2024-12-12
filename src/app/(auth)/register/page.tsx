"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
import { SignUpFormValues, signUpSchema } from "@/lib/validations/auth";
import {
    GithubLogo,
    GoogleLogo,
    ArrowRight,
    CircleNotch,
} from "@phosphor-icons/react";
import { Registerhandle } from "../../../../action/auth/register";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: SignUpFormValues) {
        try {
            const response = await Registerhandle(values);
            if (response.success) {
                toast({
                    variant: "success",
                    title: response.message,
                });
                router.push("/dashboard/resumes");
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
        router.push('/');
    }

    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row">
            {/* Left Column - Signup Form */}
            <div className="w-full lg:w-[480px] dark:bg-black p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
                {/* Header */}
                <div className="flex justify-between items-center mb-6 sm:mb-8 lg:mb-10">
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

                {/* Signup Content */}
                <div className="w-full max-w-md mx-auto">
                    <h1 className="text-xl sm:text-2xl font-semibold mb-2">
                        Create a new account
                    </h1>
                    <p className="flex flex-wrap gap-1.5 items-center text-gray-400 text-xs sm:text-sm mb-6 sm:mb-8 font-light">
                        Already have an account?
                        <Link
                            href="/login"
                            className="flex items-center gap-1.5 text-white hover:underline"
                        >
                            Sign in now <ArrowRight size={15} />
                        </Link>
                    </p>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4 sm:space-y-6"
                        >
                            {/* Name Input */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs sm:text-sm">
                                            Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="John Doe"
                                                {...field}
                                                className="placeholder:text-xs sm:placeholder:text-sm placeholder:font-light placeholder:text-gray-400"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Username Input */}
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs sm:text-sm">
                                            Username
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="john.doe"
                                                {...field}
                                                className="placeholder:text-xs sm:placeholder:text-sm placeholder:font-light placeholder:text-gray-400"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Email Input */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs sm:text-sm">
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="john.doe@example.com"
                                                type="email"
                                                className="placeholder:text-xs sm:placeholder:text-sm placeholder:font-light placeholder:text-gray-400"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Password Input */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs sm:text-sm">
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <div className="space-y-1">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    onKeyDown={handleKeyDown}
                                                    onKeyUp={handleKeyUp}
                                                    {...field}
                                                />
                                                <p className="text-xs text-gray-400">
                                                    Hold{" "}
                                                    <kbd className="px-1 sm:px-2 font-medium py-0.5 sm:py-1 text-xs">
                                                        Ctrl
                                                    </kbd>{" "}
                                                    to display your password temporarily.
                                                </p>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Submit Button */}
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
                                    "Sign up"
                                )}
                            </Button>
                        </form>
                    </Form>

                    {/* Social Login */}
                    <div className="mt-6 sm:mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-800"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-2 bg-black text-gray-400">
                                    or continue with
                                </span>
                            </div>
                        </div>

                        <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-3 sm:gap-4">
                            <Button
                                variant="default"
                                className="rounded-[2px] text-white bg-[#222222] hover:bg-[#222222d1] cursor-not-allowed flex items-center gap-2"
                            >
                                <GithubLogo size={24} />
                                <span className="text-xs sm:text-sm">GitHub</span>
                            </Button>
                            <Button 
                                className="rounded-[2px] text-white hover:bg-[#4286f4d1] bg-[#4285F4] cursor-not-allowed flex items-center gap-2"
                            >
                                <GoogleLogo size={24} />
                                <span className="text-xs sm:text-sm">Google</span>
                            </Button>
                        </div>
                    </div>
                </div>
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