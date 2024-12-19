"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
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
    deleteAccountSchema,
    type DeleteAccountFormValues,
} from "@/lib/validations/setting";
import { useToast } from "@/hooks/use-toast";
import { deleteAccount } from "../../../../../../action/auth/delete-account";
import { useRouter } from "next/navigation";

export function DangerZone() {
    const { toast } = useToast();
    const router = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [confirmText, setConfirmText] = useState<"delete" | undefined>(
        undefined
    );
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm<DeleteAccountFormValues>({
        resolver: zodResolver(deleteAccountSchema),
        defaultValues: {
            confirmText: "delete",
            password: "",
        },
    });
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value === "delete") {
            setConfirmText("delete");
            form.setValue("confirmText", "delete");
        } else {
            setConfirmText(undefined);
            form.setValue("confirmText", undefined as any);
        }
    };
    const onSubmit = async (data: DeleteAccountFormValues) => {
        try {
            const response = await deleteAccount(data);
            if (response.success) {
                toast({
                    variant: "success",
                    title: "Account deleted successfully",
                    description: "Your account has been deleted.",
                });

                setIsDialogOpen(false);
                form.reset();
                setConfirmText(undefined);
                router.refresh();
                router.push("/");
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "An unexpected error occurred",
            });
        }
    };

    const handleDeleteClick = () => {
        if (confirmText === "delete") {
            setIsDialogOpen(true);
        }
    };

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

    return (
        <div className="space-y-6 mt-4">
            <div className="space-y-2">
                <h3 className="text-lg font-medium">Delete Account</h3>
                <div className="flex gap-4">
                    <Input
                        value={confirmText}
                        onChange={handleInputChange}
                        placeholder='Type "delete" to confirm'
                    />
                    <Button
                        variant="destructive"
                        onClick={handleDeleteClick}
                        disabled={confirmText !== "delete"}
                    >
                        Delete Account
                    </Button>
                </div>
                <p className="text-sm text-zinc-400">
                    Type <span className="font-mono">delete</span> to confirm
                    deleting your account.
                </p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-md  bg-black">
                    <DialogHeader>
                        <DialogTitle>Delete Account</DialogTitle>
                        <DialogDescription className="text-zinc-400">
                            Please enter your password to confirm account
                            deletion. This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <FormField
                                control={form.control}
                                name="password"
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
                            <div className="flex justify-end gap-4">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => setIsDialogOpen(false)}
                                    className="text-zinc-400 hover:text-white hover:bg-transparent"
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" variant="destructive">
                                    Are you sure?
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
