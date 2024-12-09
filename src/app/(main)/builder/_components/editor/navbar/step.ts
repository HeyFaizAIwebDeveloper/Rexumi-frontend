import BasicForm from "@/app/(main)/builder/_components/editor/form/basic-info";
import AwardsForm from "@/app/(main)/builder/_components/editor/form/awards-info";
import CertificationsForm from "@/app/(main)/builder/_components/editor/form/certifications-info";
import EducationForm from "@/app/(main)/builder/_components/editor/form/education-info";
import ExperienceForm from "@/app/(main)/builder/_components/editor/form/experience-info";
import InterestsForm from "@/app/(main)/builder/_components/editor/form/interests-info";
import LanguagesForm from "@/app/(main)/builder/_components/editor/form/languages-info";
import ProfilesForm from "@/app/(main)/builder/_components/editor/form/profiles-info";
import ProjectsForm from "@/app/(main)/builder/_components/editor/form/projects-info";
import PublicationsForm from "@/app/(main)/builder/_components/editor/form/publications";
import ReferencesForm from "@/app/(main)/builder/_components/editor/form/references-info";
import SkillsForm from "@/app/(main)/builder/_components/editor/form/skills-info";
import VolunteeringForm from "@/app/(main)/builder/_components/editor/form/volunteering-info";
import SummaryForm from "@/app/(main)/builder/_components/editor/form/summary-info";
import {
    User,
    Article,
    ShareNetwork,
    Briefcase,
    GraduationCap,
    CompassTool,
    Translate,
    Medal,
    Certificate,
    GameController,
    PuzzlePiece,
    Books,
    HandHeart,
    Users,
    Icon,
} from "@phosphor-icons/react";

import { EditorFormProps } from "@/types/type";


type stepsProps = {
    icon: Icon;
    title: string;
    component: React.ComponentType<EditorFormProps>;
    key: string;
}
export const steps: stepsProps[] = [
    {
        title: "Basic",
        component: BasicForm,
        key: "basic-info",
        icon: User
    },
    {
        title: "Profiles",
        component: ProfilesForm,
        key: "profiles-info",
        icon: ShareNetwork
    },
    {
        title: "Experience",
        component: ExperienceForm,
        key: "experience-info",
        icon: Briefcase
    },
    {
        title: "Education",
        component: EducationForm,
        key: "education-info",
        icon: GraduationCap
    },
    {
        title: "Skills",
        component: SkillsForm,
        key: "skills-info",
        icon:CompassTool
    },
    {
        title: "Languages",
        component: LanguagesForm,
        key: "languages-info",
        icon:Translate
    },
    {
        title: "Awards",
        component: AwardsForm,
        key: "awards-info",
        icon:Medal
    },
    {
        title: "Certifications",
        component: CertificationsForm,
        key: "certifications-info",
        icon:Certificate
    },
    {
        title: "Interests",
        component: InterestsForm,
        key: "interests-info",
        icon:GameController
    },
    {
        title: "Projects",
        component: ProjectsForm,
        key: "projects-info",
        icon:PuzzlePiece
    },
    {
        title: "Publications",
        component: PublicationsForm,
        key: "publications",
        icon:Books
    },
    {
        title: "Volunteering",
        component: VolunteeringForm,
        key: "volunteering-info",
        icon: HandHeart
    },
    {
        title: "References",
        component: ReferencesForm,
        key: "references-info",
        icon:Users
    },
    {
        title: "Summary",
        component: SummaryForm,
        key: "summary-info",
        icon: Article
    },
];

