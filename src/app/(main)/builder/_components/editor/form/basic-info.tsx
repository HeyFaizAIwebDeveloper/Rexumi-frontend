"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Plus, User, X } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import { basicSchema, BasicsFormValues } from "@/lib/validations/resume";
import { useEffect, useRef, useState } from "react";
import FormHeading from "../edit-form-heading";

import { useResumeContext } from "@/contexts/ResumeContext";
import { useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { updateResumeData } from "../../../../../../../action/updateResumeData";
import PopupTag from "../edit-popup-tag";
import debounce from 'lodash/debounce';


const BasicsForm = () => {
    const { resumeData, setResumeData } = useResumeContext();
    const { toast } = useToast();
    const params = useParams();
    const resumeId = params.id as string;

    const [isSaving, setIsSaving] = useState(false);

    const form = useForm<BasicsFormValues>({
        resolver: zodResolver(basicSchema),
        defaultValues: {
            picture: resumeData?.picture || "",
            fullName: resumeData?.fullName || "",
            headline: resumeData?.headline || "",
            email: resumeData?.email || "",
            website: resumeData?.website || "",
            phone: resumeData?.phone || "",
            location: resumeData?.location || "",
            customFields: resumeData?.customFields || [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "customFields",
    });

    const photoInputRef = useRef<HTMLInputElement>(null);

     // Debounced save function
     const debouncedSave = useRef(
        debounce(async (data: BasicsFormValues) => {
            try {
                setIsSaving(true);
                const dataToSave = {
                    ...resumeData,
                    ...data,
                };

                const updatedData = await updateResumeData(
                    resumeId,
                    dataToSave
                );
                setResumeData(updatedData);

                toast({
                    title: "Success",
                    description: "Basic information updated",
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
        }, 500)
    ).current;

    // Watch form changes and save
    useEffect(() => {
        const subscription = form.watch(async (values) => {
            const isValid = await form.trigger();
            if (!isValid) return;

            // Use debounced save
            debouncedSave(values as BasicsFormValues);
        });

        return () => {
            subscription.unsubscribe();
            // Use the cancel method provided by Lodash's debounce
            if (debouncedSave.cancel) {
                debouncedSave.cancel();
            }
        };
    }, [form, debouncedSave]);


    return (
        <div className="max-w-2xl shadow-md ">
            <FormHeading label="Basics" icon={<User size={40} />} />
            <Form {...form}>
                <form className="space-y-6">
                    {/* Picture */}
                    <FormField
                        control={form.control}
                        name="picture"
                        render={({ field: { value, ...fieldValues } }) => (
                            <FormItem>
                                <FormLabel>Picture</FormLabel>
                                <div className="flex items-center gap-2">
                                    <FormControl>
                                        <Input
                                            {...fieldValues}
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file =
                                                    e.target.files?.[0];
                                                fieldValues.onChange(
                                                    file || undefined
                                                ); // Set to undefined if no file is selected
                                            }}
                                            ref={photoInputRef}
                                        />
                                    </FormControl>
                                    <Button
                                        variant="ghost"
                                        type="button"
                                        onClick={() => {
                                            fieldValues.onChange(undefined); // Set to undefined
                                            if (photoInputRef.current) {
                                                photoInputRef.current.value =
                                                    "";
                                            }
                                        }}
                                    >
                                        Remove
                                    </Button>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Full Name */}
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Elon Musk"
                                        {...field}
                                        value={field.value || ""}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Headline */}
                    <FormField
                        control={form.control}
                        name="headline"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Headline</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Creative and Innovative Web Developer"
                                        {...field}
                                        value={field.value || ""}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <div className="flex md:flex-row flex-col space-x-5">
                        {/* Email */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="md:w-1/2">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="john.doe@gmail.com"
                                            {...field}
                                            value={field.value || ""}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Website */}
                        <div className="flex md:w-1/2  items-end gap-2">
                            <FormField
                                control={form.control}
                                name="website"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Website</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="https://johndoe.com"
                                                {...field}
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <PopupTag form={form} name={"urlTag"} />
                        </div>
                    </div>

                    <div className="flex md:flex-row flex-col w-full gap-2.5">
                        {/* Phone */}
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className="md:w-1/2">
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="(555) 123-4567"
                                            {...field}
                                            value={field.value || ""}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Location */}
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem className="md:w-1/2">
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Pleasantville, CA 94588"
                                            {...field}
                                            value={field.value || ""}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Custom Fields */}
                    <div>
                        <h2 className="text-lg font-semibold">Custom Fields</h2>
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex space-x-4 mt-2">
                                {/* Name */}
                                <FormField
                                    control={form.control}
                                    name={`customFields.${index}.name`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder="Name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Value */}
                                <FormField
                                    control={form.control}
                                    name={`customFields.${index}.value`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder="Value"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Remove Button */}
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className=" hover:bg-secondary/30"
                                    onClick={() => remove(index)}
                                >
                                    <X size={25} />
                                </Button>
                            </div>
                        ))}

                        <Button
                            type="button"
                            variant={"link"}
                            onClick={() => append({ name: "", value: "" })}
                            className="mt-4 text-base font-medium"
                        >
                            <Plus size={25} />
                            Add Custom Field
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default BasicsForm;
