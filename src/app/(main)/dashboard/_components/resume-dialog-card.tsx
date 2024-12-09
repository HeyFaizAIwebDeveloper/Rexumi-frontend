"use client";

import React, { ReactNode } from "react"; // Import ReactNode for typing children
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    FormField,
    FormDescription,
    Form,
} from "@/components/ui/form";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { MagicWand, Plus } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useResumeContext } from "@/contexts/ResumeContext";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

// Define a Zod schema for form validation
const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
});

// Define the type for the props
interface ResumeCreateDialogProps {
    children: ReactNode; // children can be any valid React node
}

export function ResumeCreateDialog({ children }: ResumeCreateDialogProps) {
    const { createNewResume } = useResumeContext();
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { title: "" },
    });

    const title = form.watch("title");

    // Generate slug from title
    const slug = title.toLowerCase().replace(/\s+/g, "-");

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            const newResume = await createNewResume(data.title);

            toast({
                variant: "success",
                title: "Resume Created",
                description: `Your resume "${data.title}" was created successfully!`,
            });
            router.push(`/builder/${newResume._id}`);
        } catch (error) {
            toast({
                title: "Error Creating Resume",
                description: "An error occurred while creating your resume.",
                variant: "destructive",
            });
        } finally {
            form.reset();
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div>{children}</div>
            </DialogTrigger>
            <DialogContent className="max-w-[600px] border-secondary bg-black">
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex items-center space-x-4">
                            <div className="flex size-5 items-center justify-center">
                                <Plus size={80} weight="thin" />
                            </div>
                            <h3 className="w-[220px] text-base truncate font-medium lg:w-[320px]">
                                Create a new resume
                            </h3>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-sm font-thin">
                        Start building your resume by giving it a name.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <div className="flex gap-1">
                                        <FormControl>
                                            <Input
                                                className="rounded-[2px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant={"ghost"}
                                                        className="p-2 border rounded-[2px]"
                                                    >
                                                        <MagicWand size={32} />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent className="rounded-[2px]">
                                                    <p>
                                                        Generate a random title
                                                        for your resume
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <FormDescription className="text-xs font-thin">
                                        Tip: You can name the resume referring
                                        to the position you are applying for.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormItem>
                            <FormLabel>Slug</FormLabel>
                            <FormControl>
                                <Input
                                    className="read-only:bg-transparent rounded-[2px]"
                                    value={slug}
                                    readOnly
                                />
                            </FormControl>
                        </FormItem>

                        <div className="flex justify-end gap-x-2">
                            <DialogClose asChild>
                                <Button type="submit" className="rounded-[2px]">
                                    Create
                                </Button>
                            </DialogClose>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
