"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    accountFormSchema,
    AccountFormValues,
} from "@/lib/validations/setting";
import { Check } from "@phosphor-icons/react";
import { useState } from "react";
import { useUserContext } from "@/contexts/UserContex";
import { useToast } from "@/hooks/use-toast";
import { SendVerifyEmail } from "../../../../../../action/auth/send-verify-email";

export function AccountForm() {
    const { toast } = useToast();
    const { user, isAuthenticated } = useUserContext();
    const [sending, setSending] = useState(false);

    const form = useForm<AccountFormValues>({
        resolver: zodResolver(accountFormSchema),
        defaultValues: {
            picture:
                "https://lh3.googleusercontent.com/a/ACg8ocJGb3NfOFh92iB20C2ATwYY2SK04rYx7oac1PQnl",
            name: user?.name || "Name",
            username: user?.username || "Username",
            email: user?.email || "Email",
        },
    });

    // Watch the input values
    const name = form.watch("name");
    const username = form.watch("username");
    const email = form.watch("email");
    const picture = form.watch("picture");

    function onSubmit(data: AccountFormValues) {
        console.log(data);
    }

    async function onVerifyEmail() {
        try {
            await SendVerifyEmail();
            setSending(true);
            toast({
                variant: "success",
                title: "Email verification sent",
                description: "Check your email for the verification link",
            })
        } catch (error) {
            toast({
                variant: "destructive",
                title: "An unexpected error occurred",
            });
        }
    }

    function onDiscard() {
        form.reset();
    }

    // Check if any field has changed from the default values
    const isChanged =
        name !== form.control._defaultValues.name ||
        username !== form.control._defaultValues.username ||
        email !== form.control._defaultValues.email ||
        picture !== form.control._defaultValues.picture;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="picture"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Picture</FormLabel>
                                <FormControl>
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-12 w-12 rounded">
                                            <AvatarImage src={field.value} />
                                            <AvatarFallback>FK</AvatarFallback>
                                        </Avatar>
                                        <Input {...field} />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <div className="flex items-center gap-2">
                                        <Input {...field} type="email" />
                                        {user?.verified ? (
                                            <span className="flex items-center text-sm text-emerald-500">
                                                <Check className="mr-1 h-4 w-4" />
                                                Verified
                                            </span>
                                        ) : (
                                            <Button
                                                variant={"ghost"}
                                                className=" text-red-500  hover:text-red-600"
                                                onClick={onVerifyEmail}
                                            >
                                                Verify Email
                                            </Button>
                                        )}
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                {sending && (
                    <p className="rounded-[2px] p-4 bg-emerald-700 text-xs sm:text-sm mb-6 sm:mb-8 font-light">
                        Please verify that the email has been sent to your email
                        address. Check your inbox or spam folder for
                        confirmation
                    </p>
                )}

                <div className="w-full flex justify-end items-end">
                    {isChanged && (
                        <div
                            className="flex items-center gap-4 transition-all duration-300 ease-in-out 
            opacity-100 animate-slide-in-down"
                        >
                            <Button
                                type="submit"
                                className="bg-white text-black hover:bg-zinc-200"
                            >
                                Save Changes
                            </Button>
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={onDiscard}
                                className="text-zinc-400 hover:text-white hover:bg-transparent"
                            >
                                Discard
                            </Button>
                        </div>
                    )}
                </div>
            </form>
        </Form>
    );
}
