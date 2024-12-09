import React from "react";

import { useResumeContext } from "@/contexts/ResumeContext";
import { ResumeFromValues } from "@/lib/validations/resume";
import Template03 from "../template/Template-03";
import Template02 from "../template/Template-02";


export default function ResumePreviewItem() {
    const { resumeData } = useResumeContext();

    const renderTemplate = (resumeData: ResumeFromValues) => {
        switch (resumeData.template) {
            case 1:
                return <Template03 resumedata={resumeData} />;
                default:
                return <Template02 resumedata={resumeData} />;
        }
    };

    return <>{resumeData && renderTemplate(resumeData)}</>;
}
