"use client";

import React, { useState } from "react";
import {
    CircleNotch,
    CompassTool,
    DotsSixVertical,
    X,
} from "@phosphor-icons/react";
import FormHeading from "../edit-form-heading";
import {
    ResumeFromValues,
    skillschema,
    SkillsFormValues,
} from "@/lib/validations/resume";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormDialog from "../edit-form-dialog";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import FormDropdownMenu from "../edit-form-drop-menu";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useToast } from "@/hooks/use-toast";
import { useResumeContext } from "@/contexts/ResumeContext";
import { useParams } from "next/navigation";
import { updateResumeData } from "../../../../../../../action/updateResumeData";

function SkillsForm() {
    const { resumeData, setResumeData } = useResumeContext();
    const params = useParams();
    const resumeId = params.id as string;
    const { toast } = useToast();

    const [open, setOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [keywords, setKeywords] = useState<string[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    const form = useForm<SkillsFormValues>({
        resolver: zodResolver(skillschema),
        defaultValues: {
            skills: resumeData?.skills || [
                {
                    name: "",
                    description: "",
                    level: 0,
                    keywords: [],
                },
            ],
        },
    });

    const saveResumeData = async (updatedSkills: any[]) => {
        try {
            // Prepare the full resume data object
            const dataToSave = {
                ...resumeData,
                skills: updatedSkills,
            } as ResumeFromValues;

            // Use the new API function to update resume data
            const updatedData = await updateResumeData(resumeId, dataToSave);

            // Update the context with the returned data
            setResumeData(updatedData);

            toast({
                title: "Success",
                description: "Skills updated successfully",
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

    const onSubmit = (data: SkillsFormValues) => {
        const newSkills = data?.skills[0];
        if (!newSkills) return;
        const updatedSkills = Array.from(resumeData?.skills || []);

        if (editingIndex !== null) {
            updatedSkills[editingIndex] = newSkills;
        } else {
            updatedSkills.push(newSkills);
        }
        // Save to API and update context
        saveResumeData(updatedSkills);

        setOpen(false);
        setEditingIndex(null);
        form.reset();
    };

    const handleAdd = () => {
        form.reset({
            skills: [
                {
                    name: "",
                    description: "",
                    level: 0,
                    keywords: [],
                },
            ],
        });
        setEditingIndex(null);
        setOpen(true);
    };

    const handleEdit = (index: number) => {
        const SkillsToEdit = resumeData?.skills[index];
        if (SkillsToEdit) {
            form.reset({
                skills: [
                    {
                        name: SkillsToEdit.name,
                        description: SkillsToEdit.description,
                        level: SkillsToEdit.level,
                        keywords: SkillsToEdit.keywords,
                    },
                ],
            });
        }
        setEditingIndex(index);
        setOpen(true);
    };

    const handleRemove = (index: number) => {
        const updatedSkills = resumeData?.skills?.filter((_, i) => i !== index);

        // Save to API and update context
        saveResumeData(updatedSkills || []);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            const input = event.currentTarget;
            const value = input.value.trim();

            if (!value) return;

            const currentKeywords = form.getValues("skills.0.keywords") || [];
            if (!currentKeywords.includes(value)) {
                const updatedKeywords = [...currentKeywords, value];
                form.setValue("skills.0.keywords", updatedKeywords);
                input.value = "";
            }
        }
    };

    const removeKeyword = (keywordToRemove: string) => {
        const currentKeywords = form.getValues("skills.0.keywords") || [];
        const updatedKeywords = currentKeywords.filter(
            (keyword) => keyword !== keywordToRemove
        );
        form.setValue("skills.0.keywords", updatedKeywords);
    };

    const currentKeywords = form.watch("skills.0.keywords") || [];

    const onDragEnd = (result: any) => {
        if (!result.destination) return;

        const items = Array.from(resumeData?.skills || []);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setIsSaving(true);
        saveResumeData(items);
    };

    return (
        <div className="max-w-2xl shadow-md ">
            <FormHeading icon={<CompassTool size={40} />} label="Skills" />

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="profiles">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="space-y-1"
                        >
                            {resumeData?.skills?.map((item, index) => (
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
                                                                {
                                                                    item.description ? item.description : "No description provided"
                                                                }
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

            {/* Add item button  */}
            <Button
                onClick={handleAdd}
                variant="dashed"
                size="lg"
                className="mt-3 rounded-[2px]"
            >
                Add a New Item
            </Button>

            <FormDialog
                open={open}
                setOpen={setOpen}
                index={editingIndex}
                onSubmit={onSubmit}
                form={form}
            >
                <div className="flex md:flex-row flex-col space-x-5">
                    <FormField
                        control={form.control}
                        name="skills.0.name"
                        render={({ field }) => (
                            <FormItem className="md:w-1/2">
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Web Technologies"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="skills.0.description"
                        render={({ field }) => (
                            <FormItem className="md:w-1/2">
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Advanced"
                                        {...field}
                                        value={field.value || ""}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="skills.0.level"
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

                <FormField
                    control={form.control}
                    name="skills.0.keywords"
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
}

export default SkillsForm;
