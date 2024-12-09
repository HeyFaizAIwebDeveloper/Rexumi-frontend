import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";

import React from "react";
import { steps } from "./step";


interface BreadcrumbsProps {
    currentStep: string;
    setCurrentStep: (step: string) => void;
}

export default function Breadcrumbs({
    currentStep,
    setCurrentStep,
}: BreadcrumbsProps) {
    return (
        <div className="relative flex justify-center overflow-hidden">
            {/* Left Gradient */}
            <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent dark:from-black dark:to-transparent z-10" />
            {/* Right Gradient */}
            <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent dark:from-black dark:to-transparent z-10" />

            {/* Scrollable Breadcrumb Container */}
            <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hide">
                <Breadcrumb>
                    <BreadcrumbList className=" mx-8 flex-nowrap overflow-hidden overflow-x-auto">
                        {steps.map((step) => (
                            <React.Fragment key={step.key}>
                                <BreadcrumbItem>
                                    {step.key === currentStep ? (
                                        <BreadcrumbPage>
                                            {step.title}
                                        </BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink asChild>
                                            <button
                                                onClick={() =>
                                                    setCurrentStep(step.key)
                                                }
                                            >
                                                {step.title}
                                            </button>
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                                <span className="last:hidden">/</span>
                            </React.Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </div>
    );
}
