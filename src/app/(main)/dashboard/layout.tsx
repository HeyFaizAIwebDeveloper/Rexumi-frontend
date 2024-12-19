"use client"

import ResumeMobileSidebar from "./resumes/_components/resume-mobile-sidebar";
import ResumeSidebar from "./resumes/_components/resume-sidebar";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body>
                <header>
                    <ResumeMobileSidebar />
                </header>
                <div className="relative min-h-screen bg-background">
                    {/* Left container (Sidebar) */}
                    <div className=" fixed inset-y-0 z-50 w-80 h-screen hidden md:flex flex-col justify-between">
                        <ResumeSidebar />
                    </div>

                    {/* Right container */}
                    <div className="lg:pl-80"> {children}</div>
                </div>
            </body>
        </html>
    );
}
