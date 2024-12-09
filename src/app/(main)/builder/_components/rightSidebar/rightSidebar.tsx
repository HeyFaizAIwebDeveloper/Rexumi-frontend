import { Button } from "@/components/ui/button";

import {
    DiamondsFour,
    DownloadSimple,
    Icon,
    Info,
    Layout,
    Note,
    Palette,
    ReadCvLogo,
    ShareFat,
    TextT,
    TrendUp,
    X,
} from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useResumeContext } from "@/contexts/ResumeContext";
import ThemeSection from "./sections/theme";
import { Tooltip } from "@/components/global/tooltip";

type MenuOption = {
    icon: Icon;
    label: string;
    component?: React.ReactNode;
};

export const RightSidebar = () => {
    const { resumeData, setResumeData } = useResumeContext();
    const [activeOption, setActiveOption] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const menuOptions: MenuOption[] = [
        {
            icon: DiamondsFour,
            label: " Template",
        },
        {
            icon: Layout,
            label: "Layout",
            // component: (
            //     <LayoutSection
            //         resumeData={resumeData}
            //         setResumeData={setResumeData}
            //     />
            // ),
        },
        { icon: TextT, label: "Typography" },
        {
            icon: Palette,
            label: "Theme",
            component: <ThemeSection />,
        },
        { icon: Note, label: "Notes" },
        { icon: ShareFat, label: "Share" },
        { icon: TrendUp, label: "Analytics" },
        { icon: DownloadSimple, label: "Download" },
        { icon: Info, label: "Info" },
    ];

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setActiveOption(null);
                setIsOpen(false);
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, []);

    const handleOptionClick = (label: string) => {
        if (activeOption === label) {
            setActiveOption(null);
            setIsOpen(false);
        } else {
            setActiveOption(label);
            setIsOpen(true);
        }
    };

    return (
        <div>
            {/* Fixed Sidebar */}
            <div className="fixed right-0 top-0 h-screen w-14 gap-1 bg-zinc-950 z-[20] hidden md:flex flex-col justify-center items-center py-4 border-l border-zinc-800">
                {menuOptions.map((option) => {
                    const Icon = option.icon;
                    const isActive = activeOption === option.label;
                    return (
                        <React.Fragment key={option.label}>
                            <TooltipProvider>
                                <Tooltip
                                    content={option.label}
                                    side="left"
                                    className="z-[999]"
                                >
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className={`w-10 h-10 rounded-full ${
                                            isActive
                                                ? "text-white bg-secondary  "
                                                : "hover:bg-zinc-300  text-zinc-400 hover:text-white hover:bg-secondary"
                                        }`}
                                        onClick={() =>
                                            handleOptionClick(option.label)
                                        }
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="sr-only">
                                            {option.label}
                                        </span>
                                    </Button>
                                </Tooltip>
                            </TooltipProvider>
                        </React.Fragment>
                    );
                })}
            </div>

            {/* Custom Slide-out Panel */}
            <div
                className={`fixed right-0 top-0 h-screen pr-16 w-[464px] sm:w-[540px] bg-secondary bg-zinc-950 p-6 transform transition-transform duration-300 ease-in-out z-[9] ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 text-zinc-400 hover:text-white"
                    onClick={() => {
                        setActiveOption(null);
                        setIsOpen(false);
                    }}
                >
                    <X className="w-5 h-5" />
                    <span className="sr-only">Close</span>
                </Button>

                <div className="h-full overflow-y-auto">
                    {menuOptions.find((option) => option.label === activeOption)
                        ?.component || (
                        <div className="h-full flex items-center justify-center text-zinc-400">
                            {activeOption} content coming soon...
                        </div>
                    )}
                </div>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0  bg-black bg-opacity-50 z-0"
                    onClick={() => {
                        setActiveOption(null);
                        setIsOpen(false);
                    }}
                />
            )}
        </div>
    );
};
