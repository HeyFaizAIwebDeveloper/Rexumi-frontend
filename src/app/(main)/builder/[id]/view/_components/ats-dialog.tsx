import React, { Children, ReactNode } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DialogProps {
    title: string;
    children: ReactNode;
}

const DialogComponent: React.FC<DialogProps> = ({ children, title }) => {
    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button variant="link">View Details</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[800px]  border-secondary  overflow-hidden overflow-y-auto bg-black">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className=" max-h-[80vh] overflow-hidden overflow-y-auto ">
                {children}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DialogComponent;
