import React, { useState } from "react";
import FormHeading from "../edit-form-heading";
import { CircleNotch, DotsSixVertical, HandHeart } from "@phosphor-icons/react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    ResumeFromValues,
    VolunteeringFormValues,
    volunteeringSchema,
} from "@/lib/validations/resume";
import { useForm } from "react-hook-form";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import FormDropdownMenu from "../edit-form-drop-menu";
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


function VolunteeringForm() {
    const { resumeData, setResumeData } = useResumeContext();
    const { toast } = useToast();
    const params = useParams();
    const resumeId = params.id as string;

    const [isSaving, setIsSaving] = useState(false);
    const [open, setOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [keywords, setKeywords] = useState<string[]>([]);

    const form = useForm<VolunteeringFormValues>({
        resolver: zodResolver(volunteeringSchema),
        defaultValues: {
            volunteering: resumeData?.volunteering || [
                {
                    organisation: "",
                    position: "",
                    dateRange: "",
                    url: "",
                    urlTag: "",
                    location: "",
                    description: "",
                },
            ],
        },
    });

 

    const handleEdit = (index: number) => {
        const volunteeringsToEdit = resumeData?.volunteering[index];
        if (volunteeringsToEdit) {
            form.reset({
                volunteering: [
                    {
                        organisation: volunteeringsToEdit.organisation,
                        position: volunteeringsToEdit.position,
                        dateRange: volunteeringsToEdit.dateRange,
                        description: volunteeringsToEdit.description,
                        location: volunteeringsToEdit.location,
                        url: volunteeringsToEdit.url,
                        urlTag: volunteeringsToEdit.urlTag,
                    },
                ],
            });
        }
        setEditingIndex(index);
        setOpen(true);
    };

    const handleAdd = () => {
        form.reset({
            volunteering: [
                {
                    organisation: "",
                    position: "",
                    dateRange: "",
                    url: "",
                    urlTag: "",
                    location: "",
                    description: "",
                },
            ],
        });
        setEditingIndex(null);
        setOpen(true);
    };

    const handleRemove = async (index: number) => {
        const updatedInterests = resumeData?.volunteering?.filter(
            (_, i) => i !== index
        );

        // Save to API and update context
        try {
            // Prepare the full resume data object
            const dataToSave = {
                ...resumeData,
                volunteering: updatedInterests,
            } as ResumeFromValues;

            // Use the new API function to update resume data
            const updatedData = await updateResumeData(resumeId, dataToSave);

            // Update the context with the returned data
            setResumeData(updatedData);

            toast({
                title: "Success",
                description: "Volunteering removed successfully",
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

    const onSubmit = async (data: VolunteeringFormValues) => {
        const newvolunteerings = data.volunteering[0];

        if (!newvolunteerings) return;

        const updatedvolunteerings = Array.from(resumeData?.volunteering || []);

        if (editingIndex !== null) {
            // Update existing profile
            updatedvolunteerings[editingIndex] = newvolunteerings;
        } else {
            // Add new profile
            updatedvolunteerings.push(newvolunteerings);
        }

        try {
            // Prepare the full resume data object
            const dataToSave = {
                ...resumeData,
                volunteering: updatedvolunteerings,
            } as ResumeFromValues;

            // Use the new API function to update resume data
            const updatedData = await updateResumeData(resumeId, dataToSave);

            // Update the context with the returned data
            setResumeData(updatedData);

            toast({
                title: "Success",
                description: "Volunteering updated successfully",
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
        setEditingIndex(null);
        form.reset();
    };

    const onDragEnd = async (result: any) => {
        if (!result.destination) return;

        const items = Array.from(resumeData?.volunteering || []);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setIsSaving(true);
        try {
            // Prepare the full resume data object
            const dataToSave = {
                ...resumeData,
                volunteering: items,
            } as ResumeFromValues;

            // Use the new API function to update resume data
            const updatedData = await updateResumeData(resumeId, dataToSave);

            // Update the context with the returned data
            setResumeData(updatedData);

            toast({
                title: "Success",
                description: "Volunteering updated successfully",
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
            <FormHeading icon={<HandHeart size={40} />} label="Volunteering" />

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="volunteering">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="space-y-1"
                        >
                            {resumeData?.volunteering?.map((item, index) => (
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
                                                                {
                                                                    item.organisation
                                                                }
                                                            </p>
                                                            <p className="text-xs text-white/50">
                                                                {item.position ||
                                                                    "Position"}
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
                        name="volunteering.0.organisation"
                        render={({ field }) => (
                            <FormItem className="md:w-1/2">
                                <FormLabel>Orgainsation</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="volunteering.0.position"
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
                    <FormField
                        control={form.control}
                        name="volunteering.0.dateRange"
                        render={({ field }) => (
                            <FormItem className="md:w-1/2">
                                <FormLabel>Date or Date Range</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="December 2024 - Present"
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
                        name="volunteering.0.location"
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

                <div className="flex  items-end gap-2">
                    <FormField
                        control={form.control}
                        name={`volunteering.0.url`}
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
                    <PopupTag name="volunteering.0.urlTag" form={form} />
                </div>

                <FormField
                    control={form.control}
                    name={`volunteering.0.description`}
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
}

export default VolunteeringForm;
