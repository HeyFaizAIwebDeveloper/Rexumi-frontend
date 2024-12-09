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
        <section className="py-20 px-4 sm:px-6 lg:px-8  ">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-8">
                        Rich in features, not in pricing.
                    </h2>
                    <p className="text-gray-200 text-lg mb-12 max-w-xl mx-auto">
                        Craft professional resumes with AI-powered tools.
                        Customize, optimize, and stand out—all in one
                        intelligent platform designed for modern professionals.
                    </p>
                </div>

                <motion.div
                    className="flex justify-center items-center flex-wrap gap-4"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            className="flex w-fit  hover:cursor-pointer duration-500 ease-in-out  items-center gap-3 py-2.5 px-4 bg-secondary/30 rounded-[2px]  hover:bg-white hover:text-black transition-shadow"
                        >
                            <feature.icon className="w-5 h-5" />
                            <span className="text-sm">{feature.text}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
