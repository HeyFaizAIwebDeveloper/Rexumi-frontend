"use client";

import React, { useEffect, useState } from "react";
import {
    Briefcase,
    CircleNotch,
    DotsSixVertical,
    Spinner,
} from "@phosphor-icons/react";
import FormHeading from "../edit-form-heading";
import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    ExperienceFormValues,
    ResumeFromValues,
    experiencechema,
} from "@/lib/validations/resume";
import FormDropdownMenu from "../edit-form-drop-menu";
import FormDialog from "../edit-form-dialog";
import { useResumeContext } from "@/contexts/ResumeContext";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";
import { TextEditor } from "@/components/global/textEditor";
import { updateResumeData } from "../../../../../../../action/updateResumeData";
import PopupTag from "../edit-popup-tag";

const ExperienceForm = () => {
    const { resumeData, setResumeData } = useResumeContext();
    const { toast } = useToast();
    const params = useParams();
    const resumeId = params.id as string;

    const [isSaving, setIsSaving] = useState(false);
    const [open, setOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const form = useForm<ExperienceFormValues>({
        resolver: zodResolver(experiencechema),
        defaultValues: {
            experience: resumeData?.experience || [
                {
                    company: "",
                    position: "",
                    location: "",
                    dateRange: "",
                    url: "",
                    urlTag: "",
                    description: "",
                },
            ],
        },
    });


    const onDragEnd = async (result: any) => {
        if (!result.destination) return;

        const items = Array.from(resumeData?.experience || []);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setIsSaving(true);
        try {
            // Prepare the full resume data object
            const dataToSave = {
                ...resumeData,
                experience: items,
            } as ResumeFromValues;

            // Use the new API function to update resume data
            const updatedData = await updateResumeData(resumeId, dataToSave);

            // Update the context with the returned data
            setResumeData(updatedData);

            toast({
                title: "Success",
                description: "Experience updated successfully",
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

    const onSubmit = async (data: ExperienceFormValues) => {
        const newExperience = data?.experience?.[0];

        if (!newExperience) return;

        let updatedExperience = Array.from(resumeData?.experience || []);

        if (editingIndex !== null) {
            // Update existing experience
            updatedExperience[editingIndex] = newExperience;
        } else {
            // Add new experience
            updatedExperience.push(newExperience);
        }

        // Save to API and update context
        try {
            // Prepare the full resume data object
            const dataToSave = {
                ...resumeData,
                experience: updatedExperience,
            } as ResumeFromValues;

            // Use the new API function to update resume data
            const updatedData = await updateResumeData(resumeId, dataToSave);

            // Update the context with the returned data
            setResumeData(updatedData);

            toast({
                title: "Success",
                description: "Experience updated successfully",
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
        setOpen(false);
        form.reset();
        setEditingIndex(null);
    };

    const handleAdd = () => {
        form.reset({
            experience: [
                {
                    company: "",
                    position: "",
                    location: "",
                    dateRange: "",
                    url: "",
                    description: "",
                    urlTag: "",
                },
            ],
        });
        setEditingIndex(null);
        setOpen(true);
    };

    const handleEdit = (index: number) => {
        const experienceToEdit = resumeData?.experience?.[index];

        if (experienceToEdit) {
            form.reset({
                experience: [
                    {
                        company: experienceToEdit.company,
                        position: experienceToEdit.position,
                        location: experienceToEdit.location,
                        dateRange: experienceToEdit.dateRange,
                        url: experienceToEdit.url,
                        urlTag: experienceToEdit.urlTag,
                        description: experienceToEdit.description,
                    },
                ],
            });
            setEditingIndex(index);
            setOpen(true);
        }
    };

    const handleRemove = async (index: number) => {
        const updatedExperience = resumeData?.experience?.filter(
            (_, i) => i !== index
        );

        // Save to API and update context
        try {
            // Prepare the full resume data object
            const dataToSave = {
                ...resumeData,
                experience: updatedExperience,
            } as ResumeFromValues;

            // Use the new API function to update resume data
            const updatedData = await updateResumeData(resumeId, dataToSave);

            // Update the context with the returned data
            setResumeData(updatedData);

            toast({
                title: "Success",
                description: "Experience removed successfully",
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

    return (
        <div className="max-w-2xl shadow-md">
            <FormHeading icon={<Briefcase size={40} />} label="Experience" />

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="experience">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="space-y-1"
                        >
                            {resumeData?.experience?.map((item, index) => (
                                <Draggable
                                    key={index.toString()}
                                    draggableId={index.toString()}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            className="flex items-center bg-secondary/10"
                                        >
                                            {isSaving ? (
                                                <div className="w-full flex justify-center items-center h-full min-h-14 bg-secondary/30">
                                                    <CircleNotch
                                                        size={25}
                                                        className=" animate-spin"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="  flex w-full bg-transparent">
                                                    <div className="flex w-full  ">
                                                        <div
                                                            {...provided.dragHandleProps}
                                                            className=" hover:bg-secondary/30 border-r  border-secondary/30 px-2 py-4"
                                                        >
                                                            <DotsSixVertical
                                                                size={20}
                                                                className=" h-full w-full text-muted-foreground"
                                                            />
                                                        </div>
                                                        <div className="flex-1  ml-2 px-1 py-2">
                                                            <p className="text-base font-medium">
                                                                {item.company}
                                                            </p>
                                                            <p className="text-xs  ">
                                                                {item.position ||
                                                                    "position"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="  flex items-center px-2 py-4 ml-2">
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
                                                </div>
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

            {/* add expreince button */}
            <Button
                onClick={handleAdd}
                variant="dashed"
                size="lg"
                className=" mt-3 rounded-[2px]"
            >
                Add a New Item
            </Button>

            {/* Add Experience Dialog */}
            <FormDialog
                open={open}
                setOpen={setOpen}
                onSubmit={onSubmit}
                form={form}
                index={editingIndex}
            >
                <div className="flex md:flex-row flex-col space-x-5">
                    {/* Company Field */}
                    <FormField
                        control={form.control}
                        name="experience.0.company"
                        render={({ field }) => (
                            <FormItem className="md:w-1/2">
                                <FormLabel>Company</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Position Field */}
                    <FormField
                        control={form.control}
                        name="experience.0.position"
                        render={({ field }) => (
                            <FormItem className="md:w-1/2">
                                <FormLabel>Position</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={field.value || ""}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex md:flex-row flex-col space-x-5">
                    {/* Date Range Field */}
                    <FormField
                        control={form.control}
                        name={`experience.0.dateRange`}
                        render={({ field }) => (
                            <FormItem className="md:w-1/2">
                                <FormLabel>Date or Date Range</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="March 2023 - Present"
                                        {...field}
                                        value={field.value || ""}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Location Field */}
                    <FormField
                        control={form.control}
                        name={`experience.0.location`}
                        render={({ field }) => (
                            <FormItem className="md:w-1/2">
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={field.value || ""}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Website Field */}
                <div className="flex w-full  items-end gap-2">
                    <FormField
                        control={form.control}
                        name={`experience.0.url`}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Website</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={field.value || ""}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <PopupTag name="experience.0.urlTag" form={form} />
                </div>

                {/* Description Field */}
                <FormField
                    control={form.control}
                    name={`experience.0.description`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Summary</FormLabel>
                            <FormControl>
                                <TextEditor
                                    {...field}
                                    content={field.value || ""}
                                    onChange={(value) => {
                                        field.onChange(value);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </FormDialog>
        </div>
    );
};

export default ExperienceForm;
