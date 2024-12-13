import { CircleNotch, DotsSixVertical, Medal } from "@phosphor-icons/react";
import React, { useState } from "react";
import FormHeading from "../edit-form-heading";
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
import { Button } from "@/components/ui/button";
import FormDialog from "../edit-form-dialog";

import {
    AwardFormValues,
    awardSchema,
    ResumeFromValues,
} from "@/lib/validations/resume";
import { useResumeContext } from "@/contexts/ResumeContext";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";

import FormDropdownMenu from "../edit-form-drop-menu";
import PopupTag from "../edit-popup-tag";
import { TextEditor } from "@/components/global/textEditor";
import { updateResumeData } from "../../../../../../../action/updateResumeData";

function AwardsForm() {
    const { resumeData, setResumeData } = useResumeContext();
    const { toast } = useToast();
    const params = useParams();
    const resumeId = params.id as string;

    const [isSaving, setIsSaving] = useState(false);
    const [open, setOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const form = useForm<AwardFormValues>({
        resolver: zodResolver(awardSchema),
        defaultValues: {
            awards: resumeData?.awards || [
                {
                    title: "",
                    award: "",
                    dateRange: "",
                    description: "",
                    url: "",
                    urlTag: "",
                },
            ],
        },
    });

    const handleEdit = (index: number) => {
        const AwardsToEdit = resumeData?.awards[index];
        if (AwardsToEdit) {
            form.reset({
                awards: [
                    {
                        title: AwardsToEdit.title,
                        award: AwardsToEdit.award,
                        description: AwardsToEdit.description,
                        dateRange: AwardsToEdit.dateRange,
                        url: AwardsToEdit.url,
                        urlTag: AwardsToEdit.urlTag,
                    },
                ],
            });
        }
        setEditingIndex(index);
        setOpen(true);
    };

    const handleAdd = () => {
        form.reset({
            awards: [
                {
                    title: "",
                    award: "",
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
        // Filter out the award at the specified index
        const updatedAward =
            resumeData?.awards?.filter((_, i) => i !== index) || [];

        try {
            const datatoSave = {
                ...resumeData,
                awards: updatedAward,
            } as unknown as ResumeFromValues;
            // Save to API and update context
            const updatedData = await updateResumeData(resumeId, datatoSave);

            // Update the context with the returned data
            setResumeData(updatedData);
            toast({
                title: "Success",
                description: "Award removed successfully",
            });
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        }
    };

    const onSubmit = async (data: AwardFormValues) => {
        const newawards = data.awards[0];

        if (!newawards) return;

        const updatedawards = Array.from(resumeData?.awards || []);

        if (editingIndex !== null) {
            // Update existing profile
            updatedawards[editingIndex] = newawards;
        } else {
            // Add new profile
            updatedawards.push(newawards);
        }

        // Save to API and update context
        try {
            // Prepare the full resume data object
            const dataToSave = {
                ...resumeData,
                awards: updatedawards,
            } as unknown as ResumeFromValues;

            // Use the new API function to update resume data
            const updatedData = await updateResumeData(resumeId, dataToSave);

            // Update the context with the returned data
            setResumeData(updatedData);

            toast({
                title: "Success",
                description: "Awards updated successfully",
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

        const items = Array.from(resumeData?.awards || []);

        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setIsSaving(true);

        try {
            const datatoSave = {
                ...resumeData,
                awards: items,
            } as unknown as ResumeFromValues;

            // Save to API and update context
            const updatedData = await updateResumeData(resumeId, datatoSave);

            // Update the context with the returned data
            setResumeData(updatedData);
            toast({
                title: "Success",
                description: "Award removed successfully",
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
        <div className="max-w-2xlshadow-md ">
            <FormHeading icon={<Medal size={40} />} label="Awards" />

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="awards">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="space-y-1"
                        >
                            {resumeData?.awards?.map((item, index) => (
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
                                                                {item.title}
                                                            </p>
                                                            <p className="text-xs text-white/50">
                                                                {item.award ||
                                                                    "Award"}
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
                        name="awards.0.title"
                        render={({ field }) => (
                            <FormItem className="md:w-1/2">
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="awards.0.award"
                        render={({ field }) => (
                            <FormItem className="md:w-1/2">
                                <FormLabel>Award</FormLabel>
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
                        name={`awards.0.dateRange`}
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
                            name="awards.0.url"
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
                        <PopupTag form={form} name={"awards.0.urlTag"} />
                    </div>
                </div>

                <FormField
                    control={form.control}
                    name="awards.0.description"
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
}

export default AwardsForm;
