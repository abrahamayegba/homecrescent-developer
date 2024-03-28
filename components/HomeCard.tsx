"use client";
import Image from "next/image";
import React from "react";
import useModal from "./hooks/useModal";
import { Bath, BedDouble } from "lucide-react";

interface PropertyMedia {
  __typename?: string | undefined;
  id?: string | null | undefined;
  mediaUrl?: string | null | undefined;
  propertyMediaCategory?:
    | {
        __typename?: string | undefined;
        mediaCategory?: string | null | undefined;
      }
    | null
    | undefined;
}

interface HomecardProps {
  propertyMedia: (PropertyMedia | null)[] | null | undefined;
  baths: number;
  beds: number;
  sqft: number;
  price: number;
  address: string;
}

const HomeCard: React.FC<HomecardProps> = ({
  propertyMedia,
  baths,
  price,
  beds,
  sqft,
  address,
}) => {
  const { openModal, isOpen, closeModal } = useModal();

  const bannerMedia = propertyMedia?.find(
    (media) => media?.propertyMediaCategory?.mediaCategory === "Banner"
  );
  const bannerMediaUrl = bannerMedia?.mediaUrl || "";

  return (
    <>
      <div
        onClick={openModal}
        className="flex flex-col rounded overflow-hidden cursor-pointer relative"
      >
        <div className=" flex flex-1">
          <Image
            width={600}
            height={177}
            className="object-cover rounded-lg w-full h-48"
            alt="Home"
            src={bannerMediaUrl}
          />
        </div>
        <div className="p-2 px-0 pb-4 flex flex-col gap-y-1">
          <div className=" flex w-full justify-between items-center">
            <div className=" flex items-center justify-between w-full">
              <p className="font-medium text-[22px] text-primary-blue">
                ₦{price.toLocaleString()}/mo
              </p>
              <span className=" rounded-md bg-green-100 text-green-800 uppercase py-1 px-2 text-xs font-medium ring-1 ring-inset ring-green-300">
                For rent
              </span>
            </div>
          </div>
          <div className="flex flex-row gap-x-1 justify-between text-[15px] font-light text-primary-blue">
            <p className="border-r border-gray-300 pr-2 flex flex-row">
              <span className="font-medium flex flex-row items-center gap-x-2 mr-1">
                <BedDouble className=" w-4 h-4" />
                {beds}
              </span>
              {beds === 1 ? "bedroom" : "bedrooms"}
            </p>
            <p className="border-r border-gray-300 pr-2 flex flex-row">
              <span className="font-medium flex flex-row items-center gap-x-2 mr-1">
                <Bath className=" w-4 h-4" />
                {baths}
              </span>
              {baths === 1 ? "bedroom" : "bedrooms"}
            </p>
            <p>
              <span className="font-medium">{sqft.toLocaleString()}</span> sqft
            </p>
          </div>
          <p className="text-primary-blue font-light text-[15px] capitalize">
            {address}
          </p>
        </div>
      </div>
    </>
  );
};

export default HomeCard;
