"use client"

import React, { useEffect, useState } from "react";
import ResumeHeader from "../_components/editor/navbar/edit-header";
import LeftSidebar from "../_components/leftSidebar/leftSidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { RightSidebar } from "../_components/rightSidebar/rightSidebar";
import ResumeBuilder from "@/components/global/resumeBuilder";
import { useToast } from "@/hooks/use-toast";
import { useResumeContext } from "@/contexts/ResumeContext";

export default function page({ params }: { params: { id: string } }) {

  const [isClient, setIsClient] = useState(false);
    const [hasFetchedResume, setHasFetchedResume] = useState(false);
    const [resumeName, setResumeName] = useState("");
    const { toast } = useToast();

    const { resumeData, setResumeData, getResumeData, getResumeById } = useResumeContext();

    // Unwrap params
    const resumeId = params.id;

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
      const fetchResumeData = async () => {
          if (resumeId && !hasFetchedResume) {
              try {
                  const resume = await getResumeById(resumeId);
                  if (resume) {
                      setResumeName(resume.name); // Update resumeData with fetched resume
                      setHasFetchedResume(true); // Mark as fetched
                  }
                  await getResumeData(resumeId);
              } catch (error) {
                  toast({
                      variant: "destructive",
                      title: "Error fetching resume data:",
                      description: `${error}`,
                  });
              }
          }
      };

      fetchResumeData();
  }, [resumeId, hasFetchedResume, getResumeById, setResumeData]);
    
    return (
        <>
            <ResumeHeader name={resumeName} />
            <main>
                <LeftSidebar />
                {resumeData ? (
                    <ResumeBuilder />
                ) : (
                    <div className=" h-full w-full flex  gap-3 py-5 px-20">
                        <Skeleton className="h-[calc(100vh-130px)] w-1/2 rounded-xl" />

                        <Skeleton className="h-[calc(100vh-130px)] w-1/2 rounded-xl" />
                    </div>
                )}

                <RightSidebar />
            </main>
        </>
    );
}

