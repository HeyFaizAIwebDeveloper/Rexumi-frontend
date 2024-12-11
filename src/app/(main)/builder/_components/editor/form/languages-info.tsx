"use client";

import React, { useState } from "react";
import FormHeading from "../edit-form-heading";
import { CircleNotch, DotsSixVertical, Translate } from "@phosphor-icons/react";
import { LanguageFormValues, languageSchema, ResumeFromValues } from "@/lib/validations/resume";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormDropdownMenu from "../edit-form-drop-menu";
import { Button } from "@/components/ui/button";
import FormDialog from "../edit-form-dialog";
import { Slider } from "@/components/ui/slider";
import { useResumeContext } from "@/contexts/ResumeContext";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";
import { updateResumeData } from "../../../../../../../action/updateResumeData";


const LanguagesForm = () => {
    const { resumeData, setResumeData } = useResumeContext();
    const { toast } = useToast();
    const params = useParams();
    const resumeId = params.id as string;

    const [isSaving, setIsSaving] = useState(false);
    const [open, setOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const form = useForm<LanguageFormValues>({
        resolver: zodResolver(languageSchema),
        defaultValues: {
            languages: resumeData?.languages || [
                {
                    name: "",
                    description: "",
                    level: 0,
                },
            ],
        },
    });

    const saveResumeData = async (updatedLanguages: any[]) => {
        try {
            // Prepare the full resume data object
            const dataToSave = {
                ...resumeData,
                languages: updatedLanguages,
            } as ResumeFromValues;

            // Use the new API function to update resume data
            const updatedData = await updateResumeData(resumeId, dataToSave);

            // Update the context with the returned data
            setResumeData(updatedData);

            toast({
                title: "Success",
                description: "Languages updated successfully",
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
        const languagesToEdit = resumeData?.languages[index];
        if (languagesToEdit) {
            form.reset({
                languages: [
                    {
                        name: languagesToEdit.name,
                        level: languagesToEdit.level,
                        description: languagesToEdit.description,
                    },
                ],
            });
        }
        setEditingIndex(index);
        setOpen(true);
    };

    const handleAdd = () => {
        form.reset({
            languages: [
                {
                    name: "",
                    description: "",
                    level: 0,
                },
            ],
        });
        setEditingIndex(null);
        setOpen(true);
    };

    const handleRemove = (index: number) => {
        const updatedLanguages = resumeData?.languages?.filter(
            (_, i) => i !== index
        );

        // Save to API and update context
        saveResumeData(updatedLanguages || []);
    };

    const onSubmit = (data: LanguageFormValues) => {
        const newLanguages = data.languages[0];

        if (!newLanguages) return;

        const updatedLanguages = Array.from(resumeData?.languages || []);

        if (editingIndex !== null) {
            // Update existing profile
            updatedLanguages[editingIndex] = newLanguages;
        } else {
            // Add new profile
            updatedLanguages.push(newLanguages);
        }

        // Save to API and update context
        saveResumeData(updatedLanguages);

        setOpen(false);
        setEditingIndex(null);
        form.reset();
    };

    const onDragEnd = (result: any) => {
        if (!result.destination) return;

        const items = Array.from(resumeData?.languages || []);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setIsSaving(true);
        saveResumeData(items);
    };

    return (
        <div className="max-w-2xl shadow-md ">
            <FormHeading icon={<Translate size={40} />} label="Languages" />

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="languages">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="space-y-1"
                        >
                            {resumeData?.languages?.map((item, index) => (
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
                                                                {item.description ||
                                                                    "Description"}
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

            {/* add education item button */}
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
                <div className="flex md:flex-row flex-col space-x-5">
                    <FormField
                        control={form.control}
                        name="languages.0.name"
                        render={({ field }) => (
                            <FormItem className="md:w-1/2">
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
                        name="languages.0.description"
                        render={({ field }) => (
                            <FormItem className="md:w-1/2">
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={field.value || ""}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="languages.0.level"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Level</FormLabel>
                            <FormControl>
                                <div className="flex items-center gap-4">
                                    <Slider
                                        min={0}
                                        max={5}
                                        step={1}
                                        value={[field.value]}
                                        onValueChange={([value]) =>
                                            field.onChange(value)
                                        }
                                    />
                                    <span className=" select-none text-sm">
                                        {field.value == 0
                                            ? "hidden"
                                            : field.value}
                                    </span>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </FormDialog>
        </div>
    );
};

export default LanguagesForm;
