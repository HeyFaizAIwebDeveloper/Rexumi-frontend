import React, { useEffect, useState } from "react";
import FormHeading from "../edit-form-heading";
import { Article } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import {
    ProfessionalSummaryFormValues,
    professionalSummarySchema,
    ResumeFromValues,
} from "@/lib/validations/resume";
import { useResumeContext } from "@/contexts/ResumeContext";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";
import { debounce } from "lodash";
import { TextEditor } from "@/components/global/textEditor";
import { updateResumeData } from "../../../../../../../action/updateResumeData";


const SummaryForm = () => {
    const { resumeData, setResumeData } = useResumeContext();
    const { toast } = useToast();
    const params = useParams();
    const resumeId = params.id as string;

    const [isSaving, setIsSaving] = useState(false);
    const form = useForm<ProfessionalSummaryFormValues>({
        resolver: zodResolver(professionalSummarySchema),
        defaultValues: {
            professionalSummary: resumeData?.professionalSummary || "",
        },
    });

    // Create a debounced version of the saveResumeData function
    const debouncedSaveResumeData = debounce(
        async (data: ProfessionalSummaryFormValues) => {
            try {
                setIsSaving(true);
                const dataToSave = {
                    ...resumeData,
                    ...data,
                } as ResumeFromValues;

                const updatedData = await updateResumeData(
                    resumeId,
                    dataToSave
                );
                setResumeData(updatedData);

            } catch (error: any) {
                toast({
                    title: "Error",
                    description: error.message,
                    variant: "destructive",
                });
            }
        },
        100
    );

    useEffect(() => {
        const subscription = form.watch(async (values) => {
            const isValid = await form.trigger();
            if (!isValid) return;

            // Use debounced save
            debouncedSaveResumeData(values as ProfessionalSummaryFormValues);
        });

        return () => {
            subscription.unsubscribe();
            debouncedSaveResumeData.cancel(); // Cancel any pending debounced calls
        };
    }, [form, debouncedSaveResumeData]);

    return (
        <div className="max-w-2xl shadow-md ">
            <FormHeading icon={<Article size={40} />} label="Summary" />

            <Form {...form}>
                <form className="space-y-6">
                    <FormField
                        control={form.control}
                        name={`professionalSummary`}
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
                </form>
            </Form>
        </div>
    );
};

export default SummaryForm;
