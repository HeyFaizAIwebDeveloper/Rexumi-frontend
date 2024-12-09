import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
    ArrowCounterClockwise,
    DotsSixVertical,
    Layout,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { EditorFormProps } from "@/types/type";

const LayoutSection = ({ resumeData, setResumeData }: EditorFormProps) => {
    // Handler for drag end
    const handleDragEnd = (result: any) => {
        const { source, destination } = result;

        // If dropped outside the list or no destination, do nothing
        if (!destination) return;

        // Create a new layout array
        const newLayout = Array.from(resumeData.layout);

        // Rearrange the layout
        const [movedItem] = newLayout.splice(source.index, 1);
        newLayout.splice(destination.index, 0, movedItem);

        // Update resume data with the new layout
        setResumeData({
            ...resumeData,
            layout: newLayout,
        });
    };

    const resetLayout = () => {
        const defaultLayout = [
            "profiles",
            "summary",
            "experience",
            "education",
            "projects",
            "volunteer",
            "references",
            "skills",
            "interests",
            "certifications",
            "awards",
            "publications",
            "languages",
        ];

        setResumeData({
            ...resumeData,
            layout: defaultLayout,
        });
    };

    return (
        <div className="space-y-10">
            <div className="flex justify-between items-center md:mt-10 ">
                <header>
                    <h2 className="flex items-center gap-2.5 line-clamp-1 text-3xl font-bold">
                        <Layout size={30} />
                        Layout
                    </h2>
                </header>
                <Button size={"icon"} variant={"ghost"} onClick={resetLayout}>
                    <ArrowCounterClockwise size={18} />
                </Button>
            </div>

            <div>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="layout">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="w-56  px-10 space-y-1 select-none "
                            >
                                {resumeData.layout?.map((section, index) => (
                                    <Draggable
                                        key={index}
                                        draggableId={index.toString()}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                className={cn(
                                                    "cursor-grab rounded bg-primary p-2 text-primary-foreground transition-colors hover:bg-primary-accent"
                                                )}
                                            >
                                                <div
                                                    {...provided.dragHandleProps}
                                                    className="flex items-center gap-x-2 capitalize"
                                                >
                                                    <DotsSixVertical
                                                        size={18}
                                                    />
                                                    {section}
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    );
};

export default LayoutSection;
