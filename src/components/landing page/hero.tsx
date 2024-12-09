"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { BorderBeam } from "../ui/border-beam";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { useRouter } from "next/navigation";

export default function HeroSection() {

    const router = useRouter();
    const onclick = () => {
        router.push('/dashboard/resumes')
    }

    return (
        <div className="max-w-6xl mx-auto px-6 pt-10 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="inline-block">
                    <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 mb-8 text-sm">
                        <span>✨</span>
                        <span>Introducing Rexumi (AI Resume Builder)</span>
                        <span>→</span>
                    </div>
                </div>
            </motion.div>

            <motion.h1
                className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                Create Professional <br />
                Resumes in Minutes
            </motion.h1>

            <motion.p
                className="text-gray-200 text-lg mb-12 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                Transform your career prospects with our cutting-edge AI resume
                creation tool. Generate powerful, tailored resumes in seconds.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <Button
                    variant={"default"}
                    size={"lg"}
                    onClick={onclick}
                >
                  Get Started for free →
                </Button>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <CardContainer className="inter-var">
                    <div className="relative flex aspect-video h-[500px] flex-col items-center justify-center overflow-hidden rounded-lg border md:shadow-xl cursor-pointer">
                        <CardBody className="relative w-[98%] h-[96%]  rounded-sm overflow-hidden">
                            <CardItem
                                translateZ="100"
                                className="w-full h-full relative"
                            >
                                <Image
                                    src="/image.png"
                                    quality={100}
                                    layout="fill" 
                                    objectFit="fit"
                                    alt="thumbnail"
                                />
                            </CardItem>
                        </CardBody>
                        <BorderBeam size={500} duration={12} delay={2} />
                    </div>
                </CardContainer>
            </motion.div>
        </div>
    );
}
