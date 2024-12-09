import React from "react";
import ResumeSidebarItem from "./resume-sidebar-item";
import { ReadCvLogo, FadersHorizontal } from "@phosphor-icons/react";
import ResumeLogo from "./resume-logo";
import Link from "next/link";

export const SidebarRoutes = [
    {
        href: "/dashboard/resumes",
        icon: <ReadCvLogo size={25} />,
        label: "Resumes",
    },
    {
        href: "/dashboard/settings",
        icon: <FadersHorizontal size={25} />,
        label: "Settings",
    },
];

const ResumeSidebarRoutes = () => {
    return (
        <div className="h-full w-full flex flex-col justify-between ">
            <div>
                <div className="flex justify-center border-b items-center py-1.5">
                    <ResumeLogo />
                </div>

                <div className="flex flex-col gap-2 mt-4">
                    {SidebarRoutes.map(({ icon, label, href }, i) => (
                        <ResumeSidebarItem
                            key={i}
                            icon={icon}
                            label={label}
                            href={href}
                        />
                    ))}
                </div>
            </div>

            <div className="p-6 text-sm text-muted-foreground">
                <div>Licensed under MIT</div>
                <div>By the community, for the community.</div>
                <div className="mt-2">
                    A passion project by{" "}
                    <Link href="#" className="underline hover:text-foreground">
                   Faiz Khan
                    </Link>
                </div>
                <div className="mt-4">Reactive Resume v4.1.8</div>
            </div>
        </div>
    );
};

export default ResumeSidebarRoutes;
