
import {
    Briefcase,
    GraduationCap,
    Star,
    Globe,
    MapPin,
    Envelope,
    Phone,
    Link,
    IconContext
} from "@phosphor-icons/react";
import React from "react";

const Template03 = ({ resumedata }: { resumedata: any }) => {
    const {
        picture = "",
        fullName = "",
        headline = "",
        email = "",
        website = "",
        urlTag = "",
        phone = "",
        location = "",
        experience,
        professionalSummary,
        education,
        skills,
        background = "bg-white",
        text = "text-black",
        primary = "text-blue-600",
        hideIcons = true,
        layout = [
            "summary",
            "experience", 
            "education", 
            "skills"
        ]
    } = resumedata;

    const Section: React.FC<{
        title?: string;
        icon?: React.ReactNode;
        children: React.ReactNode;
    }> = ({ title, icon, children }) => (
        <section className="mb-6">
            <h2 className={`text-2xl font-bold uppercase tracking-wider border-b-2 pb-2 mb-4 ${text}`}>
                {hideIcons && icon && <span className="mr-2">{icon}</span>}
                {title}
            </h2>
            {children}
        </section>
    );

    const sectionComponents: Record<string, JSX.Element | null> = {
        summary: professionalSummary ? (
            <div className="text-center italic text-gray-700 mb-6">
                <p>{professionalSummary}</p>
            </div>
        ) : null,

        experience: experience?.length ? (
            <Section title="Professional Experience" icon={<Briefcase size={24} />}>
                {experience.map((exp, index) => (
                    <div key={index} className="mb-4">
                        <div className="flex justify-between">
                            <h3 className="text-xl font-semibold">{exp.position}</h3>
                            <span className="text-gray-600">{exp.dateRange}</span>
                        </div>
                        <p className="text-gray-700 mb-2">{exp.company} | {exp.location}</p>
                        {exp.description && (
                            <ul className="list-disc list-inside text-gray-600">
                                {exp.description.split('\n').map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </Section>
        ) : null,

        education: education?.length ? (
            <Section title="Education" icon={<GraduationCap size={24} />}>
                {education.map((edu, index) => (
                    <div key={index} className="mb-4">
                        <div className="flex justify-between">
                            <h3 className="text-xl font-semibold">{edu.institution}</h3>
                            <span className="text-gray-600">{edu.dateRange}</span>
                        </div>
                        <p className="text-gray-700">{edu.areaofstudy}</p>
                        {edu.score && <p className="text-gray-600">GPA: {edu.score}</p>}
                    </div>
                ))}
            </Section>
        ) : null,

        skills: skills?.length ? (
            <Section title="Skills" icon={<Star size={24} />}>
                <div className="grid grid-cols-2 gap-2">
                    {skills.map((skill, index) => (
                        <div key={index}>
                            <h4 className="font-semibold">{skill.name}</h4>
                            {skill.keywords && (
                                <div className="text-sm text-gray-600">
                                    {skill.keywords.join(', ')}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </Section>
        ) : null,
    };

    return (
        <IconContext.Provider value={{ weight: "bold" }}>
            <main className={`max-w-4xl mx-auto p-8 ${background}`}>
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-2">{fullName}</h1>
                    <h2 className="text-xl text-gray-700 mb-4">{headline}</h2>
                    
                    <div className="flex justify-center gap-4 text-sm">
                        {email && (
                            <div className="flex items-center gap-1">
                                <Envelope color={primary} />
                                <a href={`mailto:${email}`}>{email}</a>
                            </div>
                        )}
                        {phone && (
                            <div className="flex items-center gap-1">
                                <Phone color={primary} />
                                <a href={`tel:${phone}`}>{phone}</a>
                            </div>
                        )}
                        {location && (
                            <div className="flex items-center gap-1">
                                <MapPin color={primary} />
                                <span>{location}</span>
                            </div>
                        )}
                        {website && (
                            <div className="flex items-center gap-1">
                                <Link color={primary} />
                                <a href={website} target="_blank" rel="noopener noreferrer">
                                    {urlTag || website}
                                </a>
                            </div>
                        )}
                    </div>
                </header>

                <div>
                    {layout.map((section: any, index: number) => (
                        <React.Fragment key={index}>
                            {sectionComponents[section as keyof typeof sectionComponents]}
                        </React.Fragment>
                    ))}
                </div>
            </main>
        </IconContext.Provider>
    );
};

export default Template03;