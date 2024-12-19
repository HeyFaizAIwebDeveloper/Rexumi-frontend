"use client";

import React from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignOut } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { handleLogout } from "../../../../../../action/auth/logout";


export const LogoutAlert = () => {
    const router = useRouter();
    const { toast } = useToast();
    const onLogout = async () => {
        try {
            const response = await handleLogout();
            if (response.success) {
                toast({
                    variant: "success",
                    title: 'See you again',
                    description: response.message,
                });
                router.refresh();
                router.push("/login");
            } else {
                toast({
                    variant: "destructive",
                    title: 'something went wrong',
                    description: response.error,
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "An unexpected error occurred",
                description: `${error}`
            });
        }
    };
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant={"ghost"}
                    size={"lg"}
                    className={cn(
                        "w-full rounded-[2px] justify-start bg-secondary/30"
                    )}
                >
                    <SignOut size={25} />
                    Logout
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to logout?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        You will be logged out of your current session. Are you
                        sure you want to proceed?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onLogout}>
                        Logout
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
