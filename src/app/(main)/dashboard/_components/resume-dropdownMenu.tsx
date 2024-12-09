import React, { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
    DotsThreeVertical,
    FolderOpen,
    PencilSimple,
    Cards,
    TrashSimple,
} from "@phosphor-icons/react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ResumeDropdownMenuProps {
    onOpen?: () => void;
    onRename?: () => void;
    onDuplicate?: () => void;
    onDeleteConfirm: () => void; // Function to call after confirmation
}

const ResumeDropdownMenu: React.FC<ResumeDropdownMenuProps> = ({
    onOpen,
    onRename,
    onDuplicate,
    onDeleteConfirm,
}) => {
    const [isOpen, setOpen] = useState(false); // Control alert dialog visibility

    const handleDeleteClick = () => {
        setOpen(true); // Open alert dialog
    };

    const handleConfirmDelete = () => {
        setOpen(false); // Close alert dialog
        onDeleteConfirm(); // Trigger delete action
    };

    const handleCancel = () => {
        setOpen(false); // Close alert dialog
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-2 rounded-[2px]">
                        <DotsThreeVertical size={20} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            onClick={onOpen}
                            className="rounded-[2px]"
                        >
                            <FolderOpen size={20} />
                            Open
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={onRename}
                            className="rounded-[2px]"
                        >
                            <PencilSimple size={20} />
                            Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={onDuplicate}
                            className="rounded-[2px]"
                        >
                            <Cards size={20} />
                            Duplicate
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={handleDeleteClick}
                        className="text-destructive rounded-[2px]"
                    >
                        <TrashSimple size={20} />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Alert Dialog */}
            <AlertDialog open={isOpen} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <div className=" space-x-5">
                            <Button
                                variant={"ghost"}
                                size={"lg"}
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant={"destructive"}
                                size={"lg"}
                                onClick={handleConfirmDelete}
                            >
                                Delete
                            </Button>
                        </div>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default ResumeDropdownMenu;
