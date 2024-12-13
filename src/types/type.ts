import { ResumeFromValues } from "@/lib/validations/resume";
export interface EditorFormProps {
    resumeData: ResumeFromValues;
    setResumeData: (data: ResumeFromValues) => void;
}

export interface AtsScore {
    overall_score: string;
    section_wise_scores: {
      keyword_matching: {
        relevance: number;
        frequency: number;
        proximity: number;
      };
      resume_format: {
        parseability: number;
        standardization: number;
      };
      content_relevance: {
        experience: number;
        education: number;
        skills: number;
        summary: number;
        projects: number;
        interests: number;
        certifications: number;
        awards: number;
        publications: number;
        languages: number;
        volunteer: number;
        references: number;
      };
      achievements: {
        action_verbs: number;
        quantifiable_achievements: number;
      };
      technical_accuracy: {
        grammar: number;
        spelling: number;
        punctuation: number;
      };
    };
    section_wise_recommendations: {
      [key: string]: {
        current_status: string;
        recommendations: string[];
        strength?: string[];
        improvement_areas: string[];
      };
    };
    keyword_highlights: {
      matched_keywords: string[];
    };
    critical_observations: string[];
    unique_differentiators: string[];
    potential_career_paths: string[];
    professional_strengths: string[];
    potential_growth_areas: string[];
    actionable_tips: string[];
    final_recommendation: string;
  }

// export interface EditorFormProps {
//   resumeData: ResumeFromValues;
//   setResumeData: (id: string, data: ResumeFromValues, picture?: File) => Promise<void>; // Updated definition
// }
