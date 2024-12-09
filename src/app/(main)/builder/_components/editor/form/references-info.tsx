import { CircleNotch, DotsSixVertical, Users } from "@phosphor-icons/react";
import React, { useState } from "react";
import FormHeading from "../edit-form-heading";
import { ReferenceFormValues, referenceSchema } from "@/lib/validations/resume";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

const ReferencesForm = () => {
    const { resumeData, setResumeData } = useResumeContext();
    const { toast } = useToast();
    const params = useParams();
    const resumeId = params.id as string;

    const [isSaving, setIsSaving] = useState(false);
    const [open, setOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [keywords, setKeywords] = useState<string[]>([]);

    const form = useForm<ReferenceFormValues>({
        resolver: zodResolver(referenceSchema),
        defaultValues: {
            references: resumeData?.references || [
                {
                    name: "",
                    url: "",
                    urlTag: "",
                    summary: "",
                    description: "",
                },
            ],
        },
    });

    const saveResumeData = async (updatedReferences: any[]) => {
        try {
            // Prepare the full resume data object
            const dataToSave = {
                ...resumeData,
                references: updatedReferences,
            };

            // Use the new API function to update resume data
            const updatedData = await updateResumeData(resumeId, dataToSave);

            // Update the context with the returned data
            setResumeData(updatedData);

            toast({
                title: "Success",
                description: "References updated successfully",
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
        const referencessToEdit = resumeData?.references[index];
        if (referencessToEdit) {
            form.reset({
                references: [
                    {
                        name: referencessToEdit.name,
                        summary: referencessToEdit.summary,
                        description: referencessToEdit.description,
                        url: referencessToEdit.url,
                        urlTag: referencessToEdit.urlTag,
                    },
                ],
            });
        }
        setEditingIndex(index);
        setOpen(true);
    };

    const handleAdd = () => {
        form.reset({
            references: [
                {
                    name: "",
                    url: "",
                    urlTag: "",
                    summary: "",
                    description: "",
                },
            ],
        });
        setEditingIndex(null);
        setOpen(true);
    };

    const handleRemove = (index: number) => {
        const updatedInterests = resumeData?.references?.filter(
            (_, i) => i !== index
        );

        // Save to API and update context
        saveResumeData(updatedInterests || []);
    };

    const onSubmit = (data: ReferenceFormValues) => {
        const newreferencess = data.references[0];

        if (!newreferencess) return;

        const updatedreferencess = Array.from(resumeData?.references || []);

        if (editingIndex !== null) {
            // Update existing profile
            updatedreferencess[editingIndex] = newreferencess;
        } else {
            // Add new profile
            updatedreferencess.push(newreferencess);
        }

        saveResumeData(updatedreferencess);
        setOpen(false);
        setEditingIndex(null);
        form.reset();
    };

    const onDragEnd = (result: any) => {
        if (!result.destination) return;

        const items = Array.from(resumeData?.references || []);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setIsSaving(true);
        saveResumeData(items);
    };

    return (
        <div className="max-w-2xl  shadow-md ">
            <FormHeading icon={<Users size={40} />} label="References" />

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="references">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="space-y-1"
                        >
                            {resumeData?.references?.map((item, index) => (
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
                        name="references.0.name"
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
                        name="references.0.description"
                        render={({ field }) => (
                            <FormItem className="md:w-1/2">
                                <FormLabel>Description</FormLabel>
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
                        name={`references.0.url`}
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
                    <PopupTag name="references.0.urlTag" form={form} />
                </div>

                <FormField
                    control={form.control}
                    name={`references.0.summary`}
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

export default ReferencesForm;
