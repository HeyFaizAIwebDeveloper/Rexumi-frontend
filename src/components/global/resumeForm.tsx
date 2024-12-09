"use client";

import { useResumeContext } from "@/contexts/ResumeContext";
import { ArrowCircleLeft, ArrowCircleRight } from "@phosphor-icons/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import { cn } from "@/lib/utils";
import { steps } from "@/app/(main)/builder/_components/editor/navbar/step";
import { Button } from "../ui/button";

export default function ResumeForm() {
    const { resumeData, setResumeData } = useResumeContext();
    const searchParams = useSearchParams();
    const router = useRouter();
    const params = useParams();
    const resumeId = params.id as string;

    // Use useMemo to memoize the current step calculation
    const currentStep = useMemo(() => 
        searchParams.get("step") || steps[0].key, 
        [searchParams]
    );

    function setStep(key: string) {
        // Use router.push instead of window.history.pushState
        router.push(`?step=${key}`, { scroll: false });
    }

    // Use useMemo to memoize FormComponent
    const FormComponent = useMemo(() => 
        steps.find((step) => step.key === currentStep)?.component, 
        [currentStep]
    );

    // Use useMemo to memoize navigation steps
    const { previousStep, nextStep } = useMemo(() => {
        const currentIndex = steps.findIndex(step => step.key === currentStep);
        return {
            previousStep: currentIndex > 0 ? steps[currentIndex - 1].key : null,
            nextStep: currentIndex < steps.length - 1 ? steps[currentIndex + 1].key : null
        };
    }, [currentStep]);

    const handleNext = () => {
        if (currentStep === "summary-info") {
            router.push(`/builder/${resumeId}/view`);
        } else if (nextStep) {
            setStep(nextStep);
        }
    };

    return (
        <div className="h-full w-full flex flex-col justify-between">
            <div>
                {FormComponent && (
                    <FormComponent
                        resumeData={resumeData}
                        setResumeData={setResumeData}
                    />
                )}
            </div>

            <div className="flex justify-center items-center max-w-2xl w-full my-5 border-t border-secondary/30">
                <div
                    className={cn(
                        "flex items-center w-full pt-4",
                        !previousStep ? "justify-end" : "justify-between"
                    )}
                >
                    {previousStep && (
                        <Button
                            onClick={() => setStep(previousStep)}
                            variant="ghost"
                            className={cn(
                                "select-none border hover:bg-secondary/30 rounded-[2px]"
                            )}
                        >
                            <ArrowCircleLeft size={30} />
                            Prev
                        </Button>
                    )}
                    <Button
                        onClick={handleNext}
                        variant="ghost"
                        className={cn(
                            "select-none border hover:bg-secondary/30 rounded-[2px]"
                        )}
                    >
                        {currentStep === "summary-info" ? "Finish" : "Next"}
                        <ArrowCircleRight size={30} />
                    </Button>
                </div>
            </div>
        </div>
    );
}