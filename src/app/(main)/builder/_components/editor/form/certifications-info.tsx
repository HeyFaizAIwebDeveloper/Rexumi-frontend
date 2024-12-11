import React, { useState } from "react";
import FormHeading from "../edit-form-heading";
import {
    Certificate,
    CircleNotch,
    DotsSixVertical,
} from "@phosphor-icons/react";
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


import {
    certificationSchema,
    CertificationsFormValues,
    ResumeFromValues,
} from "@/lib/validations/resume";

import { useResumeContext } from "@/contexts/ResumeContext";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";
import { TextEditor } from "@/components/global/textEditor";
import PopupTag from "../edit-popup-tag";
import { updateResumeData } from "../../../../../../../action/updateResumeData";


const CertificationsForm = () => {
    const { resumeData, setResumeData } = useResumeContext();
    const { toast } = useToast();
    const params = useParams();
    const resumeId = params.id as string;

    const [isSaving, setIsSaving] = useState(false);
    const [open, setOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const form = useForm<CertificationsFormValues>({
        resolver: zodResolver(certificationSchema),
        defaultValues: {
            certifications: resumeData?.certifications || [
                {
                    name: "",
                    issuer: "",
                    dateRange: "",
                    description: "",
                    url: "",
                    urlTag: "",
                },
            ],
        },
    });


    const handleEdit = (index: number) => {
        const certificationsToEdit = resumeData?.certifications[index];
        if (certificationsToEdit) {
            form.reset({
                certifications: [
                    {
                        name: certificationsToEdit.name,
                        issuer: certificationsToEdit.issuer,
                        description: certificationsToEdit.description,
                        dateRange: certificationsToEdit.dateRange,
                        url: certificationsToEdit.url,
                        urlTag: certificationsToEdit.urlTag,
                    },
                ],
            });
        }
        setEditingIndex(index);
        setOpen(true);
    };

    const handleAdd = () => {
        form.reset({
            certifications: [
                {
                    name: "",
                    issuer: "",
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

    const handleRemove = async (index: number) => {
        const updatedCertifications = resumeData?.certifications?.filter(
            (_, i) => i !== index
        );

        setIsSaving(true);
        // Save to API and update context
        try {
            // Prepare the full resume data object
            const dataToSave = {
                ...resumeData,
                certifications: updatedCertifications,
            } as ResumeFromValues;

            // Use the new API function to update resume data
            const updatedData = await updateResumeData(resumeId, dataToSave);

            // Update the context with the returned data
            setResumeData(updatedData);

            toast({
                title: "Success",
                description: "Certifications updated successfully",
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

    const onSubmit = async (data: CertificationsFormValues) => {
        const newcertifications = data.certifications[0];

        if (!newcertifications) return;

        const updatedcertifications = Array.from(
            resumeData?.certifications || []
        );

        if (editingIndex !== null) {
            // Update existing profile
            updatedcertifications[editingIndex] = newcertifications;
        } else {
            // Add new profile
            updatedcertifications.push(newcertifications);
        }

        try {
            // Prepare the full resume data object
            const dataToSave = {
                ...resumeData,
                certifications: updatedcertifications,
            } as ResumeFromValues;

            // Use the new API function to update resume data
            const updatedData = await updateResumeData(resumeId, dataToSave);

            // Update the context with the returned data
            setResumeData(updatedData);

            toast({
                title: "Success",
                description: "Certifications updated successfully",
            });
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        }
        setOpen(false);
        setEditingIndex(null);
        form.reset();
    };

    const onDragEnd = async (result: any) => {
        if (!result.destination) return;

        const items = Array.from(resumeData?.certifications || []);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setIsSaving(true);
         // Save to API and update context
         try {
            // Prepare the full resume data object
            const dataToSave = {
                ...resumeData,
                certifications: items,
            } as ResumeFromValues;

            // Use the new API function to update resume data
            const updatedData = await updateResumeData(resumeId, dataToSave);

            // Update the context with the returned data
            setResumeData(updatedData);

            toast({
                title: "Success",
                description: "Certifications updated successfully",
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
            <FormHeading
                icon={<Certificate size={40} />}
                label="Certifications"
            />

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="certifications">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="space-y-1"
                        >
                            {resumeData?.certifications?.map((item, index) => (
                                <Draggable
                                    key={index.toString()}
                                    draggableId={index.toString()}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            className="flex items-center justify-between "
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
                                                            <p className="text-base  font-medium">
                                                                {item.name}
                                                            </p>
                                                            <p className="text-xs text-white/50">
                                                                {item.issuer ||
                                                                    "Issuer"}
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
                        name="certifications.0.name"
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
                        name="certifications.0.issuer"
                        render={({ field }) => (
                            <FormItem className="md:w-1/2">
                                <FormLabel>Issuer</FormLabel>
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
                    {/* Date Range Field */}
                    <FormField
                        control={form.control}
                        name={`certifications.0.dateRange`}
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

                    <div className="flex md:w-1/2  items-end gap-2">
                        <FormField
                            control={form.control}
                            name="certifications.0.url"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Website</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <PopupTag
                            form={form}
                            name={"certifications.0.urlTag"}
                        />
                    </div>
                </div>

                <FormField
                    control={form.control}
                    name="certifications.0.description"
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
                        </FormItem>
                    )}
                />
            </FormDialog>
        </div>
    );
};

export default CertificationsForm;
