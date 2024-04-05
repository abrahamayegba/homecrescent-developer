"use client";
import {
  useGetProjectByIdQuery,
  useGetPrototypeByProjectQuery,
  useGetUserByIdQuery,
} from "@/src/generated/graphql";
import {
  Bath,
  BedDouble,
  ChevronLeft,
  ChevronRight,
  ChevronRightIcon,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { MdHome } from "react-icons/md";
import Image from "next/image";
import Loader2 from "@/components/loading/Loader2";
import { BsHouseDash } from "react-icons/bs";
import HomeCard from "@/components/HomeCard";
const pages = [
  {
    name: "Projects",
    href: "/dashboard/projects",
    current: false,
  },
  {
    name: "View project",
    href: "/dashboard/projects/viewproject",
    current: true,
  },
];

const Viewproject = () => {
  const params = useSearchParams();
  const projectId = params.get("projectId");

  const getUserbyId = useGetUserByIdQuery();

  const { data, loading } = useGetProjectByIdQuery({
    variables: {
      projectId: projectId!,
    },
  });

  const projectName = data?.getProjectById?.projectName;
  const projectDescription = data?.getProjectById?.description;
  const projectAddress = data?.getProjectById?.address;
  const projectMedia = data?.getProjectById?.projectsMedia;
  const numberOfPrototypes = data?.getProjectById?.prototypes?.length;
  const numberOfProperties = data?.getProjectById?.properties?.length;

  const singleProperties = data?.getProjectById?.properties;

  const prototypes = data?.getProjectById?.prototypes;
  const bannerImageUrls =
    projectMedia
      ?.filter(
        (media) => media?.projectMediaCategory?.mediaCategory === "Banner"
      )
      .map((media) => media?.mediaUrl) || [];

  const projectLayoutImageUrls = projectMedia
    ?.filter(
      (media) => media?.projectMediaCategory?.mediaCategory === "PerspectiveOne"
    )
    .map((media) => media?.mediaUrl);

  const floorPlanImageUrls = projectMedia
    ?.filter(
      (media) => media?.projectMediaCategory?.mediaCategory === "PerspectiveTwo"
    )
    .map((media) => media?.mediaUrl);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentFloorPlanImageIndex, setCurrentFloorPlanImageIndex] =
    useState(0);
  const [currentFloorPlan, setCurrentFloorPlan] = useState("Plan1");

  const handlePlanChange = (plan: any) => {
    setCurrentFloorPlan(plan);
  };

  const goToNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === bannerImageUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPreviousImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? bannerImageUrls.length - 1 : prevIndex - 1
    );
  };

  const [startIndex, setStartIndex] = useState(0);
  const [startIndexSingle, setStartIndexSingle] = useState(0);

  const nextSet = () => {
    if (startIndex + 3 < prototypes?.length!) {
      setStartIndex(startIndex + 1);
    }
  };

  const prevSet = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const prevProperty = () => {
    if (startIndexSingle > 0) {
      setStartIndexSingle(startIndexSingle - 1);
    }
  };

  const nextProperty = () => {
    if (startIndexSingle + 3 < singleProperties?.length!) {
      setStartIndexSingle(startIndexSingle + 1);
    }
  };

  const handleLayoutChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleFloorPlanChange = (index: number) => {
    setCurrentFloorPlanImageIndex(index);
  };

  const queriesLoading = getUserbyId.loading || loading;

  return (
    <>
      {queriesLoading ? (
        <Loader2 />
      ) : (
        <div className=" py-9 px-14 mb-10">
          <nav className="flex" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center gap-x-1">
              <li>
                <div>
                  <Link
                    href="/dashboard"
                    className=" text-primary-blue text-opacity-80 hover:text-gray-900 "
                  >
                    <MdHome
                      className="h-5 w-5 flex-shrink-0 "
                      aria-hidden="true"
                    />
                    <span className="sr-only">Home</span>
                  </Link>
                </div>
              </li>
              {pages.map((page) => (
                <li className=" ml-2" key={page.name}>
                  <div className="flex items-center">
                    <ChevronRightIcon
                      className="h-5 w-5 flex-shrink-0 text-primary-blue"
                      aria-hidden="true"
                    />
                    <Link
                      href={page.href}
                      className={`ml-4 text-sm text-primary-blue hover:text-gray-900  ${
                        page.current
                          ? " font-semibold"
                          : " hover:underline hover:underline-offset-2"
                      }`}
                      aria-current={page.current ? "page" : undefined}
                    >
                      {page.name}
                    </Link>
                  </div>
                </li>
              ))}
            </ol>
          </nav>
          <div className="relative h-[450px] overflow-clip mt-6">
            {bannerImageUrls.map((imageUrl, index) => (
              <Image
                key={index}
                src={imageUrl!}
                alt={`Banner Image ${index + 1}`}
                width={800}
                height={450}
                className={index === currentIndex ? "h-[450px]" : "hidden"}
                layout="responsive"
                objectFit="cover"
              />
            ))}
            <button
              onClick={goToPreviousImage}
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-primary-orange rounded-full p-2 ${
                currentIndex === 0 ? "opacity-0" : ""
              }`}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="text-white" />
            </button>
            <button
              onClick={goToNextImage}
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-primary-orange rounded-full p-2 ${
                currentIndex === bannerImageUrls.length - 1 ? "opacity-0" : ""
              }`}
              disabled={currentIndex === bannerImageUrls.length - 1}
            >
              <ChevronRight className="text-white" />
            </button>
          </div>
          <div className=" flex flex-col mt-12 items-center text-primary-blue">
            <p className=" text-5xl font-semibold uppercase ">
              {projectName} - Project
            </p>
            <p className=" text-3xl font-medium mt-4">{projectAddress}</p>
            <p className=" mt-5 max-w-[800px] text-center leading-6 text-gray-700">
              {projectDescription}
            </p>
          </div>
          <div className=" flex flex-row items-center gap-x-3 mt-14">
            <div className="relative w-1/2 h-[350px]">
              <Image
                src={bannerImageUrls[0]!}
                alt="Your Image"
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-gray-500 opacity-40"></div>
              <div className="absolute uppercase inset-0 flex justify-center items-center text-white text-[38px] font-semibold">
                74,000 sqft
              </div>
            </div>
            <div className=" w-1/2 grid grid-cols-2 grid-rows-3 gap-3 text-primary-blue">
              <div className="  border border-primary-orange h-[93px] p-[20px] flex flex-col">
                <p className=" text-2xl font-semibold">{numberOfProperties}</p>
                <p className=" text-[15px]">Single properties</p>
              </div>
              <div className="  border border-primary-orange h-[93px] p-[20px] flex flex-col">
                <p className=" text-2xl font-semibold">{numberOfPrototypes}</p>
                <p className=" text-[15px]">Prototypes</p>
              </div>
              <div className="  border border-primary-orange h-[93px] p-[20px] flex flex-col">
                <p className=" text-2xl font-semibold">4500 sqft</p>
                <p className=" text-[15px]">Size</p>
              </div>
              <div className="  border border-primary-orange h-[93px] p-[20px] flex flex-col">
                <p className=" text-2xl font-semibold">6</p>
                <p className=" text-[15px]">Parking spaces</p>
              </div>
              <div className="  border border-primary-orange h-[93px] p-[20px] flex flex-col">
                <p className=" text-2xl font-semibold">1</p>
                <p className=" text-[15px]">Gymnasium</p>
              </div>
              <div className="  border border-primary-orange h-[93px] p-[20px] flex flex-col">
                <p className=" text-2xl font-semibold">2</p>
                <p className=" text-[15px]">Medical centre</p>
              </div>
            </div>
          </div>
          <div className=" flex flex-col mt-20">
            <p className=" text-center text-4xl font-semibold text-primary-blue">
              Project Layout
            </p>
            <div className=" w-full relative">
              <div className="h-full transition-all duration-300">
                {projectLayoutImageUrls && (
                  <Image
                    width={1000}
                    height={500}
                    className="w-full mt-2"
                    src={projectLayoutImageUrls[currentImageIndex]!}
                    alt={`Layout ${currentImageIndex + 1}`}
                    objectFit="cover"
                  />
                )}
              </div>
              <div className="flex mt-4 items-center gap-x-5 justify-center">
                {projectLayoutImageUrls &&
                  projectLayoutImageUrls.map((imageUrl, index) => (
                    <button
                      key={index}
                      className={`px-6 py-3 rounded font-medium ${
                        currentImageIndex === index
                          ? "bg-primary-orange text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() => handleLayoutChange(index)}
                    >
                      Layout {index + 1}
                    </button>
                  ))}
              </div>
            </div>
          </div>
          <div className=" flex flex-col mt-24">
            <p className=" text-center text-4xl font-semibold text-primary-blue">
              Floor plan
            </p>
            <div className=" w-full relative">
              <div className="h-full transition-all duration-300">
                {floorPlanImageUrls && (
                  <Image
                    width={1000}
                    height={700}
                    className="w-full mt-5 h-[700px]"
                    src={floorPlanImageUrls[currentFloorPlanImageIndex]!}
                    alt={`Layout ${currentFloorPlanImageIndex + 1}`}
                    objectFit="cover"
                  />
                )}
              </div>
              <div className="flex mt-6 items-center gap-x-5 justify-center">
                {floorPlanImageUrls &&
                  floorPlanImageUrls.map((imageUrl, index) => (
                    <button
                      key={index}
                      className={`px-6 py-3 rounded font-medium ${
                        currentFloorPlanImageIndex === index
                          ? "bg-primary-orange text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() => handleFloorPlanChange(index)}
                    >
                      Plan {index + 1}
                    </button>
                  ))}
              </div>
            </div>
          </div>
          <div className=" flex flex-col mt-24">
            <p className=" text-center text-4xl font-semibold text-primary-blue">
              Prototypes
            </p>
            <div className="relative mt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-primary-blue lg:grid-cols-3 gap-x-5 gap-y-1 justify-between w-full mt-4">
                {prototypes
                  ?.slice(startIndex, startIndex + 3)
                  .map((prototype, index) => (
                    <div key={index} className="flex flex-col relative">
                      <div className="flex flex-1">
                        <Image
                          width={600}
                          height={177}
                          className="object-cover w-full h-[280px]"
                          alt="Home"
                          src={
                            prototype?.prototypesMedia?.find(
                              (prototype) =>
                                prototype?.propertyMediaCategory
                                  ?.mediaCategory === "Banner"
                            )?.mediaUrl!
                          }
                        />
                      </div>
                      <div className="p-2 px-2 border border-gray-300 shadow-md pb-4 flex flex-col gap-y-1">
                        <div className="flex w-full justify-between items-center">
                          <div className="flex items-center justify-between w-full">
                            <p className="font-medium ml-1 text-[22px] text-primary-blue">
                              {prototype?.prototypeName}
                            </p>
                          </div>
                        </div>
                        <p className="text-primary-blue ml-1 text-[15px] capitalize">
                          {projectAddress}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
              {prototypes?.length! > 3 && (
                <>
                  <div className="absolute top-0 bottom-0 flex mt-[-15px] items-center left-0 ml-2">
                    <button
                      onClick={prevSet}
                      disabled={startIndex === 0}
                      className="bg-gray-200 p-2 rounded-md"
                    >
                      <ChevronLeft className="h-6 w-6 text-gray-700" />
                    </button>
                  </div>
                  <div className="absolute top-0 mt-[-15px] bottom-0 flex items-center right-0 mr-2">
                    <button
                      onClick={nextSet}
                      disabled={startIndex + 3 >= prototypes?.length!}
                      className="bg-gray-200 p-2 rounded-md"
                    >
                      <ChevronRight className="h-6 w-6 text-gray-700" />
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className=" flex justify-center mt-10">
              <Link
                href={`/dashboard/projects/viewproject/createprojectprototype?projectId=${projectId}`}
              >
                <button className=" py-3 px-6 bg-primary-orange font-medium text-white rounded">
                  Create New Prototype
                </button>
              </Link>
            </div>
          </div>
          <div className=" flex flex-col mt-20">
            <p className=" text-center text-4xl font-semibold text-primary-blue">
              Single properties
            </p>
            <div className="relative mt-2">
              {singleProperties?.length! == 0 ? (
                <div className="flex py-14 items-center justify-center text-primary-blue rounded-lg bg-white mt-4 border border-gray-900/10">
                  <div className="flex flex-col items-center gap-y-3 text-center">
                    <span className=" bg-gray-50 p-6 rounded-full">
                      <BsHouseDash className=" w-8 h-8" />
                    </span>
                    <h3 className="text-[22px] tracking-tight">
                      You have no properties
                    </h3>
                    <div className=" flex justify-center mt-3">
                      <Link
                        href={`/dashboard/projects/viewproject/createprojectproperty?projectId=${projectId}`}
                      >
                        <button className=" py-3 px-6 bg-primary-orange font-medium text-white rounded">
                          Create New Property
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-primary-blue lg:grid-cols-3 gap-x-5 gap-y-1 justify-between w-full mt-4 relative">
                  {singleProperties
                    ?.slice(startIndexSingle, startIndexSingle + 3)
                    .map((property) => (
                      <Link
                        key={property?.id}
                        href={`/dashboard/singleproperties/viewproperty?propertyId=${property?.id}`}
                      >
                        <div key={property?.id} className="w-full">
                          <HomeCard
                            beds={property?.propertyDetail?.bedrooms!}
                            sqft={property?.propertyDetail?.sizeSqft!}
                            price={property?.price!}
                            baths={property?.propertyDetail?.bathrooms!}
                            propertyMedia={property?.propertiesMedia}
                            address={property?.propertyDetail?.address!}
                          />
                        </div>
                      </Link>
                    ))}
                  {singleProperties?.length! > 3 && (
                    <>
                      <div className="absolute top-1/4 mt-[20px] flex items-center left-0 ml-2">
                        <button
                          onClick={prevProperty}
                          disabled={startIndexSingle === 0}
                          className="bg-gray-200 p-2 rounded-md"
                        >
                          <ChevronLeft className="h-6 w-6 text-gray-700" />
                        </button>
                      </div>
                      <div className="absolute top-1/4 mt-[20px] flex items-center right-0 mr-2">
                        <button
                          onClick={nextProperty}
                          disabled={
                            startIndexSingle + 3 >= singleProperties?.length!
                          }
                          className="bg-gray-200 p-2 rounded-md"
                        >
                          <ChevronRightIcon className="h-6 w-6 text-gray-700" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
              {singleProperties?.length! > 0 && (
                <div className=" flex justify-center mt-5">
                  <Link
                    href={`/dashboard/projects/viewproject/createprojectproperty?projectId=${projectId}`}
                  >
                    <button className=" py-3 px-6 bg-primary-orange font-medium text-white rounded">
                      Create New Property
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Viewproject;
