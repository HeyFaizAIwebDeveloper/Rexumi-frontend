"use client";

import React, { useState } from "react";
import { GameController, DotsSixVertical, X, CircleNotch } from "@phosphor-icons/react";
import FormHeading from "../edit-form-heading";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormDropdownMenu from "../edit-form-drop-menu";
import { Button } from "@/components/ui/button";
import FormDialog from "../edit-form-dialog";
import { interestSchema, InterestsFormValues } from "@/lib/validations/resume";
import { Badge } from "@/components/ui/badge";
import { useResumeContext } from "@/contexts/ResumeContext";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";
import { updateResumeData } from "../../../../../../../action/updateResumeData";


const InterestsForm = () => {
    const { resumeData, setResumeData } = useResumeContext();
    const { toast } = useToast();
    const params = useParams();
    const resumeId = params.id as string;

    const [isSaving, setIsSaving] = useState(false);
    const [open, setOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [keywords, setKeywords] = useState<string[]>([]);

    const form = useForm<InterestsFormValues>({
        resolver: zodResolver(interestSchema),
        defaultValues: {
            interests: resumeData?.interests || [
                {
                    name: "",
                    keywords: []
                },
            ],
        },
    });

    
    const saveResumeData = async (updatedInterests: any[]) => {
        try {
            // Prepare the full resume data object
            const dataToSave = {
                ...resumeData,
                interests: updatedInterests,
            };

            // Use the new API function to update resume data
            const updatedData = await updateResumeData(resumeId, dataToSave);

            // Update the context with the returned data
            setResumeData(updatedData);

            toast({
                title: "Success",
                description: "Interests updated successfully",
            });
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleEdit = (index: number) => {
        const interestsToEdit = resumeData?.interests[index];
        if(interestsToEdit){
            form.reset({
                interests: [
                    {
                        name: interestsToEdit.name,
                        keywords: [],
                    },
                ],
            });
        }
        setEditingIndex(index);
        setOpen(true);
    };

    const handleAdd = () => {
        form.reset({
            interests: [
                {
                    name: "",
                    keywords: [],
                },
            ],
        });
        setEditingIndex(null);
        setOpen(true);
    };

    const handleRemove = (index: number) => {
        const updatedInterests = resumeData?.interests?.filter(
            (_, i) => i !== index
        );

        // Save to API and update context
        saveResumeData(updatedInterests || []);
    };

    const onSubmit = (data: InterestsFormValues) => {
        const newinterests = data.interests[0];

        if (!newinterests) return;

        const updatedinterests = Array.from(resumeData?.interests || []);

        if (editingIndex !== null) {
            // Update existing profile
            updatedinterests[editingIndex] = newinterests;
        } else {
            // Add new profile
            updatedinterests.push(newinterests);
        }

        // Save to API and update context
        saveResumeData(updatedinterests);


        setOpen(false);
        setEditingIndex(null);
        form.reset();
    };

    const onDragEnd = (result: any) => {
        if (!result.destination) return;

        const items = Array.from(resumeData?.interests || []);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

          setIsSaving(true);
        saveResumeData(items);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            const input = event.currentTarget;
            const value = input.value.trim();

            if (!value) return;

            const currentKeywords =
                form.getValues("interests.0.keywords") || [];
            if (!currentKeywords.includes(value)) {
                const updatedKeywords = [...currentKeywords, value];
                form.setValue("interests.0.keywords", updatedKeywords);
                input.value = "";
            }
        }
    };

    const removeKeyword = (keywordToRemove: string) => {
        const currentKeywords = form.getValues("interests.0.keywords") || [];
        const updatedKeywords = currentKeywords.filter(
            (keyword) => keyword !== keywordToRemove
        );
        form.setValue("interests.0.keywords", updatedKeywords);
    };

    const currentKeywords = form.watch("interests.0.keywords") || [];

    return (
        <div className="max-w-2xl shadow-md ">
            <FormHeading
                icon={<GameController size={40} />}
                label="Interests"
            />

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="interests">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="space-y-1"
                        >
                            {resumeData?.interests?.map((item, index) => (
                                <Draggable
                                    key={index.toString()}
                                    draggableId={index.toString()}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            className="flex items-center justify-between bg-secondary/10"
                                        >
                                            {isSaving ? (
                                                <div className="w-full flex justify-center items-center h-full min-h-14 bg-secondary/30">
                                                    <CircleNotch
                                                        size={25}
                                                        className=" animate-spin"
                                                    />
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="flex w-full">
                                                        <div
                                                            {...provided.dragHandleProps}
                                                            className="hover:bg-secondary/30 border-r border-secondary/30 px-2 py-4"
                                                        >
                                                            <DotsSixVertical
                                                                size={20}
                                                                className="h-full w-full text-muted-foreground"
                                                            />
                                                        </div>
                                                        <div className="flex-1 ml-2 px-1 py-2">
                                                            <p className="text-base text-white font-medium">
                                                                {item.name}
                                                            </p>
                                                            <p className="text-xs text-white/50">
                                                                {item.keywords
                                                                    .length == 0
                                                                    ? "keywords"
                                                                    : item.keywords}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center px-2 py-4 ml-2">
                                                        <FormDropdownMenu
                                                            onEdit={() =>
                                                                handleEdit(
                                                                    index
                                                                )
                                                            }
                                                            onDelete={() =>
                                                                handleRemove(
                                                                    index
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            {/* add interest item button */}
            <Button
                onClick={handleAdd}
                variant="dashed"
                size="lg"
                className=" mt-3 rounded-[2px]"
            >
                Add a New Item
            </Button>

            <FormDialog
                open={open}
                setOpen={setOpen}
                form={form}
                index={editingIndex}
                onSubmit={onSubmit}
            >
                <FormField
                    control={form.control}
                    name="interests.0.name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="interests.0.keywords"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Keywords</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Add keywords..."
                                    onKeyDown={handleKeyDown}
                                />
                            </FormControl>
                            <FormDescription>
                                You can add multiple keywords by separating them
                                with a comma or pressing enter.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-wrap gap-2">
                    {currentKeywords
                        ?.filter(
                            (keyword): keyword is string =>
                                keyword !== undefined
                        ) // Filter out undefined
                        .map((keyword) => (
                            <Badge
                                key={keyword}
                                variant="outline"
                                className="gap-1 px-4 rounded-full"
                            >
                                {keyword}
                                <Button
                                    variant={"ghost"}
                                    size={"sm"}
                                    type="button"
                                    className=" rounded-full ml-1 p-0  hover:bg-transparent"
                                    onClick={() => removeKeyword(keyword)}
                                >
                                    <X size={15} />
                                </Button>
                            </Badge>
                        ))}
                </div>
            </FormDialog>
        </div>
    );
};

export default InterestsForm;
