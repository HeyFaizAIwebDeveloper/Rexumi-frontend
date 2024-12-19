import React from "react";
import { SidebarSimple } from "@phosphor-icons/react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import ResumeSidebarRoutes from "./resume-sidebar-routes";

function ResumeMobileSidebar() {
    return (
        <div className="block h-min-screen lg:hidden p-6">
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className=" rounded-none"
                    >
                        <SidebarSimple size={30} />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <ResumeSidebarRoutes />
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default ResumeMobileSidebar;
