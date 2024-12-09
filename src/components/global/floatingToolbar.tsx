import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    ClockClockwise,
    CubeFocus,
    FilePdf,
    MagnifyingGlassMinus,
    MagnifyingGlassPlus,
} from "@phosphor-icons/react";
import { Tooltip, TooltipProvider } from "./tooltip";

interface FloatingToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
    handleZoomIn: () => void;
    handleZoomOut: () => void;
    handleResetZoom: () => void;
    handleDownload?: () => void;
    handleReset?: () =>void;
}

export function FloatingToolbar({
    className,
    handleZoomIn,
    handleZoomOut,
    handleResetZoom,
    handleDownload,
    handleReset,
    ...props
}: FloatingToolbarProps) {
    return (
        <div className={cn(className)} {...props}>
            <TooltipProvider>
                <Tooltip content={"Zoom In"} side="top">
                    <Button
                        variant={"ghost"}
                        size={"icon"}
                        onClick={handleZoomIn}
                    >
                        <MagnifyingGlassPlus size={16} />
                    </Button>
                </Tooltip>
                <Tooltip content={"Zoom Out"} side="top">
                    <Button
                        variant={"ghost"}
                        size={"icon"}
                        onClick={handleZoomOut}
                    >
                        <MagnifyingGlassMinus size={16} />
                    </Button>
                </Tooltip>
                <Tooltip content={"Reset Zoom"} side="top">
                    <Button
                        variant={"ghost"}
                        size={"icon"}
                        onClick={handleResetZoom}
                    >
                        <ClockClockwise size={16} />
                    </Button>
                </Tooltip>
                <Tooltip content={"Center Artboard"} side="top">
                    <Button
                        variant={"ghost"}
                        size={"icon"}
                        onClick={handleReset}
                    >
                        <CubeFocus size={16} />
                    </Button>
                </Tooltip>
                <Tooltip content={"Download Pdf"} side="top">
                    <Button
                        variant={"ghost"}
                        size={"icon"}
                        onClick={handleDownload}
                    >
                        <FilePdf size={16} />
                    </Button>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}
