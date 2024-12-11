import React from "react";

import { useResumeContext } from "@/contexts/ResumeContext";
import { ResumeFromValues } from "@/lib/validations/resume";
import Template00 from "../template/Template-00";


export default function ResumePreviewItem() {
    const { resumeData } = useResumeContext();

    const renderTemplate = (resumeData: ResumeFromValues) => {
        switch (resumeData.template) {
            case 1:
                return <div>No Resume Template</div>
                default:
                return <Template00 resumedata={resumeData} />;
        }
    };

    return <>{resumeData && renderTemplate(resumeData)}</>;
}
