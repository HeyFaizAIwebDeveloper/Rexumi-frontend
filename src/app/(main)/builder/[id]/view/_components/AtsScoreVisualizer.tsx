"use client";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { Button } from "@/components/ui/button";
import { PencilLine } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { CircularProgress } from "./CircularProgressBar";
import AccordionComponent from "./ats-accordion";
import { useAtsScore } from "@/contexts/AtsScoreContex";
import { useParams } from "next/navigation";
import { AtsScore } from "@/types/type";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import Image from "next/image";

interface AtsScoreData {
    createdAt: Date;
    score: number;
    atsData: AtsScore;
}

interface AtsUsage {
    userId: string;
    count: number;
    lastCheckedAt: string;
}

// Animation Variants
const headingVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.8, ease: "easeInOut" },
    },
};

const buttonVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: 0.3, staggerChildren: 0.2 },
    },
};

const buttonHover = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
};

const visualizerVariant = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: "easeOut" },
    },
};

const AtsScoreVisualizer = () => {
    const params = useParams();
    const resumeId = params.id as string;
    const { toast } = useToast();
    const { getAtsScore, checkAtsScore, getAtsUsage } = useAtsScore();
    const [atsScoreData, setAtsScoreData] = useState<AtsScoreData>();
    const [atsUsage, setAtsUsage] = useState<AtsUsage>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsage = async () => {
            const usage = await getAtsUsage();
            setAtsUsage(usage);
        };
        const storedScore = localStorage.getItem(`atsScore_${resumeId}`);

        if (storedScore) {
            const parsedScore = JSON.parse(storedScore);
            setAtsScoreData(parsedScore.data);
        } else {
            const fetchAtsScore = async () => {
                const score: any = await getAtsScore(resumeId);
                setAtsScoreData(score?.data);
            };
            if (resumeId) {
                fetchAtsScore();
                fetchUsage();
            }
        }
    }, [resumeId, getAtsScore]);

    const handleCheckAtsScore = async (id: string) => {
        if (atsUsage && atsUsage.count >= 5) {
            return toast({
                variant: "destructive",
                title: "You have reached the maximum number of checks.",
                description: "Please contact admin to increase your limit.",
            });
        }
        setLoading(true);
        try {
            const score = await checkAtsScore(id);
            if (score) {
                setAtsScoreData(score.data as unknown as AtsScoreData);
                const usage = await getAtsUsage();
                setAtsUsage(usage);
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description:
                        "You have reached the maximum ATS check limit. Please contact admin to increase your limit.",
                });
            }
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message || "An unexpected error occurred",
            });
        } finally {
            setLoading(false);
        }
    };

    const loadingStates = [
        { text: "Analyzing your resume's DNA" },
        { text: "Scanning Professional Credentials" },
        { text: "Extracting Key Skill Metrics" },
        { text: "Comparing Industry Benchmarks" },
        { text: "Generating AI Insights" },
        { text: "Optimizing Applicant Scoring Parameters" },
        { text: "Finalizing AI recommendation generation" },
    ];

    return (
        <div className="flex flex-col gap-y-8 p-2.5">
            {/* Heading */}
            <motion.div
                className="flex flex-col justify-start items-start px-5"
                initial="hidden"
                animate="visible"
                variants={headingVariant}
            >
                <h1 className="text-5xl font-semibold leading-none mb-1">
                    Resume Review Time!
                </h1>
                <p className="font-light text-center">
                    Check Your ATS Score and AI Recommendations with Rexumi Now!
                </p>
            </motion.div>

            {/* Loader */}
            <Loader
                loadingStates={loadingStates}
                loading={loading}
                duration={2000}
            />

            {/* Buttons */}
            <motion.div
                className="w-full flex justify-between items-center px-5"
                initial="hidden"
                animate="visible"
                variants={buttonVariant}
            >
                <motion.button
                    onClick={() => handleCheckAtsScore(resumeId)}
                    className="relative inline-flex h-9 overflow-hidden rounded-[2px] p-[1px]"
                    whileHover="hover"
                    variants={buttonHover}
                >
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-[2px] bg-black px-3 py-0.5 text-sm font-medium text-white backdrop-blur-3xl ease-in-out duration-500 transform hover:bg-black/50">
                        {atsScoreData
                            ? "Check Your ATS Score Again"
                            : "CHECK YOUR ATS SCORE & AI RECOMMENDATIONS NOW!"}
                    </span>
                </motion.button>
                <motion.div whileHover="hover" variants={buttonHover}>
                    <Link prefetch href={`/builder/${resumeId}`}>
                        <Button
                            variant={"ghost"}
                            className="p-2.5 border rounded-[2px]"
                        >
                            <PencilLine size={32} />
                            Edit Your Resume
                        </Button>
                    </Link>
                </motion.div>
            </motion.div>

            {/* Score Visualizer */}
            {atsScoreData ? (
                <motion.div
                    className="bg-secondary/5 border border-dashed border-white/30 m-5 p-5 space-y-5"
                    initial="hidden"
                    animate="visible"
                    variants={visualizerVariant}
                >
                    <div>
                        <h1 className="text-2xl">ATS Score Analysis</h1>
                        <p className="font-light text-sm">
                            Comprehensive analysis of your resume and profile
                            strength
                        </p>
                    </div>

                    <div className="w-full flex flex-col justify-center items-center space-y-5 mt-2">
                        <CircularProgress
                            value={atsScoreData?.score}
                            size={200}
                            strokeWidth={20}
                        />
                        <div className="w-full max-w-4xl space-y-6">
                            <AccordionComponent data={atsScoreData?.atsData} />
                        </div>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    className=" w-full flex flex-col justify-center items-start space-y-10  "
                    initial="hidden"
                    animate="visible"
                    variants={visualizerVariant}
                >
                    <p className=" w-full text-center text-white/70">
                        Opps!! No ATS Score Data Found -- Please Check Again 
                    </p>
                    <div className=" relative h-80 w-full flex justify-center items-center ">
                        <Image src={"/check-ats.svg"} alt="check-ats" fill className=" opacity-80" />
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default AtsScoreVisualizer;
