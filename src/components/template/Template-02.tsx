import { cn } from "@/lib/utils";
import {
    At,
    Book,
    Briefcase,
    Certificate,
    Envelope,
    Folder,
    Globe,
    GraduationCap,
    Heart,
    IconContext,
    Link,
    MapPin,
    MapPinLine,
    Medal,
    Phone,
    Star,
    Trophy,
    User,
    Users,
} from "@phosphor-icons/react";
import React from "react";

const Template02 = ({ resumedata }: { resumedata: any }) => {
    const {
        picture = "",
        fullName = "",
        headline = "",
        email = "",
        website = "",
        urlTag = "",
        phone = "",
        location = "",
        customFields = [],
        experience,
        professionalSummary,
        education,
        profile,
        projects,
        volunteering,
        references,
        skills,
        interests,
        certifications,
        awards,
        publications,
        languages,
        theme,
        hideIcons = true,
        underlineLinks = false,
        layout = [
            "basic",
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
        ],
    } = resumedata;

    const hexToRgb = (hex: string) => {
        const bigint = parseInt(hex.replace('#', ''), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `${r}, ${g}, ${b}`;
      };

    const Section: React.FC<{
        title?: string;
        icon?: React.ReactNode;
        children: React.ReactNode;
    }> = ({ title, icon, children }) => (
        <section className="mb-6">
            <h2 
            style={{
                color: theme?.primary, 
            }}
            className={`text-2xl font-bold pb-1 mb-2 flex items-center  `}>
                {hideIcons && icon && <span className="mr-2">{icon}</span>}
                {title}
            </h2>
            {children}
        </section>
    );

    const sectionComponents: Record<string, JSX.Element | null> = {
        profiles: profile?.length ? (
            <Section title="Profiles" icon={<User size={24} />}>
                <ul className="flex flex-wrap gap-4">
                    {profile.map((profile: { url: string | undefined; network: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; username: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
                        <a
                            key={index}
                            href={profile.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center bg-gray-100 p-3 rounded hover:bg-gray-200 transition-colors"
                        >
                            {hideIcons && (
                                <Globe
                                    color={theme?.primary}
                                    className="w-5 h-5 mr-2"
                                />
                            )}
                            <span>
                                {profile.network}: {profile.username}
                            </span>
                        </a>
                    ))}
                </ul>
            </Section>
        ) : null,

        summary: professionalSummary ? (
            <Section title="Summary" icon={<User size={24} />}>
                <div
                    dangerouslySetInnerHTML={{
                        __html: professionalSummary,
                    }}
                />
            </Section>
        ) : null,

        experience: experience?.length ? (
            <Section title="Experience" icon={<Briefcase size={24} />}>
                <div className=" space-y-3">
                    {experience.map((exp: { position: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; company: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; dateRange: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; location: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; description: any; url: string | undefined; urlTag: any; }, index: React.Key | null | undefined) => (
                        <div key={index}>
                            <h3 className="text-xl font-semibold">
                                {exp.position}
                            </h3>
                            <div className="flex justify-between text-gray-600">
                                <span>{exp.company}</span>
                                <span>{exp.dateRange}</span>
                            </div>
                            {exp.location && (
                                <p className="text-gray-600">{exp.location}</p>
                            )}
                            {exp.description && (
                                <div
                                    className="mt-2"
                                    dangerouslySetInnerHTML={{
                                        __html: exp.description,
                                    }}
                                />
                            )}
                            {exp.url && (
                                <a
                                    href={exp.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(
                                        `text-blue-600text-[${theme?.primary}] text-sm decoration-[${theme?.primary}]`,
                                        underlineLinks && "underline"
                                    )}
                                >
                                    {exp.urlTag || "Learn more"}
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </Section>
        ) : null,

        education: education?.length ? (
            <Section title="Education" icon={<GraduationCap size={24} />}>
                {education.map((edu: { institution: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; areaofstudy: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; dateRange: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; location: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; score: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; description: any; url: string | undefined; urlTag: any; }, index: React.Key | null | undefined) => (
                    <div key={index}>
                        <h3 className="text-xl font-semibold">
                            {edu.institution}
                        </h3>
                        {(edu.areaofstudy || edu.dateRange) && (
                            <div className="flex justify-between text-gray-600">
                                {edu.areaofstudy && (
                                    <span>{edu.areaofstudy}</span>
                                )}
                                {edu.dateRange && <span>{edu.dateRange}</span>}
                            </div>
                        )}

                        {edu.location && (
                            <p className="text-gray-600">{edu.location}</p>
                        )}
                        {edu.score && (
                            <p className="text-gray-600">Score: {edu.score}</p>
                        )}
                        {edu.description && (
                            <div
                                className="mt-2"
                                dangerouslySetInnerHTML={{
                                    __html: edu.description,
                                }}
                            />
                        )}
                        {edu.url && (
                            <a
                                href={edu.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    `text-blue-600text-[${theme?.primary}] text-sm decoration-[${theme?.primary}]`,
                                    underlineLinks && "underline"
                                )}
                            >
                                {edu.urlTag || "Learn more"}
                            </a>
                        )}
                    </div>
                ))}
            </Section>
        ) : null,

        projects: projects?.length ? (
            <Section title="Projects" icon={<Folder size={24} />}>
                {projects.map((project: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; dateRange: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; summary: any; url: string | undefined; urlTag: any; keywords: any[]; }, index: React.Key | null | undefined) => (
                    <div key={index}>
                        <h3 className="text-xl font-semibold">
                            {project.name}
                        </h3>
                        <p className="text-gray-600">{project.dateRange}</p>
                        {project.description && (
                            <p className="mt-2">{project.description}</p>
                        )}
                        {project.summary && (
                            <div
                                className="mt-2"
                                dangerouslySetInnerHTML={{
                                    __html: project.summary,
                                }}
                            />
                        )}
                        {project.url && (
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    `text-[${theme?.primary}] text-sm decoration-[${theme?.primary}]`,
                                    underlineLinks && "underline"
                                )}
                            >
                                {project.urlTag || "View project"}
                            </a>
                        )}
                        {project.keywords && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {project.keywords.map((keyword: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, kidx: React.Key | null | undefined) => (
                                    <span
                                    style={{
                                        color: theme?.text, 
                                        backgroundColor: `rgba(${hexToRgb(theme?.primary)}, 0.3)`,
                                    }}
                                        key={kidx}
                                        className="text-xs px-2 py-1 rounded"
                                    >
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </Section>
        ) : null,

        volunteer: volunteering?.length ? (
            <Section title="Volunteer Experience" icon={<Heart size={24} />}>
                {volunteering.map((vol: { organisation: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; position: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; dateRange: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; location: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; description: any; url: string | undefined; urlTag: any; }, index: React.Key | null | undefined) => (
                    <div key={index}>
                        <h3 className="text-xl font-semibold">
                            {vol.organisation}
                        </h3>

                        {(vol.position || vol.dateRange) && (
                            <div className="flex justify-between text-gray-600">
                                {vol.position && <span>{vol.position}</span>}
                                {vol.dateRange && <span>{vol.dateRange}</span>}
                            </div>
                        )}
                        {vol.location && (
                            <p className="text-gray-600">{vol.location}</p>
                        )}
                        {vol.description && (
                            <div
                                className="mt-2"
                                dangerouslySetInnerHTML={{
                                    __html: vol.description,
                                }}
                            />
                        )}
                        {vol.url && (
                            <a
                                href={vol.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    `text-blue-600text-[${theme?.primary}] text-sm decoration-[${theme?.primary}]`,
                                    underlineLinks && "underline"
                                )}
                            >
                                {vol.urlTag || "Learn more"}
                            </a>
                        )}
                    </div>
                ))}
            </Section>
        ) : null,

        references: references?.length ? (
            <Section title="References" icon={<Users size={24} />}>
                {references.map((ref: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; summary: any; url: string | undefined; urlTag: any; }, index: React.Key | null | undefined) => (
                    <div key={index} className="bg-gray-100 p-4 rounded">
                        <h3 className="font-semibold">{ref.name}</h3>
                        {ref.description && (
                            <p className="text-gray-600">{ref.description}</p>
                        )}
                        {ref.summary && (
                            <div
                                className="mt-2"
                                dangerouslySetInnerHTML={{
                                    __html: ref.summary,
                                }}
                            />
                        )}
                        {ref.url && (
                            <a
                                href={ref.url}
                                target="_blank"
                                rel="noopener noreferrer"

                                className={cn(
                                    `text-blue-600text-[${theme?.primary}] text-sm decoration-[${theme?.primary}]`,
                                    underlineLinks && "underline"
                                )}
                            >
                                {ref.urlTag || "Contact reference"}
                            </a>
                        )}
                    </div>
                ))}
            </Section>
        ) : null,

        skills: skills?.length ? (
            <Section title="Skills" icon={<Star size={24} />}>
                <div className="grid grid-cols-2 gap-2">
                    {skills.map((skill: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; level: number; description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; keywords: any[]; }, index: React.Key | null | undefined) => (
                        <div key={index} 
                        style={{
                            backgroundColor: `rgba(${hexToRgb(theme?.primary)}, 0.1)`,
                        }}
                        className="bg-gray-100 p-4 rounded">
                            <h3 className="font-semibold">{skill.name}</h3>
                            {skill.level > 0 && (
                                <div className="flex items-center mt-2">
                                    {skill.level > 0 &&
                                        [...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                color={theme?.primary}
                                                weight={
                                                    i < skill.level
                                                        ? "fill"
                                                        : "regular"
                                                }
                                                className="w-4 h-4"
                                            />
                                        ))}
                                </div>
                            )}

                            {skill.description && (
                                <p className="mt-2 text-sm">
                                    {skill.description}
                                </p>
                            )}
                            {skill.keywords && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {skill.keywords.map((keyword: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, kidx: React.Key | null | undefined) => (
                                        <span
                                            key={kidx}
                                            style={{
                                                color: theme?.text, 
                                                backgroundColor: `rgba(${hexToRgb(theme?.primary)}, 0.3)`,
                                            }}
                                            className="bg-gray-200 text-xs px-2 py-1 rounded"
                                        >
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </Section>
        ) : null,

        interests: interests?.length ? (
            <Section title="Interests" icon={<Heart size={24} />}>
                <div className="flex flex-wrap gap-2">
                    {interests.map((interest: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; keywords: any[]; }, index: React.Key | null | undefined) => (
                        <div key={index} className="bg-gray-100 p-4 rounded">
                            <div className="flex items-center">
                                <Heart
                                    color={theme?.primary}
                                    className="w-5 h-5 mr-2"
                                />
                                <h3 className="font-semibold">
                                    {interest.name}
                                </h3>
                            </div>
                            {interest.keywords && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {interest.keywords.map((keyword: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, kidx: React.Key | null | undefined) => (
                                        <span
                                            key={kidx}
                                            style={{
                                                color: theme?.text, 
                                                backgroundColor: `rgba(${hexToRgb(theme?.primary)}, 0.3)`,
                                            }}
                                            className=" text-xs px-2 py-1 rounded"
                                        >
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </Section>
        ) : null,

        certifications: certifications?.length ? (
            <Section title="Certifications" icon={<Trophy size={24} />}>
                {certifications.map((cert: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; issuer: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; dateRange: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; url: string | undefined; urlTag: any; description: any; }, index: React.Key | null | undefined) => (
                    <div key={index} className="flex items-start space-x-2">
                        <div className="w-6 h-6">
                            <Certificate
                                color={theme?.primary}
                                className="w-6 h-6 mr-4 "
                            />
                        </div>
                        <div>
                            <h3 className="font-semibold">{cert.name}</h3>
                            {cert.issuer && (
                                <p className="text-gray-600">{cert.issuer}</p>
                            )}
                            {cert.dateRange && (
                                <p className="text-gray-600">
                                    {cert.dateRange}
                                </p>
                            )}

                            {cert.url && (
                                <a
                                    href={cert.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(
                                        `text-blue-600text-[${theme?.primary}] text-sm decoration-[${theme?.primary}]`,
                                        underlineLinks && "underline"
                                    )}
                                >
                                    {cert.urlTag || "View certificate"}
                                </a>
                            )}
                            {cert.description && (
                                <div
                                    className="mt-2"
                                    dangerouslySetInnerHTML={{
                                        __html: cert.description,
                                    }}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </Section>
        ) : null,

        awards: awards?.length ? (
            <Section title="Awards" icon={<Trophy size={24} />}>
                {awards.map((award: { title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; award: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; dateRange: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; description: any; url: string | undefined; urlTag: any; }, index: React.Key | null | undefined) => (
                    <div key={index} className="flex items-start  space-x-2 ">
                        <div className="w-6 h-6">
                            <Medal
                                color={theme?.primary}
                                className="w-6 h-6 mr-4"
                            />
                        </div>
                        <div>
                            <h3 className="font-semibold">{award.title}</h3>
                            {award.award && (
                                <p className="text-gray-600">{award.award}</p>
                            )}
                            <p className="text-gray-600">{award.dateRange}</p>
                            {award.description && (
                                <div
                                    className="mt-2"
                                    dangerouslySetInnerHTML={{
                                        __html: award.description,
                                    }}
                                />
                            )}
                            {award.url && (
                                <a
                                    href={award.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(
                                        `text-blue-600text-[${theme?.primary}] text-sm decoration-[${theme?.primary}]`,
                                        underlineLinks && "underline"
                                    )}
                                >
                                    {award.urlTag || "Learn more"}
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </Section>
        ) : null,

        publications: publications?.length ? (
            <Section title="Publications" icon={<Book size={24} />}>
                {publications.map((pub: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; publisher: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; url: string | undefined; }, index: React.Key | null | undefined) => (
                    <div key={index} className="mb-2">
                        <h3 className={`font-semibold ${text}`}>{pub.name}</h3>
                        <p className="text-sm">{pub.publisher}</p>
                        {pub.url && (
                            <a
                                href={pub.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${theme?.primary} ${
                                    underlineLinks ? "underline" : ""
                                } text-sm`}
                            >
                                View Publication
                            </a>
                        )}
                    </div>
                ))}
            </Section>
        ) : null,

        languages: languages?.length ? (
            <Section title="Languages" icon={<Globe size={24} />}>
                <div className="grid grid-cols-2 gap-2">
                    {languages.map((lang: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; level: number; description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
                        <div key={index} className="bg-gray-100 p-4 rounded">
                            <h3 className="font-semibold">{lang.name}</h3>
                            {lang.level > 0 && (
                                <div className="flex items-center mt-2">
                                    {lang.level > 0 &&
                                        [...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                color={theme?.primary}
                                                weight={
                                                    i < lang.level
                                                        ? "fill"
                                                        : "regular"
                                                }
                                                className="w-4 h-4"
                                            />
                                        ))}
                                </div>
                            )}

                            {lang.description && (
                                <p className="mt-2 text-sm">
                                    {lang.description}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </Section>
        ) : null,
    };

    return (
        <IconContext.Provider value={{ weight: "bold" }}>
            <main
                className={`max-w-4xl`}
                style={{
                    color: theme?.text, 
                    backgroundColor: theme?.background, 
                }}
            >
                <header className="bg-black text-white p-5">
                    <div className="max-w-3xl">
                        <h1 className="text-3xl font-bold">{fullName}</h1>
                        <p className="text-gray-300 mt-1">{headline}</p>

                        <div className="flex flex-wrap gap-4 mt-4 text-sm">
                            {location && (
                                <div className="flex items-center gap-1">
                                    {hideIcons && (
                                        <MapPin
                                            color={theme?.primary}
                                            className="w-4 h-4"
                                        />
                                    )}
                                    <span>{location}</span>
                                </div>
                            )}
                            {phone && (
                                <div className="flex items-center gap-1">
                                    {hideIcons && (
                                        <Phone
                                            color={theme?.primary}
                                            className="w-4 h-4"
                                        />
                                    )}
                                    <a href={`tel:${phone}`}>{phone}</a>
                                </div>
                            )}
                            {email && (
                                <div className="flex items-center gap-1">
                                    {hideIcons && (
                                        <Envelope
                                            color={theme?.primary}
                                            className="w-4 h-4"
                                        />
                                    )}
                                    <a href={`mailto:${email}`}>{email}</a>
                                </div>
                            )}
                            {website && (
                                <div className="flex items-center gap-1">
                                    {hideIcons && (
                                        <Link
                                            color={theme?.primary}
                                            className="w-4 h-4"
                                        />
                                    )}
                                    <a
                                        href={website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {urlTag || website}
                                    </a>
                                </div>
                            )}
                            {customFields?.map((field: any, index: number) => (
                                <p
                                    key={index}
                                    className="flex items-center gap-1"
                                >
                                    {hideIcons && (
                                        <Globe
                                            color={theme?.primary}
                                            className="w-4 h-4"
                                        />
                                    )}
                                    <span>
                                        <span className="font-medium">
                                            {field.name} :
                                        </span>{" "}
                                        {field.value}
                                    </span>
                                    {index < (customFields.length ?? 0) - 1 && (
                                        <span> </span>
                                    )}
                                </p>
                            ))}
                        </div>
                    </div>
                </header>
                <div className="p-5">
                    {layout.map((section: any, index: number) => (
                        <React.Fragment key={index}>
                            {
                                sectionComponents[
                                    section as keyof typeof sectionComponents
                                ]
                            }
                        </React.Fragment>
                    ))}
                </div>
            </main>
        </IconContext.Provider>
    );
};

export default Template02;
