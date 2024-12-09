"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useRouter, useSearchParams } from "next/navigation";
import { steps } from "../editor/navbar/step";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Tooltip } from "@/components/global/tooltip";

export default function LeftSidebar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentStep = searchParams.get("step") || steps[0].key;

    function setCurrentStep(key: string) {
        // Use router.push instead of window.history.pushState
        router.push(`?step=${key}`, { scroll: false });
    }

    const onclick = () => {
        router.push('/dashboard/resumes');
    }
    
    return (
        <div className="fixed left-0 top-0 h-screen w-16 gap-1 bg-zinc-950 z-[20] hidden md:flex flex-col justify-between items-center border-r border-zinc-800 py-4">
            {/* LOGO CONTAINER  */}
            <header className="border-zinc-800 border-b pb-1">
                <Button
                    variant="ghost"
                    size="icon"
                    className="w-10 h-10 rounded-full"

                    onClick={onclick}
                >
                    <Image
                        src={"/logo.svg"}
                        alt="Rexumi"
                        height={20}
                        width={20}
                        className="bg-center bg-cover"
                    />
                </Button>
            </header>

            {/* Navbar Container  */}
            <nav className="flex flex-col items-center justify-center gap-0.5">
                {steps.map((step, i) => {
                    const Icon = step.icon;
                    const isCurrentStep = currentStep === step.key;

                    return (
                        <TooltipProvider key={i}>
                            <Tooltip
                                content={step.title}
                                side="right"
                                className="z-[999]"
                            >
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={`w-10 h-10 rounded-full ${
                                        isCurrentStep
                                            ? "text-white bg-secondary"
                                            : "text-zinc-400 hover:text-white hover:bg-secondary"
                                    }`}
                                    onClick={() => setCurrentStep(step.key)}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="sr-only">
                                        {step.title}
                                    </span>
                                </Button>
                            </Tooltip>
                        </TooltipProvider>
                    );
                })}
            </nav>
            
            <div className="flex justify-center items-center border-t border-zinc-800 pt-4">
                <Avatar>
                    <AvatarImage src="/user1.jpeg" />
                </Avatar>
            </div>
        </div>
    );
}