"use client";
import Image from "next/image";
import React from "react";
import { MoveRight } from "lucide-react";
import useModal from "./hooks/useModal";

interface ProjectMedia {
  __typename?: string | undefined;
  id?: string | null | undefined;
  mediaUrl?: string | null | undefined;
  projectMediaCategory?:
    | {
        __typename?: string | undefined;
        mediaCategory?: string | null | undefined;
      }
    | null
    | undefined;
}

interface ProjectProps {
  projectMedia: (ProjectMedia | null)[] | null | undefined;
  address: string;
  name: string;
  description: string;
}

const ProjectCard: React.FC<ProjectProps> = ({
  projectMedia,
  address,
  name,
  description,
}) => {
  const { openModal, isOpen, closeModal } = useModal();

  const bannerMedia = projectMedia?.find(
    (media) => media?.projectMediaCategory?.mediaCategory === "Banner"
  );
  const bannerMediaUrl = bannerMedia?.mediaUrl || "";

  return (
    <>
      <div
        onClick={openModal}
        className="flex flex-col overflow-hidden cursor-pointer relative text-primary-blue group"
      >
        <div className="flex flex-1">
          {bannerMediaUrl && (
            <Image
              width={500}
              height={500}
              className="object-cover w-full h-[500px]"
              alt="Home"
              src={bannerMediaUrl}
            />
          )}
        </div>
        <div className="py-4 flex flex-col group-hover:text-blue-900 group-hover:bg-opacity-35  group-hover:bg-blue-50 gap-y-1 border-b border-b-primary-blue border-opacity-50">
          <p className="text-2xl font-semibold uppercase ">{name}</p>
          <p className="font-semibold tracking-tight text-[15px] mt-1">
            {address}
          </p>
          <p
            className="font-light mt-1 text-sm leading-[22px] h-[44px] overflow-hidden overflow-ellipsis"
            style={{ maxHeight: "44px", lineHeight: "22px", maxWidth: "100%" }}
          >
            {description}...
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
