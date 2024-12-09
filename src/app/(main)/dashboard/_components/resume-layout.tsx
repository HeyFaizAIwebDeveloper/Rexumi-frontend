import moment from "moment";
import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/ui/magic-card";
import {
    Cards,
    DotsThreeVertical,
    FolderOpen,
    PencilSimple,
    Plus,
    TrashSimple,
} from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { ResumeCreateDialog } from "./resume-dialog-card";
import { useRouter } from "next/navigation";
import ResumeDropdownMenu from "./resume-dropdownMenu";
import { useResumeContext } from "@/contexts/ResumeContext";
import { Skeleton } from "@/components/ui/skeleton";

interface Resume {
    _id: string;
    name: string;
    updatedAt: string;
}

interface ResumeLayoutProps {
    resume: any;
}

const ResumeGridLayout = ({ resume }: ResumeLayoutProps) => {
    const { theme } = useTheme();
    const [showSkeleton, setShowSkeleton] = useState(true);
    const { deleteResume } = useResumeContext();
    const router = useRouter();

    useEffect(() => {
        if (resume.length === 0) {
            const timer = setTimeout(() => {
                setShowSkeleton(false);
            }, 2000);
            return () => clearTimeout(timer);
        } else {
            setShowSkeleton(true); // Reset if resumes are available
        }
    }, [resume]);

    const onDeleteConfirm = (id: string) => {
        deleteResume(id);
    };
    const onClick = (id: string) => {
        router.push(`/builder/${id}`);
    };
    return (
        <main className="lg:px-6 lg:py-10 p-6 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-6">
                <ResumeCreateDialog>
                    <MagicCard
                        className="max-h-72 w-full flex justify-center items-center rounded-none cursor-pointer border-none flex-col shadow-2xl whitespace-nowrap text-4xl relative"
                        gradientColor={
                            theme === "dark" ? "#D9D9D955" : "#262626"
                        }
                    >
                        <div className="relative w-full h-72 lg:w-52  flex flex-col justify-end p-4">
                            <div className="absolute inset-0 flex justify-center items-center">
                                <Plus size={80} weight="thin" />
                            </div>
                            <div className=" select-none">
                                <h2 className="text-base">
                                    Create a new Resume
                                </h2>
                                <p className="text-xs  font-thin text-white/50">
                                    start building from scratch
                                </p>
                            </div>
                        </div>
                    </MagicCard>
                </ResumeCreateDialog>

                {showSkeleton && resume.length === 0
                    ? Array.from({ length: 4 }).map((_, index) => (
                          <div
                              key={index}
                              className="flex flex-col space-y-3 w-full h-72 lg:w-52 "
                          >
                              <Skeleton className="h-[230px]  rounded-xl" />
                              <div className="space-y-2">
                                  <Skeleton className="h-4 w-[180px]" />
                                  <Skeleton className="h-4 w-[150px]" />
                              </div>
                          </div>
                      ))
                    : resume.map((res: any, index: number) => (
                          <MagicCard
                              key={index}
                              className="h-72 w-full flex justify-end items-center rounded-none cursor-pointer border-none flex-col shadow-2xl whitespace-nowrap text-4xl relative"
                              gradientColor={
                                  theme === "dark" ? "#262626" : "#D9D9D955"
                              }
                          >
                              <div className="relative h-72 w-52 flex flex-col justify-end p-2">
                                  <div className="absolute top-4 right-4 flex size-5 items-center justify-center p-2">
                                      <ResumeDropdownMenu
                                          onDeleteConfirm={() =>
                                              onDeleteConfirm(res._id)
                                          }
                                          onOpen={() => onClick(res._id)}
                                      />
                                  </div>
                                  <div
                                      onClick={() => onClick(res._id)}
                                      className="hover:bg-secondary/40 ease-in-out duration-500 rounded-md p-2"
                                  >
                                      <h2 className="text-base text-ellipsis">
                                          {res.name}
                                      </h2>
                                      <p className="text-xs font-thin text-white/50">
                                          Last updated{" "}
                                          {moment(res.updatedAt).fromNow()}
                                      </p>
                                  </div>
                              </div>
                          </MagicCard>
                      ))}
            </div>
        </main>
    );
};

const ResumeListLayout = ({ resume }: ResumeLayoutProps) => {
    const { deleteResume } = useResumeContext();
    const [showSkeleton, setShowSkeleton] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (resume.length === 0) {
            const timer = setTimeout(() => {
                setShowSkeleton(false);
            }, 2000);
            return () => clearTimeout(timer);
        } else {
            setShowSkeleton(true); // Reset if resumes are available
        }
    }, [resume]);

    const onDeleteConfirm = (id: string) => {
        deleteResume(id);
    };
    const onClick = (id: string) => {
        router.push(`/builder/${id}`);
    };

    return (
        <main className="lg:px-6 lg:py-10 p-6">
            <div className="grid gap-y-2">
                <ResumeCreateDialog>
                    <div className="flex cursor-pointer items-center rounded p-4 transition-colors hover:bg-secondary/30">
                        <div className="flex w-full items-center justify-between">
                            <div className="flex items-center space-x-4">
                                {/* Icon  */}
                                <div className="flex size-5 items-center justify-center">
                                    <Plus size={80} weight="thin" />
                                </div>
                                <h2 className="w-[220px] truncate font-medium lg:w-[320px]">
                                    Create a new resume
                                </h2>
                                <p className="hidden text-xs opacity-75 md:block">
                                    Start building from scratch
                                </p>
                            </div>
                        </div>
                    </div>
                </ResumeCreateDialog>

                {showSkeleton && resume.length === 0
                    ? Array.from({ length: 4 }).map((_, index) => (
                          <Skeleton key={index} className="w-full h-12 p-4 rounded-md" />
                      ))
                    : resume.map((res: any) => (
                          <div
                              key={res._id} // Use the unique _id as the key
                              className="flex cursor-pointer items-center rounded p-4 transition-colors hover:bg-secondary/30"
                          >
                              <div
                                  onClick={() => onClick(res._id)}
                                  className="flex w-full items-center justify-between"
                              >
                                  <div className="flex items-center space-x-4">
                                      <div className="flex size-5 items-center justify-center"></div>
                                      <h2 className="w-[220px] text-ellipsis truncate font-medium lg:w-[320px]">
                                          {res.name}
                                      </h2>
                                      <p className="hidden text-xs opacity-75 md:block">
                                          Last updated{" "}
                                          {moment(res.updatedAt).fromNow()}
                                      </p>
                                  </div>
                                  <div className="flex size-5 items-center justify-center">
                                      <ResumeDropdownMenu
                                          onDeleteConfirm={() =>
                                              onDeleteConfirm(res._id)
                                          }
                                          onOpen={() => onClick(res._id)}
                                      />
                                  </div>
                              </div>
                          </div>
                      ))}
            </div>
        </main>
    );
};
export { ResumeGridLayout, ResumeListLayout };
