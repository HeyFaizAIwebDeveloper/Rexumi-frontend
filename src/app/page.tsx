import Head from 'next/head';
import FaqSection from "@/components/landing page/faq";
import FeaturesSection from "@/components/landing page/feature-section";
import Footer from "@/components/landing page/footer";
import HeroSection from "@/components/landing page/hero";
import Navbar from "@/components/landing page/navbar";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Rexumi - AI Resume Builder | Get Your Perfect Resume Score & Feedback</title>
        <meta name="description" content="Enhance your resume with our AI-powered resume builder. Receive instant scoring, detailed feedback, and optimize your chances of landing your dream job." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rexumi.vercel.app" />
        <meta property="og:title" content="AI Resume Builder - Boost Your Job Prospects" />
        <meta property="og:description" content="AI-driven resume optimization tool that provides instant scoring and professional feedback to improve your resume." />
        <meta property="og:image" content="https://res.cloudinary.com/dmsis7gbp/image/upload/v1734200946/Black_White_illustrative_Sports_football_club_logo_scjz74.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://rexumi.vercel.app" />
        <meta property="twitter:title" content="Rexumi - AI Resume Builder | Professional Resume Scoring" />
        <meta property="twitter:description" content="Transform your resume with AI-powered insights and boost your job application success." />
        <meta property="twitter:image" content="https://res.cloudinary.com/dmsis7gbp/image/upload/v1734200946/Black_White_illustrative_Sports_football_club_logo_scjz74.jpg" />

        {/* Canonical Link */}
        <link rel="canonical" href="https://rexumi.vercel.app" />

        {/* Additional SEO Meta Tags */}
        <meta name="keywords" content="AI resume builder, resume scoring, job application, career improvement, resume optimization, AI feedback" />
        <meta name="robots" content="index, follow" />
      </Head>
      <main className={cn(" max-w-screen-2xl w-full flex flex-col md:px-10 px-5 min-h-screen ")}>
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <FaqSection />
        <Footer />
      </main>
    </>
  )
}