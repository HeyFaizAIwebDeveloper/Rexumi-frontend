"use client";

import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { ResumePreview } from "@/components/global/resumePreview";
import { useResumeContext } from "@/contexts/ResumeContext";
import { useToast } from "@/hooks/use-toast";
import Head from "next/head";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AtsScoreVisualizer from "./_components/AtsScoreVisualizer";
import { Button } from "@/components/ui/button";
import { HouseSimple } from "@phosphor-icons/react";

export default function ViewPage() {
    const router = useRouter();
    const params = useParams();
    const resumeId = params.id as string;
    const { toast } = useToast();
    const [hasFetchedResume, setHasFetchedResume] = useState(false);
    const [resumeName, setResumeName] = useState("");
    const { resumeData, getResumeData, getResumeById } = useResumeContext();

    useEffect(() => {
        const fetchResumeData = async () => {
            if (resumeId && !hasFetchedResume) {
                try {
                    const resume = await getResumeById(resumeId);
                    if (resume) {
                        setResumeName(resume.name);
                        await getResumeData(resumeId);
                        setHasFetchedResume(true);
                    }
                } catch (error) {
                    toast({
                        variant: "destructive",
                        title: "Error fetching resume data:",
                        description: `${error}`,
                    });
                    setHasFetchedResume(false);
                }
            }
        };

        fetchResumeData();
    }, [resumeId, getResumeById, getResumeData, toast]);

    const onClick = () => {
        router.refresh();
        router.push("/dashboard/resumes");
    };

    return (
        <>
            <Head>
                <title>Resume Review | Rexumi</title>
                <meta
                    name="description"
                    content="Check your ATS score and get AI recommendations with Rexumi."
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta
                    name="keywords"
                    content="Resume, ATS Score, AI Recommendations, Resume Review"
                />
                <meta name="author" content="Rexumi Team" />
            </Head>

            <motion.header
                className="select-none flex justify-center bg-zinc-950 items-center gap-2 p-2"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Button
                    onClick={onClick}
                    variant="ghost"
                    className="rounded-[2px] px-3 py-1 hover:bg-secondary/30"
                >
                    <HouseSimple size={25} />
                </Button>
                <span className="mr-2 text-xs opacity-40">/</span>
                <h3 className="font-light text-ellipsis text-sm">
                    {resumeName}
                </h3>
            </motion.header>

            <motion.main
                className="w-full h-[calc(100vh-55px)] bg-zinc-950"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {!hasFetchedResume ? (
                    <div className="flex h-full gap-5 md:p-20">
                        {/* Left Panel */}
                        <div className="flex-1 space-y-4">
                            {/* Top Rectangles */}
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-6 w-1/2" />
                            {/* Smaller Rectangle */}
                            <Skeleton className="h-4 w-1/3" />
                            {/* Circle */}
                            <Skeleton className="h-32 w-32 rounded-full" />
                        </div>

                        {/* Right Panel */}
                        <div className="flex-1 space-y-4 border-l pl-5">
                            {/* Header */}
                            <Skeleton className="h-6 w-3/4" />
                            {/* Smaller Rectangles */}
                            <Skeleton className="h-6 w-2/3" />
                            <Skeleton className="h-4 w-1/4" />
                        </div>
                    </div>
                ) : (
                    <div className="w-full h-full flex gap-5 py-5">
                        <div className="md:w-[50%] w-full overflow-hidden overflow-y-auto">
                            <AtsScoreVisualizer />
                        </div>
                        <div className="relative md:w-[50%] md:block hidden overflow-hidden select-none">
                            <ResumePreview />
                        </div>
                    </div>
                )}
            </motion.main>
        </>
    );
}
