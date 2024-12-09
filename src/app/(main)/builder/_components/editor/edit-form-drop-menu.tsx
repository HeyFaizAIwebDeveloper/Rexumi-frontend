"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    DotsThreeVertical,
    PencilSimple,
    Cards,
    TrashSimple,
} from "@phosphor-icons/react";

interface ProfileActionsProps {
    onEdit: () => void;
    onDelete: () => void;
    onDuplicate?: () => void;
}

const FormDropdownMenu = ({
    onEdit,
    onDelete,
    onDuplicate,
}: ProfileActionsProps) => {
    return (
        <div className="flex size-5 items-center justify-center">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size={"icon"}
                        className="p-2  hover:bg-secondary/30 rounded-[2px]"
                    >
                        <DotsThreeVertical size={20} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            className="rounded-[2px]"
                            onClick={onEdit}
                        >
                            <PencilSimple size={20} className="mr-2" />
                            Edit
                        </DropdownMenuItem>
                        {onDuplicate && (
                            <DropdownMenuItem
                                className="rounded-[2px]"
                                onClick={onDuplicate}
                            >
                                <Cards size={20} className="mr-2" />
                                Duplicate
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="text-destructive rounded-[2px]"
                        onClick={onDelete}
                    >
                        <TrashSimple size={20} className="mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default FormDropdownMenu;
