"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { FloatingToolbar } from "./floatingToolbar";
import ResumePreviewItem from "./resumePreviewItem";
import { useZoom } from "@/hooks/use-zoom";
import { useDragController } from "@/hooks/useDragController";
import { usePdfGenerator } from "@/hooks/usePdfGenerator";


export function ResumePreview() {
    const componentRef = useRef<HTMLDivElement>(null);
    const { contentRef, handlePrint } = usePdfGenerator();
    const {
        isDragging,
        position,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleReset,
    } = useDragController();
    const { zoom, handleZoomIn, handleZoomOut, handleResetZoom } = useZoom(
        0.7,
        0.5,
        1.5
    );

    return (
        <>
            <FloatingToolbar
                className=" absolute bottom-8 left-1/2 -translate-x-1/2  shadow-lg transform z-[5] flex items-center gap-1 overflow-hidden rounded-full bg-black "
                handleZoomIn={handleZoomIn}
                handleZoomOut={handleZoomOut}
                handleResetZoom={handleResetZoom}
                handleReset={handleReset}
                handleDownload={handlePrint}
            />

            <div className=" absolute inset-0 h-full w-full bg-transparent  bg-whitebg-[radial-gradient(#737373_1px,transparent_1px)] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:14px_14px]">
                <div
                    ref={componentRef}
                    className={cn(
                        "w-full aspect-[210/297] text-black bg-white shadow-lg "
                    )}
                    id={"resume-preview-content"}
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                        transformOrigin: "top center",
                        cursor: isDragging ? "grabbing" : "move",
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                >
                    <div ref={contentRef}>
                        <ResumePreviewItem />
                    </div>
                </div>
            </div>
        </>
    );
}

