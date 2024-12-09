"use client";
import React, { useState } from "react";
import FormHeading from "../edit-form-heading";
import { Books, CircleNotch, DotsSixVertical } from "@phosphor-icons/react";

import {
    PublicationFormValues,
    publicationSchema,
} from "@/lib/validations/resume";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import FormDialog from "../edit-form-dialog";
import FormDropdownMenu from "../edit-form-drop-menu";
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

const PublicationsForm = () => {
    const { resumeData, setResumeData } = useResumeContext();
    const { toast } = useToast();
    const params = useParams();
    const resumeId = params.id as string;

    const [isSaving, setIsSaving] = useState(false);
    const [open, setOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [keywords, setKeywords] = useState<string[]>([]);

    const form = useForm<PublicationFormValues>({
        resolver: zodResolver(publicationSchema),
        defaultValues: {
            publications: resumeData?.publications || [
                {
                    name: "",
                    dateRange: "",
                    description: "",
                    url: "",
                    urlTag: "",
                    publisher: "",
                },
            ],
        },
    });

    const saveResumeData = async (updatedPublications: any[]) => {
        try {
            // Prepare the full resume data object
            const dataToSave = {
                ...resumeData,
                publications: updatedPublications,
            };

            // Use the new API function to update resume data
            const updatedData = await updateResumeData(resumeId, dataToSave);

            // Update the context with the returned data
            setResumeData(updatedData);

            toast({
                title: "Success",
                description: "Publications updated successfully",
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
        const publicationsToEdit = resumeData?.publications[index];
        if (publicationsToEdit) {
            form.reset({
                publications: [
                    {
                        name: publicationsToEdit.name,
                        publisher: publicationsToEdit.publisher,
                        dateRange: publicationsToEdit.dateRange,
                        description: publicationsToEdit.description,
                        url: publicationsToEdit.url,
                        urlTag: publicationsToEdit.urlTag,
                    },
                ],
            });
        }

        setEditingIndex(index);
        setOpen(true);
    };

    const handleAdd = () => {
        form.reset({
            publications: [
                {
                    name: "",
                    publisher: "",
                    dateRange: "",
                    description: "",
                    url: "",
                    urlTag: "",
                },
            ],
        });
        setEditingIndex(null);
        setOpen(true);
    };

    const handleRemove = (index: number) => {
        const updatedInterests = resumeData?.publications?.filter(
            (_, i) => i !== index
        );

        // Save to API and update context
        saveResumeData(updatedInterests || []);
    };

    const onSubmit = (data: PublicationFormValues) => {
        const newpublications = data.publications[0];

        if (!newpublications) return;

        const updatedpublications = Array.from(resumeData?.publications || []);

        if (editingIndex !== null) {
            // Update existing profile
            updatedpublications[editingIndex] = newpublications;
        } else {
            // Add new profile
            updatedpublications.push(newpublications);
        }

        saveResumeData(updatedpublications);
        setOpen(false);
        setEditingIndex(null);
        form.reset();
    };

    const onDragEnd = (result: any) => {
        if (!result.destination) return;

        const items = Array.from(resumeData?.publications || []);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setIsSaving(true);
        saveResumeData(items);
    };

    return (
        <div className="max-w-2xl shadow-md ">
            <FormHeading icon={<Books size={40} />} label="Publications" />

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="publications">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="space-y-1"
                        >
                            {resumeData?.publications?.map((item, index) => (
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
                                                                {item.publisher ||
                                                                    "Publisher"}
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

            {/* add publication item button */}
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
                        name="publications.0.name"
                        render={({ field }) => (
                            <FormItem className="md:w-1/2">
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        className="rounded-[2px]"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="publications.0.publisher"
                        render={({ field }) => (
                            <FormItem className="md:w-1/2">
                                <FormLabel>Publisher</FormLabel>
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
                    <FormField
                        control={form.control}
                        name="publications.0.dateRange"
                        render={({ field }) => (
                            <FormItem className="md:w-1/2">
                                <FormLabel>Date or Date Range</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="2023 November - Present"
                                        {...field}
                                        value={field.value || ""}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex md:w-1/2  items-end gap-2">
                        <FormField
                            control={form.control}
                            name={`publications.0.url`}
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
                        <PopupTag name="publications.0.urlTag" form={form} />
                    </div>
                </div>
                <FormField
                    control={form.control}
                    name={`publications.0.description`}
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

export default PublicationsForm;
