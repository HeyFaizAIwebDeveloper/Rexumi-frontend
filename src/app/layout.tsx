import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ResumeProvider } from "@/contexts/ResumeContext";
import { Toaster } from "@/components/ui/toaster";
import { AtsScoreProvider } from "@/contexts/AtsScoreContex";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Rexumi - AI Resume Builder | Optimize Your Resume with AI Scoring",
    description:
        "Boost your job prospects with our AI-powered resume builder. Get instant ATS-friendly resume scoring, professional feedback, and optimization tips.",
    icons: {
        icon: [
            {
                media: `(prefers-color-scheme: light)`,
                url: "/favicon-light.png",
                href: "/favicon-light.png",
            },
            {
                media: `(prefers-color-scheme: dark)`,
                url: "/favicon-dark.png",
                href: "/favicon-dark.png",
            },
        ],
    },
    keywords:
        "AI resume builder, resume scoring, ATS optimization, job application, career improvement",
    openGraph: {
        title: "AI Resume Builder - Boost Your Job Prospects",
        description:
            "Transform your resume with AI-driven insights and professional scoring.",
        type: "website",
        url: "https://rexumi.vercel.app",
        images: [
            {
                url: "https://res.cloudinary.com/dmsis7gbp/image/upload/v1734200946/Black_White_illustrative_Sports_football_club_logo_scjz74.jpg",
                width: 1200,
                height: 630,
                alt: "AI Resume Builder - Optimize Your Resume",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "AI Resume Builder | Professional Resume Scoring",
        description:
            "Get AI-powered resume insights and boost your job application success.",
        images: [
            "https://res.cloudinary.com/dmsis7gbp/image/upload/v1734200946/Black_White_illustrative_Sports_football_club_logo_scjz74.jpg",
        ],
    },
    robots: "index, follow",
    alternates: {
        canonical: "https://rexumi.vercel.app",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={cn(
                    inter.className,
                    "max-w-screen-2xl w-full h-full bg-black text-white"
                )}
            >
                <ResumeProvider>
                    <AtsScoreProvider>
                        {children}
                        <Toaster />
                    </AtsScoreProvider>
                </ResumeProvider>
            </body>
        </html>
    );
}
