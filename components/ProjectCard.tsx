"use client";
import Image from "next/image";
import React from "react";
import { MoveRight } from "lucide-react";
import useModal from "./hooks/useModal";

interface ProjectcardProps {
  image: string;
  description: string;
  name: string;
  address: string;
}

const ProjectCard: React.FC<ProjectcardProps> = ({
  image,
  description,
  name,
  address,
}) => {
  const { openModal, isOpen, closeModal } = useModal();

  return (
    <>
      <div
        onClick={openModal}
        className="flex flex-col overflow-hidden cursor-pointer relative text-primary-blue group"
      >
        <div className="flex flex-1">
          <Image
            width={500}
            height={500}
            className="object-cover w-full h-[500px]"
            alt="Home"
            src={image}
          />
        </div>
        <div className="py-4 flex flex-col group-hover:text-blue-900 group-hover:bg-opacity-35  group-hover:bg-blue-50 gap-y-1 border-b border-b-primary-blue border-opacity-50">
          <p className="text-2xl font-semibold uppercase ">{name}</p>
          <p className="font-semibold tracking-tight text-[15px] mt-1">
            {address}
          </p>
          <p className="font-light mt-1 text-sm leading-[22px]">
            {description}
          </p>
          <button className="w-full flex justify-between pt-3">
            <p className="uppercase font-medium">View project</p>
            <MoveRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
