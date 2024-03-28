import ProjectCard from "@/components/ProjectCard";
import React from "react";
const projects = [
  {
    image: "/project1.jpg",
    description:
      "Located in the heart of Victoria Island, this modern high-rise condominium offers breathtaking views of the Lagos skyline.",
    name: "Hove Estate",
    address: "25A Adeola Odeku Street, Victoria Island, Lagos, Nigeria",
  },
  {
    image: "/project2.jpg",
    description:
      "Nestled in the vibrant district of Ikeja, this charming residential complex offers a perfect blend of comfort and convenience. ",
    name: "Prime Estate",
    address: "10 Allen Avenue, Ikeja, Lagos, Nigeria",
  },
  {
    image: "/project3.jpg",
    description:
      "Embrace urban living at its finest in this stylish apartment complex situated along Toyin Street. ",
    name: "Havannah hills",
    address: "7 Toyin Street, Ikeja, Lagos, Nigeria",
  },
  {
    image: "/project1.jpg",
    description:
      "Experience the epitome of luxury living in this exclusive gated community nestled along Ojuelegba Road.",
    name: "Peace Estate",
    address: "3B Ojuelegba Road, Surulere, Lagos, Nigeria",
  },
];

const Projects = () => {
  return (
    <div className=" px-8 py-5 bg-gray-50">
      <div className=" flex flex-row justify-between py-4">
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
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-primary-orange px-10 py-2.5 font-medium text-white"
          >
            Create
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 text-primary-blue lg:grid-cols-2 overflow-auto gap-x-10 gap-y-8 justify-between w-full mt-4">
        {projects.map((home, index) => (
          <div key={index} className="w-full">
            <ProjectCard
              name={home?.name}
              description={home?.description}
              image={home?.image}
              address={home?.address}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
