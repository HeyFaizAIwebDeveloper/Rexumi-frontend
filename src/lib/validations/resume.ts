import { z } from "zod";

const optionalString = z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .or(z.null());

const optionalStringArray = z.array(
    z.string().trim().optional().or(z.literal(""))
);
const optionalUrl = z
    .string()
    .url("URL must start with https://")
    .optional()
    .or(z.literal(""));

const MAX_FILE_SIZE = 2000000; // 2MB
const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

export const basicSchema = z.object({
    picture: z
        .custom<File | undefined>()
        .refine(
            (file) =>
                !file ||
                (file instanceof File && file.type.startsWith("image/")),
            "Must be an image file"
        )
        .refine(
            (file) => !file || file.size <= 1024 * 1024 * 2,
            "File must be less then 2MB"
        ),
    fullName: optionalString,
    headline: optionalString,
    email: optionalString,
    urlTag: optionalString,
    website: optionalUrl,
    phone: optionalString,
    location: optionalString,
    customFields: z
        .array(
            z.object({
                name: z.string().min(1, "Field name is required").optional(),
                value: z.string().min(1, "Field value is required").optional(),
            })
        )
        .optional(),
});

export type BasicsFormValues = z.infer<typeof basicSchema>;

export const profilesSchema = z.object({
    profile: z.array(
        z.object({
            network: z
                .string()
                .min(2, "String must contain at least 1 character(s)"),
            username: z
                .string()
                .min(2, "String must contain at least 1 character(s)"),
            url: optionalUrl,
            urlTag: optionalString,
        })
    ),
});

export type ProfileFormValues = z.infer<typeof profilesSchema>;
export const experiencechema = z.object({
    experience: z.array(
        z.object({
            company: z
                .string()
                .min(2, "String must contain at least 2 character(s)"),
            position: z
                .string()
                .min(2, "String must contain at least 2 character(s)"),
            location: optionalString,
            dateRange: optionalString,
            url: optionalUrl,
            urlTag: optionalString,
            description: optionalString,
        })
    ),
});

export type ExperienceFormValues = z.infer<typeof experiencechema>;

export const skillschema = z.object({
    skills: z.array(
        z.object({
            name: z.string().min(2, {
                message: "String must contain at least 2 character(s)",
            }),
            description: optionalString,
            level: z.number().min(0).max(5),
            keywords: optionalStringArray,
        })
    ),
});

export type SkillsFormValues = z.infer<typeof skillschema>;

export const educationSchema = z.object({
    education: z.array(
        z.object({
            institution: z
                .string()
                .min(2, "String must contain at least 2 character(s)"),
            location: optionalString,
            areaofstudy: optionalString,
            score: optionalString,
            dateRange: optionalString,
            description: optionalString,
            url: optionalUrl,
            urlTag: optionalString,
        })
    ),
});

export type EducationFormValues = z.infer<typeof educationSchema>;

export const languageSchema = z.object({
    languages: z.array(
        z.object({
            name: z
                .string()
                .min(2, "String must contain at least 2 character(s)"),
            level: z.number().min(0).max(5),
            description: optionalString,
        })
    ),
});

export type LanguageFormValues = z.infer<typeof languageSchema>;

export const awardSchema = z.object({
    awards: z.array(
        z.object({
            title: z
                .string()
                .min(2, "String must contain at least 2 character(s)"),
            award: optionalString,
            dateRange: optionalString,
            description: optionalString,
            url: optionalUrl,
            urlTag: optionalString,
        })
    ),
});

export type AwardFormValues = z.infer<typeof awardSchema>;

export const certificationSchema = z.object({
    certifications: z.array(
        z.object({
            name: z
                .string()
                .min(2, "String must contain at least 2 character(s)"),
            issuer: optionalString,
            dateRange: optionalString,
            description: optionalString,
            url: optionalUrl,
            urlTag: optionalString,
        })
    ),
});

export type CertificationsFormValues = z.infer<typeof certificationSchema>;

export const interestSchema = z.object({
    interests: z.array(
        z.object({
            name: z
                .string()
                .min(2, "String must contain at least 2 character(s)"),
            keywords: optionalStringArray,
        })
    ),
});

export type InterestsFormValues = z.infer<typeof interestSchema>;

export const projectSchema = z.object({
    projects: z.array(
        z.object({
            name: z
                .string()
                .min(2, "String must contain at least 2 character(s)"),
            description: optionalString,
            dateRange: optionalString,
            url: optionalUrl,
            urlTag: optionalString,
            summary: optionalString,
            keywords: optionalStringArray,
        })
    ),
});

export type ProjectsFormValues = z.infer<typeof projectSchema>;

export const publicationSchema = z.object({
    publications: z.array(
        z.object({
            name: z
                .string()
                .min(2, "String must contain at least 2 character(s)"),
            dateRange: optionalString,
            publisher: optionalString,
            description: optionalString,
            url: optionalUrl,
            urlTag: optionalString,
        })
    ),
});

export type PublicationFormValues = z.infer<typeof publicationSchema>;

export const volunteeringSchema = z.object({
    volunteering: z.array(
        z.object({
            organisation: z
                .string()
                .min(2, "String must contain at least 2 character(s)"),
            position: optionalString,
            dateRange: optionalString,
            url: optionalUrl,
            urlTag: optionalString,
            location: optionalString,
            description: optionalString,
        })
    ),
});

export type VolunteeringFormValues = z.infer<typeof volunteeringSchema>;

export const referenceSchema = z.object({
    references: z.array(
        z.object({
            name: z
                .string()
                .min(2, "String must contain at least 2 character(s)"),
            description: optionalString,
            url: optionalUrl,
            urlTag: optionalString,
            summary: optionalString,
        })
    ),
});

export type ReferenceFormValues = z.infer<typeof referenceSchema>;

export const professionalSummarySchema = z.object({
    professionalSummary: optionalString,
});

export type ProfessionalSummaryFormValues = z.infer<
    typeof professionalSummarySchema
>;

export const themeSchema = z.object({
    theme: z.object({
        background: z.string().default("#ffffff"),
        text: z.string().default("#000000"),
        primary: z.string().default("#FF0000"),
    }),
});

export type ThemeFormValues = z.infer<typeof themeSchema>;

export const defaultLayout = [
    "profiles",
    "summary",
    "experience",
    "education",
    "projects",
    "volunteer",
    "references",
    "skills",
    "interests",
    "certifications",
    "awards",
    "publications",
    "languages",
];

export const resumeSchema = z.object({
    ...basicSchema.shape,
    ...profilesSchema.shape,
    ...experiencechema.shape,
    ...educationSchema.shape,
    ...skillschema.shape,
    ...languageSchema.shape,
    ...awardSchema.shape,
    ...certificationSchema.shape,
    ...interestSchema.shape,
    ...projectSchema.shape,
    ...publicationSchema.shape,
    ...volunteeringSchema.shape,
    ...referenceSchema.shape,
    ...professionalSummarySchema.shape,
    ...themeSchema.shape,
    hideIcons: z.boolean().default(true),
    underlineLinks: z.boolean().default(true),
    layout: optionalStringArray,
    template: z.number().default(0),
});

export type ResumeFromValues = Omit<z.infer<typeof resumeSchema>, "picture"> & {
    id?: string;
    picture?: File | string | null;
};
