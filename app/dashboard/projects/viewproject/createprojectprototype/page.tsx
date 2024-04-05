"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  GetPropertiesByCompanyDocument,
  GetPrototypeByProjectDocument,
  useCreatePropertyMutation,
  useCreatePrototypeMutation,
  useGetCitiesByStateIdQuery,
  useGetDeveloperCompanyByUserQuery,
  useGetProjectByIdQuery,
  useGetPropertyCategoryQuery,
  useGetPropertyMediaCategoriesQuery,
  useGetPropertyOptionsQuery,
  useGetPropertyStatusesQuery,
  useGetStatesQuery,
} from "@/src/generated/graphql";
import { format } from "date-fns";
import {
  CheckIcon,
  ChevronLeft,
  ChevronRightIcon,
  FileIcon,
  ImageIcon,
  Pen,
  Plus,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsCalendar2Date } from "react-icons/bs";
import { MdHome } from "react-icons/md";
import * as filestack from "filestack-js";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import Loader2 from "@/components/loading/Loader2";

interface UploadedFile {
  description: string;
  mediaUrl: string;
  propertyMediaCategoryId: string;
}

type FormData = {
  prototypeName: string;
  description: string;
};

const CreateProjectPrototype = () => {
  const { toast } = useToast();
  const router = useRouter();
  const projectIdParams = useSearchParams();
  const projectId = projectIdParams.get("projectId");
  const pages = [
    {
      name: "Projects",
      href: "/dashboard/projects",
      current: false,
    },
    {
      name: "View project",
      href: `/dashboard/projects/viewproject?projectId=${projectId}`,
      current: false,
    },
    {
      name: "Create prototype",
      href: "/dashboard/projects/viewproject/createprojectprototype",
      current: true,
    },
  ];

  const { register, handleSubmit } = useForm<FormData>();
  const [createPrototypeMutation, { loading }] = useCreatePrototypeMutation();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [livingRoomUploads, setLivingRoomUploads] = useState<UploadedFile[]>(
    []
  );
  const [kitchenUploads, setKitchenUploads] = useState<UploadedFile[]>([]);
  const [BathroomUploads, setBathroomUploads] = useState<UploadedFile[]>([]);
  const [BedroomUploads, setBedroomUploads] = useState<UploadedFile[]>([]);
  const [otherUploads, setOtherUploads] = useState<UploadedFile[]>([]);
  const [propertyCategoryId, setPropertyCategoryId] = useState("");

  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isLivingRoomPickerOpen, setIsLivingRoomPickerOpen] = useState(false);
  const [isKitchenPickerOpen, setIsKitchenPickerOpen] = useState(false);
  const [isBedroomPickerOpen, setIsBedroomPickerOpen] = useState(false);
  const [isBathroomPickerOpen, setIsBathroomPickerOpen] = useState(false);
  const [isOtherImagePickerOpen, setIsOtherImagePickerOpen] = useState(false);
  const getPropertyCategories = useGetPropertyCategoryQuery();
  const propertyCategories = getPropertyCategories?.data?.getPropertyCategories;

  useEffect(() => {
    if (propertyCategories) {
      const defaultPropertyCategory = propertyCategories?.find(
        (property) => property?.categoryName === "Duplex"
      );
      if (defaultPropertyCategory) {
        setPropertyCategoryId(defaultPropertyCategory?.id!);
      }
    }
  }, [propertyCategories]);

  const apiKey = "Am510qpybQ3i95Kv17umgz";
  const client = filestack.init(apiKey);
  const getProjectById = useGetProjectByIdQuery({
    variables: {
      projectId: projectId!,
    },
  });

  const projectName = getProjectById?.data?.getProjectById?.projectName;

  const getPropertyMediaCategories = useGetPropertyMediaCategoriesQuery();

  const propertyMediaCategories =
    getPropertyMediaCategories?.data?.getPropertyMediaCategories;
  const bannerMediaCategory = propertyMediaCategories?.find(
    (property) => property?.mediaCategory === "Banner"
  );
  const bannerMediaCategoryId = bannerMediaCategory?.id;

  const livingRoomMediaCategory = propertyMediaCategories?.find(
    (property) => property?.mediaCategory === "LivingRoom"
  );
  const livingRoomMediaCategoryId = livingRoomMediaCategory?.id;

  const bedroomMediaCategory = propertyMediaCategories?.find(
    (property) => property?.mediaCategory === "Bedroom"
  );
  const bedroomMediaCategoryId = bedroomMediaCategory?.id;
  const bathroomMediaCategory = propertyMediaCategories?.find(
    (property) => property?.mediaCategory === "Bathroom"
  );
  const bathroomMediaCategoryId = bathroomMediaCategory?.id;

  const kitchenMediaCategory = propertyMediaCategories?.find(
    (property) => property?.mediaCategory === "Kitchen"
  );
  const kitchenMediaCategoryId = kitchenMediaCategory?.id;

  const otherMediaCategory = propertyMediaCategories?.find(
    (property) => property?.mediaCategory === "Other"
  );
  const otherMediaCategoryId = otherMediaCategory?.id;

  const openPicker = () => {
    const pickerOptions = {
      fromSources: ["local_file_system", "facebook", "instagram"],
      accept: ["image/*"],
      maxFiles: 1,
      maxSize: 4 * 1024 * 1024,
      transformations: {
        crop: true,
        rotate: true,
      },
      onUploadDone: (response: any) => {
        if (response.filesFailed && response.filesFailed.length > 0) {
          showFailureToast(response?.error);
        } else {
          const { filesUploaded } = response;
          const uploadedFilesInfo: UploadedFile[] = filesUploaded.map(
            (file: any) => ({
              description: "Banner image",
              mediaUrl: file.url,
              propertyMediaCategoryId: bannerMediaCategoryId,
            })
          );
          setUploadedFiles(uploadedFilesInfo);
        }
      },
    };
    const picker = client.picker(pickerOptions);
    picker.open();
    setIsPickerOpen(true);
  };

  const openPickerLivingRoom = () => {
    const pickerOptions = {
      fromSources: ["local_file_system", "facebook", "instagram"],
      accept: ["image/*"],
      maxFiles: 4,
      maxSize: 4 * 1024 * 1024,
      transformations: {
        crop: true,
        rotate: true,
      },
      onUploadDone: (response: any) => {
        if (response.filesUploaded && response.filesUploaded.length > 0) {
          const newFiles = response.filesUploaded.map((file: any) => ({
            description: "Living room",
            mediaUrl: file.url,
            propertyMediaCategoryId: livingRoomMediaCategoryId,
          }));
          setLivingRoomUploads((prevFiles) => [...prevFiles, ...newFiles]); // Use functional update to concatenate new files
        }
      },
    };
    const picker = client.picker(pickerOptions);
    picker.open();
    setIsLivingRoomPickerOpen(true);
  };
  const openPickerKitchen = () => {
    const pickerOptions = {
      fromSources: ["local_file_system", "facebook", "instagram"],
      accept: ["image/*"],
      maxFiles: 4,
      maxSize: 4 * 1024 * 1024,
      transformations: {
        crop: true,
        rotate: true,
      },
      onUploadDone: (response: any) => {
        if (response.filesUploaded && response.filesUploaded.length > 0) {
          const newFiles = response.filesUploaded.map((file: any) => ({
            description: "Kitchen",
            mediaUrl: file.url,
            propertyMediaCategoryId: kitchenMediaCategoryId,
          }));
          setKitchenUploads((prevFiles) => [...prevFiles, ...newFiles]); // Use functional update to concatenate new files
        }
      },
    };
    const picker = client.picker(pickerOptions);
    picker.open();
    setIsKitchenPickerOpen(true);
  };
  const openPickerBathroom = () => {
    const pickerOptions = {
      fromSources: ["local_file_system", "facebook", "instagram"],
      accept: ["image/*"],
      maxFiles: 4,
      maxSize: 4 * 1024 * 1024,
      transformations: {
        crop: true,
        rotate: true,
      },
      onUploadDone: (response: any) => {
        if (response.filesUploaded && response.filesUploaded.length > 0) {
          const newFiles = response.filesUploaded.map((file: any) => ({
            description: "Bathroom",
            mediaUrl: file.url,
            propertyMediaCategoryId: bathroomMediaCategoryId,
          }));
          setBathroomUploads((prevFiles) => [...prevFiles, ...newFiles]); // Use functional update to concatenate new files
        }
      },
    };
    const picker = client.picker(pickerOptions);
    picker.open();
    setIsBathroomPickerOpen(true);
  };
  const openPickerBedroom = () => {
    const pickerOptions = {
      fromSources: ["local_file_system", "facebook", "instagram"],
      accept: ["image/*"],
      maxFiles: 4,
      maxSize: 4 * 1024 * 1024,
      transformations: {
        crop: true,
        rotate: true,
      },
      onUploadDone: (response: any) => {
        if (response.filesUploaded && response.filesUploaded.length > 0) {
          const newFiles = response.filesUploaded.map((file: any) => ({
            description: "Bedroom",
            mediaUrl: file.url,
            propertyMediaCategoryId: bedroomMediaCategoryId,
          }));
          setBedroomUploads((prevFiles) => [...prevFiles, ...newFiles]); // Use functional update to concatenate new files
        }
      },
    };
    const picker = client.picker(pickerOptions);
    picker.open();
    setIsBedroomPickerOpen(true);
  };

  const openOtherImagePicker = () => {
    const pickerOptions = {
      fromSources: ["local_file_system", "facebook", "instagram"],
      accept: ["image/*"],
      maxFiles: 4,
      maxSize: 4 * 1024 * 1024,
      transformations: {
        crop: true,
        rotate: true,
      },
      onUploadDone: (response: any) => {
        if (response.filesUploaded && response.filesUploaded.length > 0) {
          const newFiles = response.filesUploaded.map((file: any) => ({
            description: "Other images",
            mediaUrl: file.url,
            propertyMediaCategoryId: otherMediaCategoryId,
          }));
          setOtherUploads((prevFiles) => [...prevFiles, ...newFiles]); // Use functional update to concatenate new files
        }
      },
    };
    const picker = client.picker(pickerOptions);
    picker.open();
    setIsOtherImagePickerOpen(true);
  };

  const showFailureToast = (error: any) => {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: error?.message,
      duration: 3000,
    });
  };
  const showSuccessToast = () => {
    toast({
      title: "Successful!",
      description: "Your prototype has been successfully created",
      duration: 3000,
    });
  };

  const deleteLivingroomImage = (index: number) => {
    setLivingRoomUploads((prevUploads) =>
      prevUploads.filter((_, i) => i !== index)
    );
  };
  const deleteBedroomImage = (index: number) => {
    setBedroomUploads((prevUploads) =>
      prevUploads.filter((_, i) => i !== index)
    );
  };
  const deleteKitchenImage = (index: number) => {
    setKitchenUploads((prevUploads) =>
      prevUploads.filter((_, i) => i !== index)
    );
  };
  const deleteBathroomImage = (index: number) => {
    setBathroomUploads((prevUploads) =>
      prevUploads.filter((_, i) => i !== index)
    );
  };
  const deleteOtherMediaImage = (index: number) => {
    setOtherUploads((prevUploads) => prevUploads.filter((_, i) => i !== index));
  };

  const propertyMedia: UploadedFile[] = [
    ...uploadedFiles,
    ...livingRoomUploads,
    ...BedroomUploads,
    ...BathroomUploads,
    ...kitchenUploads,
    ...otherUploads,
  ];

  console.log(propertyMedia);

  const handleCreatePrototype = async (data: FormData) => {
    try {
      await createPrototypeMutation({
        variables: {
          categoryId: propertyCategoryId!,
          projectId: projectId!,
          prototypeMedia: propertyMedia,
          ...data,
        },
        refetchQueries: [GetPrototypeByProjectDocument],
      });
      showSuccessToast();
      router.push(`/dashboard/projects/viewproject?projectId=${projectId}`);
    } catch (error) {
      console.error(error);
      showFailureToast(error);
    }
  };

  if (getPropertyCategories.loading || getProjectById.loading) {
    return <Loader2 />;
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleCreatePrototype)}>
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
          <div className=" mt-8 text-primary-blue">
            <p className=" text-2xl font-semibold">
              Create Prototype - {projectName}
            </p>
            <p className=" font-light mt-2">
              Fill out the information below to create a new prototype
            </p>
            <div className=" flex flex-col gap-y-6 mt-5">
              <div className=" flex flex-row gap-x-8 justify-between">
                <div className=" w-1/2">
                  <label
                    htmlFor="prototypename"
                    className="block  leading-6 font-medium "
                  >
                    Prototype name
                  </label>
                  <div className="mt-2">
                    <input
                      id="prototypename"
                      type="text"
                      autoComplete="prototypename"
                      required
                      className="block w-full rounded-md border border-gray-300 text-[15px] py-2.5 px-4  placeholder:text-gray-400 sm:leading-6"
                      {...register("prototypeName")}
                    />
                  </div>
                </div>
                <div className=" w-1/2">
                  <div>
                    <label
                      htmlFor="prototypecategory"
                      className="block font-medium leading-6 "
                    >
                      Prototype category
                    </label>
                    <Select
                      value={propertyCategoryId!}
                      onValueChange={setPropertyCategoryId}
                    >
                      <SelectTrigger className="border mt-2 py-2.5 h-[46px] border-gray-300 rounded-md text-primary-blue focus:outline-none px-3">
                        <SelectValue
                          className=" placeholder:text-gray-500"
                          placeholder="Select"
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-white w-full z-[200] max-h-[300px] shadow-sm text-gray-800">
                        <SelectGroup>
                          {propertyCategories?.map((category) => (
                            <SelectItem
                              className="hover:bg-gray-100 px-4 pl-8 cursor-pointer py-2 text-[15px]"
                              key={category?.id}
                              value={category?.id!}
                            >
                              {category?.categoryName}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className=" w-full">
                <label
                  htmlFor="prototypedescription"
                  className="block  leading-6 font-medium "
                >
                  Prototype description
                </label>
                <Textarea
                  className=" mt-2 py-1 text-base text-primary-blue placeholder:font-light placeholder:text-[15px]"
                  placeholder="e.g This stunning property offers breathtaking ocean views and luxurious amenities..."
                  {...register("description")}
                />
              </div>
            </div>
          </div>
        </div>
        <div className=" px-14 mb-4">
          <div className=" text-primary-blue">
            <p className=" text-2xl font-semibold">Prototype images</p>
            <div className=" flex flex-col gap-y-3 mt-4">
              <div>
                <p className=" mb-3 text-lg">Banner image</p>
                <button
                  type="button"
                  onClick={openPicker}
                  className={` items-center flex-col gap-y-3 cursor-pointer justify-center flex  ${
                    uploadedFiles[0]
                      ? ""
                      : " bg-blue-50 bg-opacity-65 border border-dashed  border-gray-300 rounded h-[200px] w-[670px]"
                  }`}
                >
                  {uploadedFiles[0] ? (
                    <>
                      <div>
                        <Image
                          className=" object-cover rounded-md overflow-clip"
                          alt="banner"
                          width={670}
                          height={376}
                          src={uploadedFiles[0]?.mediaUrl}
                        />
                      </div>
                    </>
                  ) : (
                    <div className=" flex items-center justify-center flex-col gap-y-2">
                      <span className=" rounded-full p-3 bg-gray-200 bg-opacity-50">
                        <ImageIcon className=" text-blue-500" />
                      </span>

                      <p className=" font-light">
                        <span className="text-blue-500 mr-1 hover:underline hover:underline-offset-2">
                          Click to Upload
                        </span>
                        or drag and Drop
                      </p>
                    </div>
                  )}
                </button>
                <div className=" flex flex-col mt-5 gap-y-6 px-2 max-w-[670px]">
                  <div>
                    <div className="flex flex-row justify-between">
                      <p className="text-lg">Living room</p>
                      <button
                        type="button"
                        className=" flex items-center justify-center gap-x-2 rounded-sm "
                        onClick={openPickerLivingRoom}
                      >
                        <Plus className="w-5 h-5" />
                        Add images
                      </button>
                    </div>
                    <div className="mt-4 flex flex-col gap-y-3">
                      {livingRoomUploads.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <div className=" flex items-center gap-x-4">
                            <Image
                              width={48}
                              height={48}
                              src={file.mediaUrl}
                              alt={file.description}
                              className="w-12 h-12 rounded"
                            />
                            <p>{file.description}</p>
                          </div>
                          <div className=" flex items-center">
                            <button
                              type="button"
                              onClick={() => deleteLivingroomImage(index)}
                              className=" text-primary-orange flex flex-row items-center gap-x-2 text-sm"
                            >
                              <Trash2 className=" w-4 h-4" /> Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-row justify-between">
                      <p className="text-lg">Bathrooms</p>
                      <button
                        type="button"
                        className=" flex items-center justify-center gap-x-2 rounded-sm "
                        onClick={openPickerBathroom}
                      >
                        <Plus className="w-5 h-5" />
                        Add images
                      </button>
                    </div>
                    <div className="mt-4 flex flex-col gap-y-3">
                      {BathroomUploads.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <div className=" flex items-center gap-x-4">
                            <Image
                              width={48}
                              height={48}
                              src={file.mediaUrl}
                              alt={file.description}
                              className="w-12 h-12 rounded"
                            />
                            <p>{file.description}</p>
                          </div>
                          <div className=" flex items-center">
                            <button
                              type="button"
                              onClick={() => deleteBathroomImage(index)}
                              className=" text-primary-orange flex flex-row items-center gap-x-2 text-sm"
                            >
                              <Trash2 className=" w-4 h-4" /> Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-row justify-between">
                      <p className="text-lg">Kitchen</p>
                      <button
                        type="button"
                        className=" flex items-center justify-center gap-x-2 rounded-sm "
                        onClick={openPickerKitchen}
                      >
                        <Plus className="w-5 h-5" />
                        Add images
                      </button>
                    </div>
                    <div className="mt-4 flex flex-col gap-y-3">
                      {kitchenUploads.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <div className=" flex items-center gap-x-4">
                            <Image
                              width={48}
                              height={48}
                              src={file.mediaUrl}
                              alt={file.description}
                              className="w-12 h-12 rounded"
                            />
                            <p>{file.description}</p>
                          </div>
                          <div className=" flex items-center">
                            <button
                              type="button"
                              onClick={() => deleteKitchenImage(index)}
                              className=" text-primary-orange flex flex-row items-center gap-x-2 text-sm"
                            >
                              <Trash2 className=" w-4 h-4" /> Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-row justify-between">
                      <p className="text-lg">Bedrooms</p>
                      <button
                        type="button"
                        className=" flex items-center justify-center gap-x-2 rounded-sm "
                        onClick={openPickerBedroom}
                      >
                        <Plus className="w-5 h-5" />
                        Add images
                      </button>
                    </div>
                    <div className="mt-4 flex flex-col gap-y-3">
                      {BedroomUploads.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <div className=" flex items-center gap-x-4">
                            <Image
                              width={48}
                              height={48}
                              src={file.mediaUrl}
                              alt={file.description}
                              className="w-12 h-12 rounded "
                            />
                            <p>{file.description}</p>
                          </div>
                          <div className=" flex items-center">
                            <button
                              type="button"
                              onClick={() => deleteBedroomImage(index)}
                              className=" text-primary-orange flex flex-row items-center gap-x-2 text-sm"
                            >
                              <Trash2 className=" w-4 h-4" /> Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-row justify-between">
                      <p className="text-lg">Other</p>
                      <button
                        type="button"
                        className=" flex items-center justify-center gap-x-2 rounded-sm "
                        onClick={openOtherImagePicker}
                      >
                        <Plus className="w-5 h-5" />
                        Add images
                      </button>
                    </div>
                    <div className="mt-4 flex flex-col gap-y-3">
                      {otherUploads.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <div className=" flex items-center gap-x-4">
                            <Image
                              width={48}
                              height={48}
                              src={file.mediaUrl}
                              alt={file.description}
                              className="w-12 h-12 rounded "
                            />
                            <p>{file.description}</p>
                          </div>
                          <div className=" flex items-center">
                            <button
                              type="button"
                              onClick={() => deleteOtherMediaImage(index)}
                              className=" text-primary-orange flex flex-row items-center gap-x-2 text-sm"
                            >
                              <Trash2 className=" w-4 h-4" /> Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white border-t border-gray-200 shadow-md sticky bottom-0 h-[70px] gap-x-4 w-full flex px-[56px] justify-end ">
          <div className=" flex items-center">
            <button
              disabled={loading}
              type="submit"
              className={` flex focus:outline-none items-center h-[44px] rounded-md bg-primary-orange px-10 py-2.5 font-medium text-white ${
                loading ? " opacity-50" : ""
              }`}
            >
              {loading ? "Submitting" : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateProjectPrototype;
