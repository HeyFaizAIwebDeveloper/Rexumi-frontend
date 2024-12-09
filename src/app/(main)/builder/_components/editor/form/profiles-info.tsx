"use client";

import React, { useState } from "react";
import FormHeading from "../edit-form-heading";
import { Button } from "@/components/ui/button";
import { ShareNetwork, DotsSixVertical, Tag } from "@phosphor-icons/react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { ProfileFormValues, profilesSchema } from "@/lib/validations/resume";
import { zodResolver } from "@hookform/resolvers/zod";
import FormDropdownMenu from "../edit-form-drop-menu";
import FormDialog from "../edit-form-dialog";
import { EditorFormProps } from "@/types/type";
import PopupTag from "../edit-popup-tag";

const ProfilesForm = ({ resumeData, setResumeData }: EditorFormProps) => {
    const [open, setOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profilesSchema),
        defaultValues: {
            profile: resumeData?.profile || [
                {
                    network: "",
                    username: "",
                    url: "",
                    urlTag: "",
                },
            ],
        },
    });

    const onDragEnd = (result: any) => {
        if (!result.destination) return;

        const items = Array.from(resumeData.profile || []);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setResumeData({ ...resumeData, profile: items });
    };

    const handleEdit = (index: number) => {
        const profileToEdit = resumeData.profile[index];
        form.reset({
            profile: [
                {
                    network: profileToEdit.network,
                    username: profileToEdit.username,
                    url: profileToEdit.url,
                    urlTag: profileToEdit.urlTag,
                },
            ],
        });
        setEditingIndex(index);
        setOpen(true);
    };

    const handleAdd = () => {
        form.reset({
            profile: [
                {
                    network: "",
                    username: "",
                    url: "",
                    urlTag: "",
                },
            ],
        });
        setEditingIndex(null);
        setOpen(true);
    };

    const onSubmit = (data: ProfileFormValues) => {
        const newProfile = data.profile[0];

        if (!newProfile) return;

        const updatedProfiles = Array.from(resumeData.profile || []);

        if (editingIndex !== null) {
            // Update existing profile
            updatedProfiles[editingIndex] = newProfile;
        } else {
            // Add new profile
            updatedProfiles.push(newProfile);
        }

        setResumeData({
            ...resumeData,
            profile: updatedProfiles,
        });

        setOpen(false);
        setEditingIndex(null);
        form.reset();
    };

    const handleRemove = (index: number) => {
        const updatedProfiles = [...(resumeData.profile || [])];
        updatedProfiles.splice(index, 1);
        setResumeData({
            ...resumeData,
            profile: updatedProfiles,
        });
    };

    return (
        <div className="max-w-2xl shadow-md space-y-4">
            <FormHeading icon={<ShareNetwork size={40} />} label="Profile" />

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="profiles">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="space-y-1"
                        >
                            {resumeData?.profile?.map((item, index) => (
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
                                                        {item.network}
                                                    </p>
                                                    <p className="text-xs text-white/50">
                                                        {item.username}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center px-2 py-4 ml-2">
                                                <FormDropdownMenu
                                                    onEdit={() =>
                                                        handleEdit(index)
                                                    }
                                                    onDelete={() =>
                                                        handleRemove(index)
                                                    }
                                                />
                                            </div>
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
                className="  mt-3 rounded-[2px]"
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
                        name="profile.0.network"
                        render={({ field }) => (
                            <FormItem className="md:w-1/2">
                                <FormLabel>Network</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="LinkedIn"
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
                        name="profile.0.username"
                        render={({ field }) => (
                            <FormItem className="md:w-1/2">
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="john.doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex w-full  items-end gap-2">
                    <FormField
                        control={form.control}
                        name="profile.0.url"
                        render={({ field }) => (
                            <FormItem 
                            className="w-full">
                                <FormLabel>Website</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="https://linkedin.com/in/johndoe"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <PopupTag form={form} name={"profile.0.urlTag"} />
                </div>
            </FormDialog>
        </div>
    );
};

export default ProfilesForm;
