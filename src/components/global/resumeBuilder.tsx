import React from "react";
import ResumeForm from "./resumeForm";
import { ResumePreview } from "./resumePreview";

export default function ResumeBuilder() {
    return (
        <div className="w-full flex  gap-5 px-2.5 md:px-20 h-[calc(100vh-75px)] bg-zinc-950 py-5">
            <div className="md:w-[40%] w-full overflow-hidden  overflow-y-auto">
                <ResumeForm />
            </div>
            <div className=" relative md:w-[60%] md:block hidden  overflow-hidden select-none">
                <ResumePreview />
            </div>
        </div>
    );
}
