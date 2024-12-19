"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    PasswordFormValues,
    passwordFormSchema,
} from "@/lib/validations/setting";
import { useToast } from "@/hooks/use-toast";
import { changePassword } from "../../../../../../action/auth/change-password";
import { useState } from "react";

export function PasswordForm() {
    const { toast } = useToast();
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const form = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordFormSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
    });

    // Watch the input values
    const newPassword = form.watch("newPassword");
    const confirmPassword = form.watch("confirmPassword");

    async function onSubmit(data: PasswordFormValues) {
        try {
            // Call the API to change the password
            const response = await changePassword(data);
            if (response.success) {
                toast({
                    variant: "success",
                    title: "Password changed successfully",
                });
                form.reset();
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "An unexpected error occurred",
            });
        }
    }

    const handleKeyDown = (
        e: React.KeyboardEvent,
        field: "newPassword" | "confirmPassword"
    ) => {
        if (e.key === "Control") {
            if (field === "newPassword") {
                setShowNewPassword(true);
            } else {
                setShowConfirmPassword(true);
            }
        }
    };

    const handleKeyUp = (
        e: React.KeyboardEvent,
        field: "newPassword" | "confirmPassword"
    ) => {
        if (e.key === "Control") {
            if (field === "newPassword") {
                setShowNewPassword(false);
            } else {
                setShowConfirmPassword(false);
            }
        }
    };

    function onDiscard() {
        form.reset();
    }

    return (
        <Accordion type="single" collapsible className="space-y-6 w-full">
            <AccordionItem value="password">
                <AccordionTrigger className="flex items-center justify-between py-2">
                    <h3 className="text-lg font-medium">Password</h3>
                </AccordionTrigger>
                <AccordionContent className=" px-2 pt-2">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="mt-4 space-y-4"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>New Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type={
                                                        showNewPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    {...field}
                                                    onKeyDown={(e) =>
                                                        handleKeyDown(
                                                            e,
                                                            "newPassword"
                                                        )
                                                    }
                                                    onKeyUp={(e) =>
                                                        handleKeyUp(
                                                            e,
                                                            "newPassword"
                                                        )
                                                    }
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
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Confirm New Password
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type={
                                                        showConfirmPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    {...field}
                                                    onKeyDown={(e) =>
                                                        handleKeyDown(
                                                            e,
                                                            "confirmPassword"
                                                        )
                                                    }
                                                    onKeyUp={(e) =>
                                                        handleKeyUp(
                                                            e,
                                                            "confirmPassword"
                                                        )
                                                    }
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
                            </div>

                            <div className="w-full flex justify-end items-end">
                                {(newPassword || confirmPassword) && (
                                    <div
                                        className="flex items-center gap-4 transition-all duration-300 ease-in-out 
                 opacity-100 
                 animate-slide-in-down"
                                    >
                                        <Button type="submit">
                                            Change Password
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={onDiscard}
                                        >
                                            Discard
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </form>
                    </Form>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="two-factor">
                <AccordionTrigger className="flex items-center justify-between py-2">
                    <h3 className="text-lg font-medium">
                        Two-Factor Authentication
                    </h3>
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                    <div className="space-y-4">
                        <p className="text-sm text-zinc-400">
                            Add an extra layer of security to your account by
                            enabling two-factor authentication.
                        </p>
                        <Button className="bg-white text-black hover:bg-zinc-200 cursor-not-allowed">
                            Enable Two-Factor Authentication
                        </Button>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
