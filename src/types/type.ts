import { ResumeFromValues } from "@/lib/validations/resume";
export interface EditorFormProps {
    resumeData: ResumeFromValues;
    setResumeData: (data: ResumeFromValues) => void;
}

// export interface EditorFormProps {
//   resumeData: ResumeFromValues;
//   setResumeData: (id: string, data: ResumeFromValues, picture?: File) => Promise<void>; // Updated definition
// }
