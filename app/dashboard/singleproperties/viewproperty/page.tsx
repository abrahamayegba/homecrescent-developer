"use client";
import {
  useGetPropertyByIdQuery,
  useGetUserByIdQuery,
} from "@/src/generated/graphql";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { MdHome } from "react-icons/md";
import Image from "next/image";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import Loader2 from "@/components/loading/Loader2";

const pages = [
  {
    name: "Single properties",
    href: "/dashboard/singleproperties",
    current: false,
  },
  {
    name: "View single property",
    href: "/dashboard/singleproperties/viewproperty",
    current: true,
  },
];

const Viewproperty = () => {
  const params = useSearchParams();
  const propertyId = params.get("propertyId");
  const getUserbyId = useGetUserByIdQuery();

  const { data, loading } = useGetPropertyByIdQuery({
    variables: {
      propertyId: propertyId!,
    },
  });

  const property = data?.getPropertyById;
  const propertyPrice = property?.price;
  const numberOfBedrooms = property?.propertyDetail?.bedrooms;
  const numberOfBathrooms = property?.propertyDetail?.bathrooms;
  const address = property?.propertyDetail?.address;
  const cityName = property?.city?.cityName;
  const propertyName = property?.name;
  const propertyDescription = property?.description;
  const propertyStatus = property?.propertyStatus?.propertyStatus;
  const flooors = property?.propertyDetail?.floors;
  const isNewProperty =
    property?.propertyDetail?.isNewConstruction === true ? "Yes" : "No";
  const isFurnished =
    property?.propertyDetail?.isFurnished === true ? "Yes" : "No";
  const hasPool = property?.propertyDetail?.hasPool === true ? "Yes" : "No";
  const hasGarden = property?.propertyDetail?.hasGarden === true ? "Yes" : "No";
  const canMortgate =
    property?.propertyDetail?.canMortgage === true ? "Yes" : "No";
  const canPayInstallment =
    property?.propertyDetail?.canPayInstallment === true ? "Yes" : "No";
  const hasParkingSpace =
    property?.propertyDetail?.parkingSpaces! > 1 ? "Yes" : "No";
  const dateCompleted = property?.propertyDetail?.dateCompleted;

  const sqft = property?.propertyDetail?.sizeSqft;
  const bannerCategory = property?.propertiesMedia?.find(
    (property) => property?.propertyMediaCategory?.mediaCategory === "Banner"
  );
  const BathroomCategory = property?.propertiesMedia?.find(
    (property) => property?.propertyMediaCategory?.mediaCategory === "Bathroom"
  );
  const KitchenCategory = property?.propertiesMedia?.find(
    (property) => property?.propertyMediaCategory?.mediaCategory === "Kitchen"
  );
  const BedroomCategory = property?.propertiesMedia?.find(
    (property) => property?.propertyMediaCategory?.mediaCategory === "Bedroom"
  );
  const LivingroomCategory = property?.propertiesMedia?.find(
    (property) =>
      property?.propertyMediaCategory?.mediaCategory === "LivingRoom"
  );
  const bannerImage = bannerCategory?.mediaUrl;
  const kitchenImage = KitchenCategory?.mediaUrl;
  const livingroomImage = LivingroomCategory?.mediaUrl;
  const BedroomImage = BedroomCategory?.mediaUrl;
  const bathroomImage = BathroomCategory?.mediaUrl;

  const otherImages = [
    livingroomImage,
    kitchenImage,
    BedroomImage,
    bathroomImage,
  ];

  const queriesLoading = loading || getUserbyId.loading;

  return (
    <>
      {queriesLoading ? (
        <Loader2 />
      ) : (
        <div>
          <div className=" py-9 px-14">
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
            <div className="grid grid-cols-2 gap-x-2 mt-8">
              <div className="w-full h-[386px]">
                <Image
                  src={bannerImage!}
                  className="overflow-clip object-cover h-[386px]"
                  width={590}
                  height={386}
                  alt="Your image"
                />
              </div>
              <div className="grid grid-cols-2 grid-rows-2 gap-x-[6px] gap-y-[6px] overflow-clip h-[386px]">
                {otherImages.slice(0, 4).map((imageUrl, index) => (
                  <div key={index} className="w-full">
                    <Image
                      width={289}
                      height={190}
                      className=" h-[190px]"
                      src={imageUrl!}
                      alt={`Image ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className=" mt-10 flex flex-col ml-1 text-primary-blue">
              <div className=" flex flex-row gap-x-3 items-end">
                <p className=" text-5xl font-medium">
                  ₦{propertyPrice?.toLocaleString()}
                </p>
                <p className=" pb-1 font-medium">
                  Rent per month | Payable up to 2 times
                </p>
              </div>
              <p className=" mt-4 text-xl">
                Brand New Apartment | {numberOfBedrooms}BR{" "}
              </p>
              <div className=" mt-4 flex flex-row font-medium gap-x-4 text-primary-orange text-opacity-80">
                <div className=" flex items-center">
                  <FaBed className=" mr-1 w-[18px] h-[18px]" />{" "}
                  {numberOfBedrooms} Bedroom
                </div>
                <div className=" flex items-center">
                  <FaBath className=" mr-1" /> {numberOfBathrooms} Bathroom
                </div>
                <div className=" flex items-center">
                  <span className=" mr-1">
                    <svg
                      data-name="Group 5481"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      className=" fill-primary-orange"
                      viewBox="0 0 23.562 23.543"
                    >
                      <path
                        data-name="Path 5515"
                        d="M108.352.022c.088-.023.12.032.16.062l3.267 2.442c.2.146.216.18-.747.654a7.649 7.649 0 0 0-2.512 2.02.442.442 0 0 1-.142.106 2.243 2.243 0 0 1-.025-.554c0-.324-.013-.65 0-.973.009-.179-.049-.214-.219-.214q-3.85.008-7.7 0c-.935 0-1.871.006-2.806 0-.2 0-.242.056-.237.245.014.486 0 .973 0 1.458-.092.05-.134-.028-.183-.064q-1.634-1.221-3.266-2.444c-.223-.166-.172-.166 1.507-1a5.018 5.018 0 0 0 1.816-1.7c.023-.033.046-.037.1-.064a1.389 1.389 0 0 1 .035.457c0 .355.012.712 0 1.066-.007.177.048.217.22.216 1.809-.006 3.617 0 5.426 0 1.685 0 3.37 0 5.055.006.221 0 .266-.065.26-.269-.014-.483 0-.967 0-1.446"
                        transform="translate(-93.857)"
                      />
                      <path
                        data-name="Path 5516"
                        d="M138.164 29.192c.535 0 1.035-.008 1.534 0 .177 0 .216-.048.215-.219q-.008-4.8 0-9.6c0-.186-.052-.232-.232-.227-.492.012-.985 0-1.472 0-.037-.092.025-.131.059-.176l2.443-3.265c.16-.214.17-.183.806 1.052a6.975 6.975 0 0 0 1.83 2.176c.075.061.081.094.15.213-.523 0-1.013.013-1.5-.006-.216-.009-.25.063-.249.259q.009 4.752 0 9.5c0 .214.037.293.271.283.478-.021.957-.006 1.435-.006.047.093-.031.134-.068.183q-1.219 1.634-2.443 3.266c-.124.165-.153.187-.524-.552a8.7 8.7 0 0 0-1.971-2.594c-.28-.25-.2-.138-.281-.3"
                        transform="translate(-119.936 -9.192)"
                      />
                      <path
                        data-name="Path 5517"
                        d="M109.622 32.735h-14.41a1.354 1.354 0 0 1-1.354-1.354v-14.41a1.354 1.354 0 0 1 1.354-1.354h14.41a1.354 1.354 0 0 1 1.354 1.354v14.41a1.354 1.354 0 0 1-1.354 1.354"
                        transform="translate(-93.858 -9.192)"
                      />
                    </svg>
                  </span>
                  {sqft} SqFT.
                </div>
              </div>
              <div className=" flex flex-col mt-4 text-xl">
                <p className=" uppercase">{address}</p>
              </div>
              <div className=" mt-8 flex flex-col border-t border-t-gray-200 max-w-[800px] pt-6 pb-8">
                <p className=" font-medium text-[26px]">Details</p>
                <p className=" mt-1 text-gray-600">
                  Brand New Apartment | {numberOfBedrooms}BR{" "}
                </p>
                <div></div>
                <div className=" flex flex-col mt-3 text-gray-600">
                  <div className=" flex flex-row bg-gray-50 p-[16px]">
                    <p className=" w-1/2">Property name:</p>
                    <p className=" w-1/2 border-l border-l-gray-300 pl-10">
                      {propertyName}
                    </p>
                  </div>
                  <div className=" flex flex-row bg-gray-100 p-[16px]">
                    <p className=" w-1/2">Property status:</p>
                    <p className=" w-1/2 border-l border-l-gray-300 pl-10">
                      {propertyStatus}
                    </p>
                  </div>
                  <div className=" flex flex-row bg-gray-50 p-[16px]">
                    <p className=" w-1/2">Furnished:</p>
                    <p className=" w-1/2 border-l border-l-gray-300 pl-10">
                      {isFurnished}
                    </p>
                  </div>
                  <div className=" flex flex-row bg-gray-100 p-[16px]">
                    <p className=" w-1/2">Size sqft:</p>
                    <p className=" w-1/2 border-l border-l-gray-300 pl-10">
                      {sqft} SqFt
                    </p>
                  </div>
                  <div className=" flex flex-row bg-gray-50 p-[16px]">
                    <p className=" w-1/2">Floors:</p>
                    <p className=" w-1/2 border-l border-l-gray-300 pl-10">
                      {flooors}
                    </p>
                  </div>
                  <div className=" flex flex-row bg-gray-100 p-[16px]">
                    <p className=" w-1/2">New property:</p>
                    <p className=" w-1/2 border-l border-l-gray-300 pl-10">
                      {isNewProperty}
                    </p>
                  </div>
                  <div className=" flex flex-row bg-gray-50 p-[16px]">
                    <p className=" w-1/2">Pool:</p>
                    <p className=" w-1/2 border-l border-l-gray-300 pl-10">
                      {hasPool}
                    </p>
                  </div>
                  <div className=" flex flex-row bg-gray-100 p-[16px]">
                    <p className=" w-1/2">Garden:</p>
                    <p className=" w-1/2 border-l border-l-gray-300 pl-10">
                      {hasGarden}
                    </p>
                  </div>
                  <div className=" flex flex-row bg-gray-50 p-[16px]">
                    <p className=" w-1/2">Mortgage available:</p>
                    <p className=" w-1/2 border-l border-l-gray-300 pl-10">
                      {canMortgate}
                    </p>
                  </div>
                  <div className=" flex flex-row bg-gray-100 p-[16px]">
                    <p className=" w-1/2">Pay installments:</p>
                    <p className=" w-1/2 border-l border-l-gray-300 pl-10">
                      {canPayInstallment}
                    </p>
                  </div>
                  <div className=" flex flex-row bg-gray-50 p-[16px]">
                    <p className=" w-1/2">Parking space:</p>
                    <p className=" w-1/2 border-l border-l-gray-300 pl-10">
                      {hasParkingSpace}
                    </p>
                  </div>
                  <div className=" flex flex-row bg-gray-100 p-[16px]">
                    <p className=" w-1/2">Date completed:</p>
                    <p className=" w-1/2 border-l border-l-gray-300 pl-10">
                      {dateCompleted}
                    </p>
                  </div>
                </div>
              </div>
              <div className=" mt-8 flex flex-col border-t border-t-gray-200 max-w-[800px] pt-6 pb-12">
                <p className=" font-medium text-[26px]">Description</p>
                <p className=" mt-1 text-gray-600 leading-7">
                  {propertyDescription}
                  This beautifully designed Cluster Townhouse located in the
                  prestigious Damac Akoya Oxygen Community has a tranquil peace
                  of living amidst greenery. Ground Floor: *Living and dining
                  room *Kitchen and maids room *Powder room *Large garden
                  *Utilities room *2 parking spaces 1st Floor: *2 en-suite
                  bedrooms *2 bedrooms with shared bathroom *Fitted Wardrobes
                  *Balcony from the master bedroom Facilities include: *Shared
                  swimming pool *Kids play areas *Free shuttle bus *24hr
                  Security *Access to park amenities *Retail outlets.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Viewproperty;
