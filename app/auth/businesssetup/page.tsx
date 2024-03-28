"use client";
import Homecrescentlogo from "@/components/logos/Homecrescentlogo";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCreateDeveloperCompanyMutation,
  useGetCompanyTypesQuery,
} from "@/src/generated/graphql";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  companyName: string;
  companyEmail: string;
  companyMobile: string;
  registrationNumber: string;
  address: string;
}

const Businesssetup = () => {
  const [companyTypeId, setCompanyTypeId] = useState("");
  const companyQuery = useGetCompanyTypesQuery();
  const companyTypes = companyQuery?.data?.getCompanyTypes;
  const router = useRouter();

  const { register, handleSubmit } = useForm<FormData>();
  const [createDeveloperCompanyMutation, { loading }] =
    useCreateDeveloperCompanyMutation();

  const handleCreateBusiness = async (data: FormData) => {
    try {
      await createDeveloperCompanyMutation({
        variables: {
          ...data,
          companyTypeId: parseInt(companyTypeId),
        },
      });
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-1">
      <div className="relative hidden w-0 flex-1 lg:block max-w-[50%]">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src="/authimage1.jpg"
          alt="home image"
          width={700}
          height={700}
        />
      </div>
      <div className="flex flex-1 flex-col text-primary-blue overflow-y-auto justify-center w-1/2 px-4 py-12 lg:flex-none lg:px-16 ">
        <div className="mx-auto w-full overflow-y-auto">
          <div>
            <Homecrescentlogo />
            <h2 className="mt-6 text-[26px] font-semibold leading-9 tracking-tight ">
              Setup your business
            </h2>
          </div>
          <div className="mt-4">
            <form
              onSubmit={handleSubmit(handleCreateBusiness)}
              className=" flex flex-col gap-y-4 text-[15px]"
            >
              <div className=" flex flex-row gap-x-8 justify-between">
                <div className=" w-1/2">
                  <label
                    htmlFor="companyname"
                    className="block text-[15px] leading-6 "
                  >
                    Company name
                  </label>
                  <div className="mt-2">
                    <input
                      id="companyname"
                      type="text"
                      autoComplete="companyname"
                      required
                      className="block w-full rounded-md border border-gray-300 text-[15px] py-2.5 px-4  placeholder:text-gray-400 sm:leading-6"
                      {...register("companyName")}
                    />
                  </div>
                </div>
                <div className=" w-1/2">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[15px] leading-6 "
                    >
                      Company email
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        type="email"
                        required
                        className="block w-full rounded-md border border-gray-300 py-2.5 px-4  placeholder:text-gray-400 sm:leading-6"
                        {...register("companyEmail")}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className=" flex flex-row gap-x-8 justify-between">
                <div className=" w-1/2">
                  <label
                    htmlFor="companymobile"
                    className="block text-[15px] leading-6 "
                  >
                    Company mobile
                  </label>
                  <div className="mt-2">
                    <input
                      id="companymobile"
                      type="tel"
                      autoComplete="mobile"
                      required
                      className="block w-full rounded-md border text-[15px] border-gray-300 py-2.5 px-4  placeholder:text-gray-400 sm:leading-6"
                      {...register("companyMobile")}
                    />
                  </div>
                </div>
                <div className=" w-1/2">
                  <div>
                    <label
                      htmlFor="companytype"
                      className="block text-[15px] leading-6 "
                    >
                      Company type
                    </label>
                    <Select
                      value={companyTypeId}
                      onValueChange={setCompanyTypeId}
                    >
                      <SelectTrigger className="border mt-2 py-2.5 border-gray-300 rounded-md text-primary-blue focus:outline-none px-3">
                        <SelectValue
                          className=" placeholder:text-gray-500"
                          placeholder="Select"
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-white w-full z-[200] shadow-sm text-gray-800">
                        <SelectGroup>
                          {companyTypes?.map((company) => (
                            <SelectItem
                              className="hover:bg-gray-100 cursor-pointer py-2 text-[15px]"
                              key={company?.id}
                              value={String(company?.id)}
                            >
                              {company?.type}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="registrationnumber"
                  className="block text-[15px] leading-6 "
                >
                  Registration number
                </label>
                <div className="mt-2">
                  <input
                    id="registrationnumber"
                    type="tel"
                    autoComplete="registrationnumber"
                    required
                    className="block w-full rounded-md border border-gray-300 py-2.5 px-4  placeholder:text-gray-400 sm:leading-6"
                    {...register("registrationNumber")}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-[15px] leading-6 "
                >
                  Address
                </label>
                <div className="mt-2">
                  <input
                    id="address"
                    type="text"
                    autoComplete="address"
                    required
                    className="block w-full rounded-md border border-gray-300 py-2.5 px-4  placeholder:text-gray-400 sm:leading-6"
                    {...register("address")}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`flex w-full mt-6 justify-center rounded-md bg-primary-orange px-3 py-2.5 text-[15px] font-medium leading-6 text-white ${
                  loading ? " opacity-50" : ""
                }`}
              >
                Setup
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Businesssetup;
