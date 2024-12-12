
import FaqSection from "@/components/landing page/faq";
import FeaturesSection from "@/components/landing page/feature-section";
import Footer from "@/components/landing page/footer";
import HeroSection from "@/components/landing page/hero";
import Navbar from "@/components/landing page/navbar";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className={cn(" max-w-screen-2xl w-full flex flex-col md:px-10  px-5 min-h-screen ")}>
            <Navbar />
            <HeroSection />
            <FeaturesSection />
            <FaqSection />
            <Footer />
        </main>
  )
}
