import React, { useState } from "react";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import DialogComponent from "./ats-dialog";

const AccordionComponent = ({ data }: { data: any }) => {

    const getColor = (score: number): string => {
        if (score >= 90) return '#228B22' // Dark Green for excellent scores
        if (score >= 75) return '#4CAF50' // Green for very good scores
        if (score >= 60) return '#FFD700' // Gold for good scores
        if (score >= 40) return '#FFA500' // Orange for average scores
        if (score >= 20) return '#FF6347' // Tomato for below-average scores
        return '#FF4D4D' // Red for poor scores
      }
    return (
        <Accordion type="single" collapsible className="w-full">
            {/* Section-wise Scores section  */}
            <AccordionItem
                value="section-scores"
                className="border-b border-white/40"
            >
                <AccordionTrigger className="text-white text-xl">
                    Section-wise Scores
                </AccordionTrigger>
                <AccordionContent>
                    {data?.section_wise_scores &&
                    typeof data.section_wise_scores === "object" ? (
                        Object.entries(data.section_wise_scores).map(
                            ([section, scores]: [string, any]) => (
                                <div
                                    key={section}
                                    className=" mb-1 p-2 px-4 bg-secondary/30"
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold capitalize">
                                            {section.replace("_", " ")}
                                        </h3>

                                        <DialogComponent
                                            title={`${section.replace(
                                                "_",
                                                " "
                                            )} Details`}
                                        >
                                            <div>
                                                {Object.entries(scores).map(
                                                    ([subSection, score]: [
                                                        string,
                                                        any
                                                    ]) => {
                                                        
                                                        const color = getColor(score * 10)
                                                        return(
                                                            <div
                                                            key={subSection}
                                                            className="flex justify-between items-center mt-1"
                                                        >
                                                            <span className="capitalize text-gray-300">
                                                                {subSection.replace(
                                                                    "_",
                                                                    " "
                                                                )}
                                                            </span>
                                                              <Progress
                                                                    value={
                                                                        score *
                                                                        10
                                                                    }
                                                                    className="w-1/2"
                                                                    indicatorColor={
                                                                        color
                                                                    }
                                                                />
                                                        </div>
                                                    )}
                                                )}
                                            </div>
                                        </DialogComponent>
                                    </div>
                                </div>
                            )
                        )
                    ) : (
                        <p className="text-gray-300">
                            No Section-wise Scores available.
                        </p>
                    )}
                </AccordionContent>
            </AccordionItem>

            {/* Recommendations Section  */}
            <AccordionItem
                value="recommendations"
                className="border-b border-white/40"
            >
                <AccordionTrigger className="text-white text-xl">
                    Section-wise Recommendations
                </AccordionTrigger>
                <AccordionContent>
                    {data?.section_wise_recommendations &&
                    typeof data.section_wise_recommendations === "object" ? (
                        Object.entries(data.section_wise_recommendations).map(
                            ([section, content]: [string, any]) => (
                                <div
                                    key={section}
                                    className=" mb-1 p-2 px-4 bg-secondary/30"
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold capitalize ">
                                            {section}
                                        </h3>
                                        <DialogComponent
                                            title={`${
                                                section
                                                    .replace("_", " ")
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                section
                                                    .replace("_", " ")
                                                    .slice(1)
                                            } Details`}
                                        >
                                            <div>
                                                {content.current_status && (
                                                    <p className="text-gray-300">
                                                        <strong className="text-white">
                                                            Current Status:
                                                        </strong>{" "}
                                                        {content.current_status}
                                                    </p>
                                                )}
                                                {content?.recommendations
                                                    .length > 0 && (
                                                    <div className="mt-2">
                                                        <strong className="text-white">
                                                            Recommendations
                                                        </strong>
                                                        <ul className="list-disc list-inside text-gray-300 mt-1">
                                                            {content.recommendations.map(
                                                                (
                                                                    rec: string,
                                                                    index: number
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {rec}
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}
                                                {content.strength &&
                                                    content.strength.length >
                                                        0 && (
                                                        <div className="mt-2">
                                                            <strong className="text-white">
                                                                Strength
                                                            </strong>
                                                            <ul className="list-disc list-inside text-gray-300 mt-1">
                                                                {content.strength.map(
                                                                    (
                                                                        rec: string,
                                                                        index: number
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            {
                                                                                rec
                                                                            }
                                                                        </li>
                                                                    )
                                                                )}
                                                            </ul>
                                                        </div>
                                                    )}
                                                {content.improvement_areas &&
                                                    content?.improvement_areas
                                                        .length > 0 && (
                                                        <div className="mt-2">
                                                            <strong className="text-white">
                                                                Improvement
                                                                Areas
                                                            </strong>
                                                            <ul className="list-disc list-inside text-gray-300 mt-1">
                                                                {content.improvement_areas.map(
                                                                    (
                                                                        rec: string,
                                                                        index: number
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            {
                                                                                rec
                                                                            }
                                                                        </li>
                                                                    )
                                                                )}
                                                            </ul>
                                                        </div>
                                                    )}
                                            </div>
                                        </DialogComponent>
                                    </div>
                                </div>
                            )
                        )
                    ) : (
                        <p className="text-gray-300">
                            No recommendations available.
                        </p>
                    )}
                </AccordionContent>
            </AccordionItem>

            {/* Keyword Highlights Section  */}
            <AccordionItem
                value="highlights"
                className="border-b border-white/40"
            >
                <AccordionTrigger className="text-white text-xl">
                    Keyword Highlights
                </AccordionTrigger>
                <AccordionContent>
                    <div className=" mb-1 p-2 px-4 bg-secondary/30">
                        <div className="flex justify-between items-center">
                            <strong className="text-white">
                                Matched Keywords:
                            </strong>
                            <DialogComponent title="Keyword Highlights">
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {data?.keyword_highlights &&
                                    data.keyword_highlights.matched_keywords > 0 ? (
                                        data.keyword_highlights.matched_keywords.map(
                                            (
                                                keyword: string,
                                                index: number
                                            ) => (
                                                <span
                                                    key={index}
                                                    className=" border bg-white text-black rounded-[2px] px-2 py-1 "
                                                >
                                                    {keyword}
                                                </span>
                                            )
                                        )
                                    ) : (
                                        <p className="text-gray-300">
                                            No matched keywords available.
                                        </p>
                                    )}
                                </div>
                            </DialogComponent>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>

            {/* Final recommendations section  */}
            <AccordionItem
                value="final-recommendation"
                className="border-b border-white/40"
            >
                <AccordionTrigger className="text-white text-xl">
                    Final Recommendation
                </AccordionTrigger>
                <AccordionContent>
                    <div className=" mb-1 p-2 px-4 bg-secondary/30">
                        <div className="flex justify-between items-center">
                            {data?.final_recommendation ? (
                                <p className="font-semibold text-emerald-400">
                                    {data.final_recommendation}
                                </p>
                            ) : (
                                <p className="text-gray-300">
                                    No final recommendation available.
                                </p>
                            )}
                            <DialogComponent title="Final Recommendation">
                                <div>
                                    {data?.final_recommendation && (
                                        <p className="font-semibold text-emerald-400 mb-2">
                                            {data.final_recommendation}
                                        </p>
                                    )}

                                    {data?.critical_observations &&
                                        data.critical_observations.length >
                                            0 && (
                                            <>
                                                <h4 className="font-semibold text-blue-400 mt-4 mb-2">
                                                    Critical Observations:
                                                </h4>
                                                <ul className="list-disc list-inside text-gray-300">
                                                    {data.critical_observations.map(
                                                        (
                                                            strength: string,
                                                            index: number
                                                        ) => (
                                                            <li key={index}>
                                                                {strength}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </>
                                        )}

                                    {data?.unique_differentiators &&
                                        data.unique_differentiators.length >
                                            0 && (
                                            <>
                                                <h4 className="font-semibold text-blue-400 mt-4 mb-2">
                                                    Unique Differentiators:
                                                </h4>
                                                <ul className="list-disc list-inside text-gray-300">
                                                    {data.unique_differentiators.map(
                                                        (
                                                            strength: string,
                                                            index: number
                                                        ) => (
                                                            <li key={index}>
                                                                {strength}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </>
                                        )}

                                    {data?.potential_career_paths &&
                                        data.potential_career_paths.length >
                                            0 && (
                                            <>
                                                <h4 className="font-semibold text-blue-400 mt-4 mb-2">
                                                    Potential Career Paths:
                                                </h4>
                                                <ul className="list-disc list-inside text-gray-300">
                                                    {data.potential_career_paths.map(
                                                        (
                                                            strength: string,
                                                            index: number
                                                        ) => (
                                                            <li key={index}>
                                                                {strength}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </>
                                        )}

                                    {data?.professional_strengths &&
                                        data.professional_strengths.length >
                                            0 && (
                                            <>
                                                <h4 className="font-semibold text-blue-400 mt-4 mb-2">
                                                    Professional Strengths:
                                                </h4>
                                                <ul className="list-disc list-inside text-gray-300">
                                                    {data.professional_strengths.map(
                                                        (
                                                            strength: string,
                                                            index: number
                                                        ) => (
                                                            <li key={index}>
                                                                {strength}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </>
                                        )}

                                    {data?.potential_growth_areas &&
                                        data.potential_growth_areas.length >
                                            0 && (
                                            <>
                                                <h4 className="font-semibold text-blue-400 mt-4 mb-2">
                                                    Potential Growth Areas:
                                                </h4>
                                                <ul className="list-disc list-inside text-gray-300">
                                                    {data.potential_growth_areas.map(
                                                        (
                                                            area: string,
                                                            index: number
                                                        ) => (
                                                            <li key={index}>
                                                                {area}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </>
                                        )}

                                    {data?.actionable_tips &&
                                        data.actionable_tips.length > 0 && (
                                            <>
                                                <h4 className="font-semibold text-blue-400 mt-4 mb-2">
                                                    Actionable Tips:
                                                </h4>
                                                <ul className="list-disc list-inside text-gray-300">
                                                    {data.actionable_tips.map(
                                                        (
                                                            tip: string,
                                                            index: number
                                                        ) => (
                                                            <li key={index}>
                                                                {tip}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </>
                                        )}
                                </div>
                            </DialogComponent>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default AccordionComponent;
