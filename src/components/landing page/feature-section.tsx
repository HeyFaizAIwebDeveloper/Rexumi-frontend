"use client";

import { motion } from "framer-motion";
import {
    CurrencyDollar,
    EnvelopeSimple,
    Lock,
    Binoculars,
    TextT,
    Article,
    Palette,
    Layout,
    Eye,
    Files,
    Sun,
    OpenAiLogo,
    SelectionForeground,
    Folder,
    CardsThree,
} from "@phosphor-icons/react";

const features = [
    { icon: CurrencyDollar, text: "Free" },
    { icon: Binoculars, text: "No user tracking or advertising" },
    { icon: OpenAiLogo, text: "AI Integration" },
    { icon: EnvelopeSimple, text: "Sign in with Email" },
    { icon: Lock, text: "Secure with two-factor authentication" },
    { icon: Files, text: "Resume templates to choose from" },
    { icon: CardsThree, text: "Design single/multi page resumes" },
    { icon: Folder, text: "Manage multiple resumes" },
    { icon: Palette, text: "Customisable colour palettes" },
    { icon: Layout, text: "Customisable layouts" },
    { icon: SelectionForeground, text: "Custom resume sections" },
    { icon: Article, text: "Supports A4 page formats" },
    { icon: TextT, text: "Pick any font from Google Fonts" },
    { icon: Eye, text: "Track views and downloads" },
    { icon: Sun, text: "Light or dark theme" },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export default function FeaturesSection() {
    return (
        <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-7xl">
                {/* Heading */}
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6">
                        Rich in features, 
                        <br className="hidden sm:block" /> 
                        not in pricing
                    </h2>
                    <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-8 md:mb-12 max-w-2xl mx-auto">
                        Craft professional resumes with AI-powered tools. 
                        Customize, optimize, and stand out—all in one 
                        intelligent platform designed for modern professionals.
                    </p>
                </div>

                {/* Features Grid */}
                <motion.div
                    className="flex flex-wrap justify-center gap-3 sm:gap-4"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            className="flex items-center 
                                       w-[calc(50%-0.5rem)] sm:w-auto
                                       sm:flex-none
                                       gap-2 py-2.5 px-4 
                                       bg-secondary/30 
                                       rounded-md 
                                       hover:bg-white/10 
                                       transition-colors 
                                       duration-300 
                                       cursor-pointer 
                                       text-center"
                        >
                            <feature.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-xs sm:text-sm truncate">
                                {feature.text}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}