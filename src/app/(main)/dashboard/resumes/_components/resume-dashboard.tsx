"use client";

import * as React from "react";
import { useEffect, useState } from "react";

import { List, SquaresFour } from "@phosphor-icons/react";

import ResumeSidebar from "./resume-sidebar";
import ResumeMobileSidebar from "./resume-mobile-sidebar";
import { ResumeGridLayout, ResumeListLayout } from "./resume-layout";
import { useResumeContext } from "@/contexts/ResumeContext";
import { useRouter } from "next/navigation";

export default function ResumeDashboard() {
    const [activeTab, setActiveTab] = useState<"grid" | "list">("grid");
    const { resumes, getResumes } = useResumeContext();
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedResumes = localStorage.getItem("resumes");
        if (!storedResumes || JSON.parse(storedResumes).length === 0) {
            const fetchResumes = async () => {
                try {
                    setIsLoading(true);
                    await getResumes();
                } catch (error: any) {
                    // Handle error if needed
                } finally {
                    setIsLoading(false);
                }
            };

            fetchResumes();
        }
    }, [getResumes, resumes]);

    return (
        <>
            
                    <div className="flex h-14 items-center justify-between pt-6 px-6">
                        <h1 className="lg:text-4xl text-2xl font-semibold lg:ml-0">
                            Resumes
                        </h1>
                        <div className="flex w-fit p-0.5 bg-accent rounded-[2px]">
                            <button
                                onClick={() => setActiveTab("grid")}
                                className={` flex justify-center text-sm font-medium  rounded-[2px] items-center gap-1 px-4 py-1 ${
                                    activeTab === "grid"
                                        ? " bg-black text-white "
                                        : ""
                                }`}
                            >
                                <SquaresFour size={15} />{" "}
                                <span className="lg:block hidden">Grid</span>
                            </button>
                            <button
                                onClick={() => setActiveTab("list")}
                                className={` flex justify-center text-sm  font-medium rounded-[2px] items-center gap-1 px-4 py-1 ${
                                    activeTab === "list"
                                        ? "  bg-black text-white "
                                        : ""
                                }`}
                            >
                                <List size={15} />{" "}
                                <span className="lg:block hidden">List</span>
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    {activeTab === "grid" ? (
                        <ResumeGridLayout resume={resumes} />
                    ) : (
                        <ResumeListLayout resume={resumes} />
                    )}
             
        </>
    );
}
