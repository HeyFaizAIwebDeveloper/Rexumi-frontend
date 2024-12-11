"use client";
import React, { useState } from "react";
import {
    PuzzlePiece,
    DotsSixVertical,
    X,
    CircleNotch,
} from "@phosphor-icons/react";
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
import {
    projectSchema,
    ProjectsFormValues,
    ResumeFromValues,
} from "@/lib/validations/resume";
import { Badge } from "@/components/ui/badge";
import { TextEditor } from "@/components/global/textEditor";
import { updateResumeData } from "../../../../../../../action/updateResumeData";
import PopupTag from "../edit-popup-tag";
import { useResumeContext } from "@/contexts/ResumeContext";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";

const ProjectsForm = () => {
    const { resumeData, setResumeData } = useResumeContext();
    const { toast } = useToast();
    const params = useParams();
    const resumeId = params.id as string;

    const [isSaving, setIsSaving] = useState(false);
    const [open, setOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [keywords, setKeywords] = useState<string[]>([]);

    const form = useForm<ProjectsFormValues>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            projects: resumeData?.projects || [
                {
                    name: "",
                    dateRange: "",
                    description: "",
                    url: "",
                    urlTag: "",
                    summary: "",
                    keywords: [],
                },
            ],
        },
    });

    const saveResumeData = async (updatedProjects: any[]) => {
        try {
            // Prepare the full resume data object
            const dataToSave = {
                ...resumeData,
                projects: updatedProjects,
            } as ResumeFromValues;

            // Use the new API function to update resume data
            const updatedData = await updateResumeData(resumeId, dataToSave);

            // Update the context with the returned data
            setResumeData(updatedData);

            toast({
                title: "Success",
                description: "Projects updated successfully",
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
        const projectsToEdit = resumeData?.projects[index];
        if (projectsToEdit) {
            form.reset({
                projects: [
                    {
                        name: projectsToEdit.name,
                        summary: projectsToEdit.summary,
                        dateRange: projectsToEdit.dateRange,
                        description: projectsToEdit.description,
                        url: projectsToEdit.url,
                        urlTag: projectsToEdit.urlTag,
                        keywords: projectsToEdit.keywords,
                    },
                ],
            });
        }
        setEditingIndex(index);
        setOpen(true);
    };

    const handleAdd = () => {
        form.reset({
            projects: [
                {
                    name: "",
                    dateRange: "",
                    description: "",
                    url: "",
                    urlTag: "",
                    summary: "",
                    keywords: [],
                },
            ],
        });
        setEditingIndex(null);
        setOpen(true);
    };

    const handleRemove = (index: number) => {
        const updatedprojects = resumeData?.projects?.filter(
            (_, i) => i !== index
        );

        // Save to API and update context
        saveResumeData(updatedprojects || []);
    };

    const onSubmit = (data: ProjectsFormValues) => {
        const newprojects = data.projects[0];

        if (!newprojects) return;

        const updatedprojects = Array.from(resumeData?.projects || []);

        if (editingIndex !== null) {
            // Update existing profile
            updatedprojects[editingIndex] = newprojects;
        } else {
            // Add new profile
            updatedprojects.push(newprojects);
        }

        saveResumeData(updatedprojects);

        setOpen(false);
        setEditingIndex(null);
        form.reset();
    };

    const onDragEnd = (result: any) => {
        if (!result.destination) return;

        const items = Array.from(resumeData?.projects || []);
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

            const currentKeywords = form.getValues("projects.0.keywords") || [];
            if (!currentKeywords.includes(value)) {
                const updatedKeywords = [...currentKeywords, value];
                form.setValue("projects.0.keywords", updatedKeywords);
                input.value = "";
            }
        }
    };

    const removeKeyword = (keywordToRemove: string) => {
        const currentKeywords = form.getValues("projects.0.keywords") || [];
        const updatedKeywords = currentKeywords.filter(
            (keyword) => keyword !== keywordToRemove
        );
        form.setValue("projects.0.keywords", updatedKeywords);
    };

    const currentKeywords = form.watch("projects.0.keywords") || [];

    return (
        <div className="max-w-2xl shadow-md ">
            <FormHeading icon={<PuzzlePiece size={40} />} label="Project" />

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="projects">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="space-y-1"
                        >
                            {resumeData?.projects?.map((item, index) => (
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
                                                                    "add something.."}
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

            {/* add projects item button */}
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
                        name="projects.0.name"
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
                        name="projects.0.description"
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
                <div className="flex md:flex-row flex-col space-x-5">
                    <FormField
                        control={form.control}
                        name="projects.0.dateRange"
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
                            name={`projects.0.url`}
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
                        <PopupTag name="projects.0.urlTag" form={form} />
                    </div>
                </div>
                <FormField
                    control={form.control}
                    name={`projects.0.summary`}
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
                <FormField
                    control={form.control}
                    name="projects.0.keywords"
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

export default ProjectsForm;
