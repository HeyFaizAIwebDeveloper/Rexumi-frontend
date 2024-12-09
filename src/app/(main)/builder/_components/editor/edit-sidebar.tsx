import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";
import { steps } from "./navbar/step";

interface BuilderSidebarProps {
    currentStep: string;
    setCurrentStep: (step: string) => void;
}

const BuilderSidebar = ({
    currentStep,
    setCurrentStep,
}: BuilderSidebarProps) => {
    return (
        <aside className="flex flex-col w-12">
            <div></div>
            <nav>
                {steps.map((step, i) => (
                    <React.Fragment key={i}>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant={"ghost"}
                                        className="rounded-full hover:bg-secondary/30"
                                    >
                                        {React.createElement(step.icon)}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{step.title}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </React.Fragment>
                ))}
            </nav>
            <div></div>
        </aside>
    );
};

export default BuilderSidebar;
