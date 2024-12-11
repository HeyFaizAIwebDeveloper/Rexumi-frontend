"use client";

import React, { useState } from "react";
import FormHeading from "../edit-form-heading";
import {
    CircleNotch,
    DotsSixVertical,
    GraduationCap,
} from "@phosphor-icons/react";
import {
    EducationFormValues,
    educationSchema,
    ResumeFromValues,
} from "@/lib/validations/resume";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormDropdownMenu from "../edit-form-drop-menu";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import FormDialog from "../edit-form-dialog";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useResumeContext } from "@/contexts/ResumeContext";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";
import { TextEditor } from "@/components/global/textEditor";
import { updateResumeData } from "../../../../../../../action/updateResumeData";
import PopupTag from "../edit-popup-tag";

const EducationForm = () => {
    const { resumeData, setResumeData } = useResumeContext();
    const [open, setOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();
    const params = useParams();
    const resumeId = params.id as string;

    const form = useForm<EducationFormValues>({
        resolver: zodResolver(educationSchema),
        defaultValues: {
            education: resumeData?.education || [
                {
                    institution: "",
                    location: "",
                    areaofstudy: "",
                    dateRange: "",
                    description: "",
                    score: "",
                    url: "",
                    urlTag: "",
                },
            ],
        },
    });

   
    const handleEdit = (index: number) => {
        const educationToEdit = resumeData?.education?.[index];
        if (educationToEdit) {
            form.reset({
                education: [
                    {
                        institution: educationToEdit.institution,
                        location: educationToEdit.location,
                        areaofstudy: educationToEdit.areaofstudy,
                        dateRange: educationToEdit.dateRange,
                        description: educationToEdit.description,
                        score: educationToEdit.score,
                        url: educationToEdit.url,
                        urlTag: educationToEdit.urlTag,
                    },
                ],
            });
        }
        setEditingIndex(index);
        setOpen(true);
    };

    const handleAdd = () => {
        form.reset({
            education: [
                {
                    institution: "",
                    location: "",
                    areaofstudy: "",
                    dateRange: "",
                    description: "",
                    score: "",
                    url: "",
                    urlTag: "",
                },
            ],
        });
        setEditingIndex(null);
        setOpen(true);
    };

    const handleRemove = async (index: number) => {
        const updatedEducation = resumeData?.education?.filter(
            (_, i) => i !== index
        );

        // Save to API and update context
        try {
            // Prepare the full resume data object
            const dataToSave = {
                ...resumeData,
                education: updatedEducation,
            } as ResumeFromValues;

            // Use the new API function to update resume data
            const updatedData = await updateResumeData(resumeId, dataToSave);

            // Update the context with the returned data
            setResumeData(updatedData);

            toast({
                title: "Success",
                description: "Education updated successfully",
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

    const onSubmit = async (data: EducationFormValues) => {
        const newEducation = data?.education?.[0];

        if (!newEducation) return;

        let updatedEducation = Array.from(resumeData?.education || []);

        if (editingIndex !== null) {
            // Update existing experience
            updatedEducation[editingIndex] = newEducation;
        } else {
            // Add new experience
            updatedEducation.push(newEducation);
        }

        // Save to API and update context
        try {
            // Prepare the full resume data object
            const dataToSave = {
                ...resumeData,
                education: updatedEducation,
            } as ResumeFromValues;

            // Use the new API function to update resume data
            const updatedData = await updateResumeData(resumeId, dataToSave);

            // Update the context with the returned data
            setResumeData(updatedData);

            toast({
                title: "Success",
                description: "Education updated successfully",
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

    const onDragEnd = async (result: any) => {
        if (!result.destination) return;

        const items = Array.from(resumeData?.education || []);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setIsSaving(true);
        try {
            // Prepare the full resume data object
            const dataToSave = {
                ...resumeData,
                education: items,
            } as ResumeFromValues;

            // Use the new API function to update resume data
            const updatedData = await updateResumeData(resumeId, dataToSave);

            // Update the context with the returned data
            setResumeData(updatedData);

            toast({
                title: "Success",
                description: "Education updated successfully",
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
        <div className="max-w-2xl  shadow-md ">
            <FormHeading icon={<GraduationCap size={40} />} label="Education" />

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="education">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="space-y-1"
                        >
                            {resumeData?.education?.map((item, index) => (
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
                                                <div className="  flex w-full bg-transparent">
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
                                                                {
                                                                    item.institution
                                                                }
                                                            </p>
                                                            <p className="text-xs text-white/50">
                                                                {item.areaofstudy ||
                                                                    "Area of Study (Location)"}
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
                        name="education.0.institution"
                        render={({ field }) => (
                            <FormItem className="md:w-1/2">
                                <FormLabel>Institution</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="education.0.location"
                        render={({ field }) => (
                            <FormItem className="md:w-1/2">
                                <FormLabel>Location</FormLabel>
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

                <div className="flex md:flex-row flex-col space-x-5">
                    <FormField
                        control={form.control}
                        name="education.0.areaofstudy"
                        render={({ field }) => (
                            <FormItem className="md:w-1/2">
                                <FormLabel>Area of Study</FormLabel>
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

                    <FormField
                        control={form.control}
                        name="education.0.score"
                        render={({ field }) => (
                            <FormItem className="md:w-1/2">
                                <FormLabel>Score</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="9.2 GPA"
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
                    name={`education.0.dateRange`}
                    render={({ field }) => (
                        <FormItem>
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

                {/* Website Field */}
                <div className="flex w-full  items-end gap-2">
                    <FormField
                        control={form.control}
                        name={`education.0.url`}
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
                    <PopupTag name="education.0.urlTag" form={form} />
                </div>

                {/* Description Field */}
                <FormField
                    control={form.control}
                    name={`education.0.description`}
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

export default EducationForm;
