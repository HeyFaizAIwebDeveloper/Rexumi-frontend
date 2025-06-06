import React from "react";
import ResumeSidebarItem from "./resume-sidebar-item";
import { ReadCvLogo, FadersHorizontal } from "@phosphor-icons/react";
import ResumeLogo from "./resume-logo";
import Link from "next/link";
import { LogoutAlert } from "./resume-logout-alert";

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

            <div className="p-6 text-sm text-muted-foreground space-y-5">
                <div>
                    <LogoutAlert />
                </div>
                <div>
                    <div>© All rights reserved</div>
                    <div>By the community, for the community.</div>
                    <div className="mt-2">
                        A passion project by{" "}
                        <Link
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://faizkhan-theta.vercel.app"
                            className="underline hover:text-foreground"
                        >
                            Faiz Khan
                        </Link>
                    </div>
                    <div className="mt-4">Rexumi Resume v1.0.0</div>
                </div>
            </div>
        </div>
    );
};

export default ResumeSidebarRoutes;
