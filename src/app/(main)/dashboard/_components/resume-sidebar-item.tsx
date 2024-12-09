"use client"

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


interface ResumeSidebarItemProps {
    icon: JSX.Element;
    label: string;
    href: string;
}

const ResumeSidebarItem = ({ icon, label, href }: ResumeSidebarItemProps) => {
    const pathname = usePathname();
    const router = useRouter();
    
    const isActive =
        (pathname === "/" && href === "/") ||
        pathname === href ||
        pathname?.startsWith(`${href}/`);

    const onClick = () => {
        router.push(href);
    };

    return (
        <Button
        onClick={onClick}
        variant={"ghost"}
        size={"lg"}
        className={cn("w-full rounded-[2px] justify-start", isActive && "bg-secondary/30")}
        >
            {icon}
            {label}
        </Button>
    );
};

export default ResumeSidebarItem;
