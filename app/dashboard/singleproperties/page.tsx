"use client";
import HomeCard from "@/components/HomeCard";
import Loader2 from "@/components/loading/Loader2";
import {
  useGetDeveloperCompanyByUserQuery,
  useGetPropertiesByCompanyQuery,
  useGetUserByIdQuery,
} from "@/src/generated/graphql";
import Link from "next/link";
import React from "react";

const Singleproperties = () => {
  const { data, loading } = useGetUserByIdQuery();
  const getDeveloperCompanyByUser = useGetDeveloperCompanyByUserQuery();
  const developerCompanyId =
    getDeveloperCompanyByUser.data?.getDeveloperCompanyByUser?.id;
  useGetPropertiesByCompanyQuery;

  const getPropertiesByCompany = useGetPropertiesByCompanyQuery({
    variables: {
      companyId: developerCompanyId!,
    },
  });

  const propertiesByCompany =
    getPropertiesByCompany.data?.getPropertiesByCompany;

  const queriesLoading =
    loading ||
    getDeveloperCompanyByUser.loading ||
    getPropertiesByCompany.loading;

  return (
    <>
      {queriesLoading ? (
        <Loader2 />
      ) : (
        <div className="min-h-screen bg-gray-50">
          <div className=" px-8 py-5">
            <div className=" flex flex-row justify-between py-4">
              <div className="flex items-center">
                <div className="flex items-start flex-col">
                  <h1 className=" text-2xl font-bold leading-7 text-primary-blue sm:truncate sm:leading-9">
                    Single properties
                  </h1>
                  <p className="flex items-center text-[15px] font-light mt-1 capitalize text-gray-500 sm:mr-6">
                    Manage your properties
                  </p>
                </div>
              </div>
              <div>
                <Link href="/dashboard/singleproperties/createsingleproperty">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-primary-orange px-10 py-2.5 font-medium text-white"
                  >
                    Create
                  </button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-primary-blue lg:grid-cols-3 overflow-auto gap-x-5 gap-y-1 justify-between w-full mt-4">
              {propertiesByCompany?.map((property) => (
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
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Singleproperties;
