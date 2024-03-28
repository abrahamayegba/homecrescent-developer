"use client";
import HomeCard from "@/components/HomeCard";
import Loader2 from "@/components/loading/Loader2";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useGetDeveloperCompanyByUserQuery,
  useGetPropertiesByCompanyQuery,
  useGetUserByIdQuery,
} from "@/src/generated/graphql";
import { Building, Check } from "lucide-react";
import Link from "next/link";
import React from "react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Dashboard = () => {
  const { data, loading } = useGetUserByIdQuery();
  const getDeveloperCompanyByUser = useGetDeveloperCompanyByUserQuery();
  const userName = data?.getUserById?.fullname;
  const companyName =
    getDeveloperCompanyByUser?.data?.getDeveloperCompanyByUser?.companyName;
  const developerCompanyId =
    getDeveloperCompanyByUser?.data?.getDeveloperCompanyByUser?.id;

  const getPropertiesByCompany = useGetPropertiesByCompanyQuery({
    variables: {
      companyId: developerCompanyId!,
    },
  });

  const propertiesByCompany =
    getPropertiesByCompany.data?.getPropertiesByCompany;
  const numberOfSingleProperties = propertiesByCompany?.length;

  const stats = [
    {
      name: "Single properties",
      value: numberOfSingleProperties,
      change: "+4.75%",
      changeType: "positive",
    },
    {
      name: "Projects",
      value: "2",
      change: "-1.39%",
      changeType: "positive",
    },
    {
      name: "Foreclosures",
      value: "1",
      change: "+10.18%",
      changeType: "negative",
    },
  ];

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
          <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8 pt-3 py-2">
            <div className="py-6 md:flex md:items-center md:justify-between px-1">
              <div className="min-w-0 flex-1">
                <div className="flex items-center">
                  <div className="flex items-start flex-col">
                    <h1 className=" text-[26px] font-bold leading-7 text-primary-blue sm:truncate sm:leading-9">
                      Welcome, {userName}
                    </h1>
                    <dl className="mt-6 flex flex-col sm:mt-1 sm:flex-row sm:flex-wrap">
                      <dt className="sr-only">Company</dt>
                      <dd className="flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6">
                        <Building
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        {companyName}
                      </dd>
                      <dt className="sr-only">Account status</dt>
                      <dd className="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                        <Check
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                          aria-hidden="true"
                        />
                        Email verified
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="inline-flex focus:outline-none items-center rounded-md bg-primary-orange px-10 py-2.5 font-medium text-white"
                    >
                      Create
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className=" flex flex-col w-[150px] mt-1 text-[15px] font-medium text-primary-blue"
                  >
                    <Link href="/dashboard/singleproperties/createsingleproperty">
                      <button className=" pl-2 py-2 text-start hover:bg-slate-100 w-full">
                        Single property
                      </button>
                    </Link>
                    <button className=" pl-2 py-2 text-start hover:bg-slate-100">
                      Project
                    </button>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          <div className=" px-8 py-2">
            <dl className="mx-auto grid max-w-7xl border-b border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5 rounded-lg overflow-clip border-x border-x-gray-900/10 bg-white grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:px-2 xl:px-0">
              {stats.map((stat, statIdx) => (
                <div
                  key={stat.name}
                  className={classNames(
                    statIdx % 2 === 1
                      ? "sm:border-l"
                      : statIdx === 2
                      ? "lg:border-l"
                      : "",
                    "flex items-baseline flex-wrap justify-between gap-y-2 gap-x-4 border-t border-gray-900/5 px-4 py-5 sm:px-4 lg:border-t-0 xl:px-6"
                  )}
                >
                  <dt className="text-[15px] font-medium leading-6 text-primary-blue">
                    {stat.name}
                  </dt>
                  <dd
                    className={classNames(
                      stat.changeType === "negative"
                        ? "text-rose-600"
                        : "text-gray-700",
                      "text-xs font-medium"
                    )}
                  >
                    {stat.change}
                  </dd>
                  <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className=" mt-9">
              <p className=" text-[22px] pl-1 font-medium leading-7 text-primary-blue">
                Recent Single listings
              </p>
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
        </div>
      )}
    </>
  );
};

export default Dashboard;
