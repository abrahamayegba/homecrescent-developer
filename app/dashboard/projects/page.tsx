"use client";
import ProjectCard from "@/components/ProjectCard";
import Loader2 from "@/components/loading/Loader2";
import {
  useGetDeveloperCompanyByUserQuery,
  useGetProjectsByCompanyQuery,
  useGetUserByIdQuery,
} from "@/src/generated/graphql";
import Link from "next/link";
import React from "react";
import { BsBuildingDash } from "react-icons/bs";

const Projects = () => {
  const { loading } = useGetUserByIdQuery();
  const getDeveloperCompanyByUser = useGetDeveloperCompanyByUserQuery();
  const developerCompanyId =
    getDeveloperCompanyByUser.data?.getDeveloperCompanyByUser?.id;
  const getProjectsByCompany = useGetProjectsByCompanyQuery({
    variables: {
      companyId: developerCompanyId!,
    },
  });

  const projectsByCompany =
    getProjectsByCompany?.data?.getProjectsByCompany?.projectsByCompany;

  const numberOfProjects = projectsByCompany?.length ?? 0;

  const queriesLoading =
    loading ||
    getDeveloperCompanyByUser.loading ||
    getProjectsByCompany.loading;

  return (
    <>
      {queriesLoading ? (
        <Loader2 />
      ) : (
        <div className=" px-8 py-5 bg-gray-50 h-screen">
          <div className=" flex flex-row justify-between items-center py-4">
            <div className="flex items-center">
              <div className="flex items-start flex-col">
                <h1 className=" text-2xl font-bold leading-7 text-primary-blue sm:truncate sm:leading-9">
                  Projects
                </h1>
                <p className="flex items-center text-[15px] font-light mt-1 capitalize text-gray-500 sm:mr-6">
                  Manage your projects
                </p>
              </div>
            </div>
            <div>
              <Link href="/dashboard/projects/createproject">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-primary-orange px-10 py-2.5 font-medium text-white"
                >
                  Create
                </button>
              </Link>
            </div>
          </div>
          {numberOfProjects == 0 ? (
            <div className="flex py-40 items-center justify-center text-primary-blue rounded-lg bg-white mt-4 border border-gray-900/10">
              <div className="flex flex-col items-center gap-y-3 text-center">
                <span className=" bg-gray-50 p-6 rounded-full">
                  <BsBuildingDash className=" w-8 h-8" />
                </span>
                <h3 className="text-[22px] tracking-tight">
                  You have no projects
                </h3>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 text-primary-blue lg:grid-cols-2 overflow-auto gap-x-10 gap-y-8 justify-between w-full mt-4">
              {projectsByCompany?.map((project) => (
                <Link
                  key={project?.id}
                  href={`/dashboard/projects/viewproject?projectId=${project?.id}`}
                >
                  <div key={project?.id} className="w-full">
                    <ProjectCard
                      name={project?.projectName!}
                      description={project?.description!}
                      projectMedia={project?.projectsMedia}
                      address={project?.address!}
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Projects;
