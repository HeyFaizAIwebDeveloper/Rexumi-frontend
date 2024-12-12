"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { BorderBeam } from "../ui/border-beam";
import { CardContainer } from "../ui/3d-card";
import { useRouter } from "next/navigation";

export default function HeroSection() {
    const router = useRouter();
    const handleGetStarted = () => {
        router.push('/dashboard/resumes')
    }

    return (
        <div className="container mx-auto px-4 py-12 md:py-20 lg:py-24">
            {/* Responsive Container with Centered Content */}
            <div className="flex flex-col items-center text-center">
                {/* Animated Intro Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-4 md:mb-6"
                >
                    <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-3 py-1 text-xs md:text-sm">
                        <span className="text-lg">✨</span>
                        <span>Introducing Rexumi <br className="sm:hidden block" />  (AI Resume Builder)</span>
                        <span>→</span>
                    </div>
                </motion.div>

                {/* Responsive Headline */}
                <motion.h1
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold 
                               leading-tight mb-4 md:mb-6 
                               max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Create Professional Resumes in Minutes
                </motion.h1>

                {/* Responsive Subheadline */}
                <motion.p
                    className="text-gray-200 text-sm sm:text-base md:text-lg 
                               mb-6 md:mb-8 
                               max-w-2xl mx-auto px-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    Transform your career prospects with our cutting-edge AI resume
                    creation tool. Generate powerful, tailored resumes in seconds.
                </motion.p>

                {/* Responsive Call-to-Action Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="w-full max-w-md mx-auto mb-8 md:mb-12"
                >
                    <Button
                        variant="default"
                        size="lg"
                        onClick={handleGetStarted}
                    >
                        Get Started for Free →
                    </Button>
                </motion.div>

                {/* Responsive Image Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="w-full max-w-6xl mx-auto"
                >
                    <CardContainer className="relative w-full">
                        <div className="relative w-full aspect-video 
                                        overflow-hidden rounded-lg 
                                        border shadow-lg">
                            <Image
                                src="/image.png"
                                alt="Resume Builder Preview"
                                fill
                                priority
                                quality={100}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                                className="object-contain object-center"
                            />
                            <BorderBeam size={250} duration={12} delay={2} />
                        </div>
                    </CardContainer>
                </motion.div>
            </div>
        </div>
    );
}