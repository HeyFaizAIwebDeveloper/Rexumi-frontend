"use client";

import React from "react";
import Breadcrumbs from "./edit-breadcrumbs";
import { Button } from "@/components/ui/button";
import { HouseSimple } from "@phosphor-icons/react";
import { useRouter, useSearchParams } from "next/navigation";
import { steps } from "./step";

const ResumeHeader = ({ name }: { name: string }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentStep = searchParams.get("step") || steps[0].key;

    function setStep(key: string) {
        // Use router.push instead of window.history.pushState
        router.push(`?step=${key}`, { scroll: false });
    }

    const onClick = () => {
        router.push("/dashboard/resumes");
    };

    return (
        <>
            <header className="select-none flex justify-center bg-zinc-950 items-center gap-2 p-2">
                <Button
                    onClick={onClick}
                    variant="ghost"
                    className="rounded-[2px] px-3 py-1 hover:bg-secondary/30"
                >
                    <HouseSimple size={25} />
                </Button>
                <span className="mr-2 text-xs opacity-40">/</span>
                <h3 className="font-light text-ellipsis text-sm">{name}</h3>
            </header>

            <nav className="overflow-hidden overflow-x-auto bg-zinc-950">
                <Breadcrumbs
                    currentStep={currentStep}
                    setCurrentStep={setStep}
                />
            </nav>
        </>
    );
};

export default ResumeHeader;