"use client";

import { useState } from "react";
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
import { LogInFormValues, LogInSchema } from "@/lib/validations/auth";
import {
    GithubLogo,
    GoogleLogo,
    Moon,
    SunDim,
    ArrowRight,
    CircleNotch,
} from "@phosphor-icons/react";
import { handleLogin } from "../../../../action/auth/login";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<LogInFormValues>({
        resolver: zodResolver(LogInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: LogInFormValues) {
        try {
            const response = await handleLogin(values);
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

    // Handle Ctrl key for password visibility
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

    const onclick = () =>{
        router.push('/');
    }

    return (
        <div className="min-h-screen w-full flex">
            {/* Left Column */}
            <div className="w-full lg:w-[480px] dark:bg-black p-10 flex flex-col">
                <div className="flex justify-between items-center mb-20">
                    <div 
                    onClick={onclick}
                    className="flex items-center gap-2">
                        <div className="w-8 h-8 ">
                            <Image
                                src={"/logo.svg"}
                                alt="Rexumi"
                                height={30}
                                width={30}
                                className=" bg-center bg-cover"
                            />
                        </div>
                        <h1 className="text-xl">Rexumi</h1>
                    </div>
                </div>

                <div className="flex-1">
                    <h1 className="text-2xl font-semibold mb-2">
                        Sign in to your account
                    </h1>
                    <p className=" flex gap-1.5 items-center text-gray-400 text-sm mb-8 font-light">
                        Don&apos;t have an account ?
                        <Link
                            href="/register"
                            className=" flex items-center gap-1.5 text-white  hover:underline"
                        >
                            Create one now <ArrowRight size={15} />
                        </Link>
                    </p>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm ">
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="john.doe@example.com"
                                                {...field}
                                                className=" placeholder:text-sm  placeholder:font-light placeholder:text-gray-400"
                                            />
                                        </FormControl>
                                        <p className="text-xs text-gray-400">
                                            You can also enter your username.
                                        </p>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm">
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
                                            <kbd className="px-2 font-medium py-1">
                                                Ctrl
                                            </kbd>{" "}
                                            to display your password
                                            temporarily.
                                        </p>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center justify-between  gap-5 pt-2">
                                <Button
                                    type="submit"
                                    variant={"default"}
                                    className="w-full rounded-[2px]"
                                >
                                    {form.formState.isSubmitting ? (
                                        <CircleNotch
                                            size={32}
                                            className=" animate-spin"
                                        />
                                    ) : (
                                        "sign in"
                                    )}
                                </Button>
                                <Button variant="link">Forgot Password?</Button>
                            </div>
                        </form>
                    </Form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-800"></div>
                            </div>
                            <div className="relative flex justify-center  text-xs">
                                <span className="px-2 bg-black text-gray-400">
                                    or continue with
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <Button
                                variant="default"
                                className=" rounded-[2px]  text-white bg-[#222222] hover:bg-[#222222d1] cursor-not-allowed"
                            >
                                <GithubLogo size={32} />
                                GitHub
                            </Button>
                            <Button className="rounded-[2px]  text-white hover:bg-[#4286f4d1] bg-[#4285F4] cursor-not-allowed">
                                <GoogleLogo size={32} />
                                Google
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column - Background Image */}
            <div className="hidden lg:block flex-1 relative">
                <Image
                    src="/bg2.jpeg"
                    alt="background"
                    fill
                    quality={100}
                    className="  object-cover "
                    priority
                />
                <div className="absolute select-none  text-black p-2 bottom-4 right-4  font-light text-sm bg-opacity-20 bg-white shadow-md backdrop-filter backdrop-blur-md">
                    Photograph Created by AI
                </div>
            </div>
        </div>
    );
}
