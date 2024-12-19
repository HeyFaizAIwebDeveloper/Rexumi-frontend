import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

interface ResumeLogoProps {
    height?: number;
    width?: number;
}

const ResumeLogo = ({ height = 30, width = 30 }: ResumeLogoProps) => {


    return (
        <>
            <Button
                variant={"ghost"}
                className="rounded-full"
            >
                <Image
                     src={'/logo.svg'}
                    alt="Rexumi"
                    height={height}
                    width={width}
                    className=" bg-center bg-cover"
                />
            </Button>
        </>
    );
};

export default ResumeLogo;
