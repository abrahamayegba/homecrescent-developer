"use client";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  GetPropertiesByCompanyDocument,
  useCreatePropertyMutation,
  useGetCitiesByStateIdQuery,
  useGetDeveloperCompanyByUserQuery,
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
import { useRouter } from "next/navigation";
import Loader2 from "@/components/loading/Loader2";

const pages = [
  {
    name: "Single properties",
    href: "/dashboard/singleproperties",
    current: false,
  },
  {
    name: "Create single property",
    href: "/dashboard/singleproperties/createsingleproperty",
    current: true,
  },
];

const pages2 = [
  {
    name: "Single properties",
    href: "/dashboard/singleproperties",
    current: false,
  },
  {
    name: "Create single property",
    href: "/dashboard/singleproperties/createsingleproperty",
    current: false,
  },
  {
    name: "Add images",
    href: "/dashboard/singleproperties/createsingleproperty",
    current: true,
  },
];

interface UploadedFile {
  description: string;
  mediaUrl: string;
  mediaCategoryId: string;
}

type FormData = {
  name: string;
  description: string;
  price: number;
  address: string;
  sizeSqft: number;
};

const CreateSingleproperty = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { register, handleSubmit, getValues, watch } = useForm<FormData>();
  const [stateId, setStateId] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [livingRoomUploads, setLivingRoomUploads] = useState<UploadedFile[]>(
    []
  );
  const [kitchenUploads, setKitchenUploads] = useState<UploadedFile[]>([]);
  const [BathroomUploads, setBathroomUploads] = useState<UploadedFile[]>([]);
  const [BedroomUploads, setBedroomUploads] = useState<UploadedFile[]>([]);
  const [otherUploads, setOtherUploads] = useState<UploadedFile[]>([]);
  const [bathrooms, setBathrooms] = useState("1");
  const [propertyCategoryId, setPropertyCategoryId] = useState("");
  const [bedrooms, setBedrooms] = useState("1");
  const [floors, setFloors] = useState("1");
  const [toilets, setToilets] = useState("1");
  const [dateCompleted, setDateCompleted] = useState("");
  const [parkingSpaces, setParkingSpaces] = useState("1");
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isLivingRoomPickerOpen, setIsLivingRoomPickerOpen] = useState(false);
  const [isKitchenPickerOpen, setIsKitchenPickerOpen] = useState(false);
  const [isBedroomPickerOpen, setIsBedroomPickerOpen] = useState(false);
  const [isBathroomPickerOpen, setIsBathroomPickerOpen] = useState(false);
  const [isOtherImagePickerOpen, setIsOtherImagePickerOpen] = useState(false);
  const [cityId, setCityId] = useState("");
  const getPropertyCategories = useGetPropertyCategoryQuery();
  const getDeveloperCompanyByUser = useGetDeveloperCompanyByUserQuery();
  const getStates = useGetStatesQuery();
  const states = getStates?.data?.getStates;
  const developerCompanyId =
    getDeveloperCompanyByUser?.data?.getDeveloperCompanyByUser?.id;
  const propertyCategories = getPropertyCategories?.data?.getPropertyCategories;

  useEffect(() => {
    if (states) {
      const lagosState = states.find((state) => state?.stateName === "Lagos");
      if (lagosState) {
        setStateId(lagosState?.id!);
      }
    }
    if (propertyCategories) {
      const defaultPropertyCategory = propertyCategories?.find(
        (property) => property?.categoryName === "Duplex"
      );
      if (defaultPropertyCategory) {
        setPropertyCategoryId(defaultPropertyCategory?.id!);
      }
    }
  }, [states, propertyCategories]);

  const getCitiesByStateId = useGetCitiesByStateIdQuery({
    variables: {
      stateId: stateId!,
    },
  });
  const cities = getCitiesByStateId.data?.getCitiesByStateId;
  const [isFurnished, setIsFurnished] = useState(false);
  const [propertyStep, setpropertyStep] = useState("createProperty");
  const [hasPool, setHasPool] = useState(false);
  const [hasGarden, setHasGarden] = useState(false);
  const [isNewConstruction, setIsNewConstruction] = useState(false);
  const [forRent, setForRent] = useState(true);
  const [canPayInstallment, setCanPayInstallment] = useState(false);
  const [canMortgage, setCanMortgage] = useState(false);
  const [date, setDate] = React.useState<Date>();
  const [openDatePopover, setOpenDatePopover] = useState(false);
  const apiKey = "Am510qpybQ3i95Kv17umgz";
  const client = filestack.init(apiKey);
  const [createPropertyMutation, { loading }] = useCreatePropertyMutation();

  const getPropertyStatuses = useGetPropertyStatusesQuery();
  const getPropertyOptions = useGetPropertyOptionsQuery();
  const completedProperty =
    getPropertyStatuses?.data?.getPropertyStatuses?.find(
      (property) => property?.propertyStatus === "Completed"
    );
  const completedPropertyStatusId = completedProperty
    ? completedProperty?.id
    : null;
  const propertyOptionToRent =
    getPropertyOptions?.data?.getPropertyOptions?.find(
      (property) => property?.propertyOption === "To Rent"
    );
  const propertyToRentId = propertyOptionToRent
    ? propertyOptionToRent?.id
    : null;

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

  const handleCheckboxChange = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter((prevValue) => !prevValue);
  };

  React.useEffect(() => {
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd").toString();
      setDateCompleted(formattedDate);
    }
  }, [date]);

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
              mediaCategoryId: bannerMediaCategoryId,
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow only numbers and specific control keys (backspace, delete, arrow keys, etc.)
    if (
      !(
        event.key === "Backspace" ||
        event.key === "Delete" ||
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight" ||
        event.key === "ArrowUp" ||
        event.key === "ArrowDown" ||
        event.key === "Home" ||
        event.key === "End" ||
        event.key === "." || // Allow decimal point if needed
        (event.key >= "0" && event.key <= "9")
      )
    ) {
      event.preventDefault(); // Prevent entering non-numeric characters
    }
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
            mediaCategoryId: livingRoomMediaCategoryId,
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
            mediaCategoryId: kitchenMediaCategoryId,
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
            mediaCategoryId: bathroomMediaCategoryId,
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
            mediaCategoryId: bedroomMediaCategoryId,
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
            mediaCategoryId: otherMediaCategoryId,
          }));
          setOtherUploads((prevFiles) => [...prevFiles, ...newFiles]); // Use functional update to concatenate new files
        }
      },
    };
    const picker = client.picker(pickerOptions);
    picker.open();
    setIsOtherImagePickerOpen(true);
  };

  const showPickerSuccessToast = (filename: any) => {
    toast({
      title: "Uploaded!",
      description: `${filename} has been successfully uploaded`,
      duration: 3000,
    });
  };
  const showFailureToast = (error: any) => {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: error?.message,
      duration: 3000,
    });
  };
  const showInputValidationToast = () => {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Fill in all required fields",
      duration: 2000,
    });
  };
  const showSuccessToast = () => {
    toast({
      title: "Successful!",
      description: "Your property has been successfully created",
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

  const propertyDetail = {
    address: getValues("address"),
    bedrooms: Number(bedrooms),
    floors: Number(floors),
    longitude: "3.04",
    latitude: "3.22",
    bathrooms: Number(bathrooms),
    toilets: Number(toilets),
    sizeSqft: getValues("sizeSqft"),
    dateCompleted: dateCompleted,
    parkingSpaces: Number(parkingSpaces),
    isNewConstruction: isNewConstruction,
    propertyOptionId: propertyToRentId!,
    hasGarden: hasGarden,
    hasPool: hasPool,
    isFurnished: isFurnished,
    canPayInstallment: canPayInstallment,
    canMortgage: canMortgage,
  };
  const propertyMedia: UploadedFile[] = [
    ...uploadedFiles,
    ...livingRoomUploads,
    ...BedroomUploads,
    ...BathroomUploads,
    ...kitchenUploads,
    ...otherUploads,
  ];

  const { name, price, sizeSqft, address, description } = watch();

  const handleNextStep = () => {
    if (
      !name ||
      !price ||
      !sizeSqft ||
      !address ||
      !description ||
      !dateCompleted ||
      !cityId ||
      !propertyCategoryId ||
      !stateId
    ) {
      showInputValidationToast();
      return;
    }
    setpropertyStep("addImages");
  };

  const handleCreateProperty = async (data: FormData) => {
    try {
      await createPropertyMutation({
        variables: {
          categoryId: propertyCategoryId!,
          cityId: cityId,
          propertyStatusId: completedPropertyStatusId!,
          developerCompanyId: developerCompanyId,
          propertyDetail: propertyDetail,
          propertyMedia: propertyMedia,
          ...data,
        },
        refetchQueries: [GetPropertiesByCompanyDocument],
      });
      showSuccessToast();
      router.push("/dashboard/singleproperties");
    } catch (error) {
      console.error(error);
      showFailureToast(error);
    }
  };

  if (getPropertyCategories.loading || getStates.loading) {
    return <Loader2 />;
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleCreateProperty)}>
        {propertyStep === "createProperty" ? (
          <>
            <div className=" py-9 px-14 mb-[70px]">
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
                <p className=" text-2xl font-semibold">Create Property</p>
                <p className=" font-light mt-2">
                  Fill out the infromation below to create a new property
                </p>
                <div className=" flex flex-col gap-y-6 mt-5">
                  <div className=" flex flex-row gap-x-8 justify-between">
                    <div className=" w-1/2">
                      <label
                        htmlFor="propertyname"
                        className="block  leading-6 font-medium "
                      >
                        Property name
                      </label>
                      <div className="mt-2">
                        <input
                          id="propertyname"
                          type="text"
                          autoComplete="propertyname"
                          required
                          className="block w-full rounded-md border border-gray-300 text-[15px] py-2.5 px-4  placeholder:text-gray-400 sm:leading-6"
                          {...register("name")}
                        />
                      </div>
                    </div>
                    <div className=" w-1/2">
                      <div>
                        <label
                          htmlFor="price"
                          className="block font-medium leading-6 "
                        >
                          Property price (₦)
                        </label>
                        <div className="mt-2 relative">
                          <span className="absolute inset-y-0 left-0 pl-3 mt-[1px] flex items-center text-gray-800">
                            ₦
                          </span>
                          <input
                            id="price"
                            type="tel"
                            required
                            onKeyDown={handleKeyDown}
                            className="pl-7 block w-full rounded-md border border-gray-300 py-2.5 px-4 placeholder:text-gray-400 sm:leading-6"
                            {...register("price", {
                              valueAsNumber: true,
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" flex flex-row gap-x-8 justify-between">
                    <div className=" w-1/2">
                      <label
                        htmlFor="propertysize"
                        className="block  leading-6 font-medium "
                      >
                        Property size (sqft)
                      </label>
                      <div className="mt-2">
                        <input
                          id="propertysize"
                          type="tel"
                          autoComplete="propertysize"
                          onKeyDown={handleKeyDown}
                          placeholder="e.g 1,000"
                          required
                          className="block w-full rounded-md border border-gray-300 text-[15px] py-2.5 px-4  placeholder:text-gray-400 sm:leading-6"
                          {...register("sizeSqft", {
                            valueAsNumber: true,
                          })}
                        />
                      </div>
                    </div>
                    <div className=" w-1/2">
                      <div>
                        <label
                          htmlFor="propertycategory"
                          className="block font-medium leading-6 "
                        >
                          Property category
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
                      htmlFor="propertydescription"
                      className="block  leading-6 font-medium "
                    >
                      Property description
                    </label>
                    <Textarea
                      className=" mt-2 text-base text-primary-blue placeholder:font-light placeholder:text-[15px]"
                      placeholder="e.g This stunning property offers breathtaking ocean views and luxurious amenities..."
                      {...register("description")}
                    />
                  </div>
                  <div className=" flex flex-col gap-y-3 mt-2">
                    <p className=" text-[20px] font-medium">
                      Property location
                    </p>
                    <div className=" flex flex-row gap-x-8 justify-between">
                      <div className=" w-1/2">
                        <label
                          htmlFor="state"
                          className="block  leading-6 font-medium "
                        >
                          State
                        </label>
                        <Select value={stateId!} onValueChange={setStateId}>
                          <SelectTrigger className="border mt-2 py-2.5 h-[46px] border-gray-300 rounded-md text-primary-blue focus:outline-none px-3">
                            <SelectValue
                              className=" placeholder:text-gray-500"
                              placeholder="Select state"
                            />
                          </SelectTrigger>
                          <SelectContent className="bg-white w-full z-[200] max-h-[300px] shadow-sm text-gray-800">
                            <SelectGroup>
                              {states?.map((state) => (
                                <SelectItem
                                  className="hover:bg-gray-100 px-4 pl-8 cursor-pointer py-2 text-[15px]"
                                  key={state?.id}
                                  value={state?.id!}
                                >
                                  {state?.stateName}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className=" w-1/2">
                        <div>
                          <label
                            htmlFor="city"
                            className="block font-medium leading-6 "
                          >
                            City
                          </label>
                          <Select value={cityId} onValueChange={setCityId}>
                            <SelectTrigger className="border mt-2 py-2.5 h-[46px] border-gray-300 rounded-md text-primary-blue focus:outline-none px-3">
                              <SelectValue
                                className=" placeholder:text-gray-500"
                                placeholder="Select city"
                              />
                            </SelectTrigger>
                            <SelectContent className="bg-white w-full z-[200] max-h-[300px] shadow-sm text-gray-800">
                              <SelectGroup>
                                {cities?.map((city) => (
                                  <SelectItem
                                    className="hover:bg-gray-100 px-4 pl-8 cursor-pointer py-2 text-[15px]"
                                    key={city?.id}
                                    value={city?.id!}
                                  >
                                    {city?.cityName}
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
                        htmlFor="propertydescription"
                        className="block  leading-6 font-medium "
                      >
                        Property address
                      </label>
                      <input
                        type="text"
                        className=" mt-2 text-base text-primary-blue border border-gray-300 rounded-md w-full py-2.5 px-3 placeholder:font-light placeholder:text-[15px]"
                        {...register("address")}
                      />
                    </div>
                  </div>
                  <div className=" flex flex-col gap-y-3 mt-2">
                    <p className=" text-[20px] font-medium">Property details</p>
                    <div className="grid grid-cols-4 gap-7 mt-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          disabled
                          checked={forRent}
                          className="hidden"
                        />
                        <div
                          className={`w-6 h-6 rounded border cursor-not-allowed border-gray-300 flex items-center justify-center transition-colors ${
                            forRent ? "bg-blue-500 border-blue-500" : "bg-white"
                          }`}
                        >
                          {forRent && (
                            <CheckIcon className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span>For Rent</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isFurnished}
                          onChange={() => handleCheckboxChange(setIsFurnished)}
                          className="hidden"
                        />
                        <div
                          className={`w-6 h-6 rounded border border-gray-300 flex items-center justify-center transition-colors ${
                            isFurnished
                              ? "bg-blue-500 border-blue-500"
                              : "bg-white"
                          }`}
                        >
                          {isFurnished && (
                            <CheckIcon className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span>Is Furnished</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={hasPool}
                          onChange={() => handleCheckboxChange(setHasPool)}
                          className="hidden"
                        />
                        <div
                          className={`w-6 h-6 rounded-md border border-gray-300 flex items-center justify-center transition-colors ${
                            hasPool ? "bg-blue-500 border-blue-500" : "bg-white"
                          }`}
                        >
                          {hasPool && (
                            <CheckIcon className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span>Has Pool</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={hasGarden}
                          onChange={() => handleCheckboxChange(setHasGarden)}
                          className="hidden"
                        />
                        <div
                          className={`w-6 h-6 rounded-md border border-gray-300 flex items-center justify-center transition-colors ${
                            hasGarden
                              ? "bg-blue-500 border-blue-500"
                              : "bg-white"
                          }`}
                        >
                          {hasGarden && (
                            <CheckIcon className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span>Has Garden</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isNewConstruction}
                          onChange={() =>
                            handleCheckboxChange(setIsNewConstruction)
                          }
                          className="hidden"
                        />
                        <div
                          className={`w-6 h-6 rounded-md border border-gray-300 flex items-center justify-center transition-colors ${
                            isNewConstruction
                              ? "bg-blue-500 border-blue-500"
                              : "bg-white"
                          }`}
                        >
                          {isNewConstruction && (
                            <CheckIcon className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span>Is New Construction</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={canPayInstallment}
                          onChange={() =>
                            handleCheckboxChange(setCanPayInstallment)
                          }
                          className="hidden"
                        />
                        <div
                          className={`w-6 h-6 rounded-md border border-gray-300 flex items-center justify-center transition-colors ${
                            canPayInstallment
                              ? "bg-blue-500 border-blue-500"
                              : "bg-white"
                          }`}
                        >
                          {canPayInstallment && (
                            <CheckIcon className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span>Can Pay Installment</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={canMortgage}
                          onChange={() => handleCheckboxChange(setCanMortgage)}
                          className="hidden"
                        />
                        <div
                          className={`w-6 h-6 rounded-md border border-gray-300 flex items-center justify-center transition-colors ${
                            canMortgage
                              ? "bg-blue-500 border-blue-500"
                              : "bg-white"
                          }`}
                        >
                          {canMortgage && (
                            <CheckIcon className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span>Can Mortgage</span>
                      </label>
                    </div>
                    <div className=" grid grid-cols-4 gap-x-8 gap-y-5 mt-3">
                      <div className=" gap-y-2 flex flex-col">
                        <label
                          htmlFor="floors"
                          className="block  leading-6 font-medium "
                        >
                          Floors
                        </label>
                        <Select
                          value={floors}
                          onValueChange={setFloors}
                          defaultValue={floors}
                        >
                          <SelectTrigger className="border py-2.5 h-[46px]  border-gray-300 rounded-md text-primary-blue focus:outline-none px-3">
                            <SelectValue className="" />
                          </SelectTrigger>
                          <SelectContent className="bg-white w-full z-[200] max-h-[300px] shadow-sm text-gray-800">
                            <SelectItem
                              className="hover:bg-gray-100 px-4 pl-9 cursor-pointer py-2 text-[15px]"
                              value="1"
                            >
                              1
                            </SelectItem>
                            <SelectItem
                              className="hover:bg-gray-100 px-4 pl-9 cursor-pointer py-2 text-[15px]"
                              value="2"
                            >
                              2
                            </SelectItem>
                            <SelectItem
                              className="hover:bg-gray-100 px-4 pl-9 cursor-pointer py-2 text-[15px]"
                              value="3"
                            >
                              3
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className=" gap-y-2 flex flex-col">
                        <label
                          htmlFor="state"
                          className="block  leading-6 font-medium "
                        >
                          Bedrooms
                        </label>
                        <Select
                          value={bedrooms}
                          onValueChange={setBedrooms}
                          defaultValue={bedrooms}
                        >
                          <SelectTrigger className="border py-2.5 h-[46px]  border-gray-300 rounded-md text-primary-blue focus:outline-none px-3">
                            <SelectValue className="" />
                          </SelectTrigger>
                          <SelectContent className="bg-white w-full z-[200] max-h-[300px] shadow-sm text-gray-800">
                            <SelectItem
                              className="hover:bg-gray-100 px-4 pl-9 cursor-pointer py-2 text-[15px]"
                              value="1"
                            >
                              1
                            </SelectItem>
                            <SelectItem
                              className="hover:bg-gray-100 px-4 pl-9 cursor-pointer py-2 text-[15px]"
                              value="2"
                            >
                              2
                            </SelectItem>
                            <SelectItem
                              className="hover:bg-gray-100 px-4 pl-9 cursor-pointer py-2 text-[15px]"
                              value="3"
                            >
                              3
                            </SelectItem>
                            <SelectItem
                              className="hover:bg-gray-100 px-4 pl-9 cursor-pointer py-2 text-[15px]"
                              value="4"
                            >
                              4
                            </SelectItem>
                            <SelectItem
                              className="hover:bg-gray-100 px-4 pl-9 cursor-pointer py-2 text-[15px]"
                              value="5"
                            >
                              5
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className=" ">
                        <div className=" gap-y-2 flex flex-col">
                          <label
                            htmlFor="city"
                            className="block font-medium leading-6 "
                          >
                            Baths
                          </label>
                          <Select
                            value={bathrooms}
                            onValueChange={setBathrooms}
                            defaultValue={bathrooms}
                          >
                            <SelectTrigger className="border py-2.5 h-[46px]  border-gray-300 rounded-md text-primary-blue focus:outline-none px-3">
                              <SelectValue className="" />
                            </SelectTrigger>
                            <SelectContent className="bg-white w-full z-[200] max-h-[300px] shadow-sm text-gray-800">
                              <SelectItem
                                className="hover:bg-gray-100 px-4 pl-9 cursor-pointer py-2 text-[15px]"
                                value="1"
                              >
                                1
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-gray-100 px-4 pl-9 cursor-pointer py-2 text-[15px]"
                                value="2"
                              >
                                2
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-gray-100 px-4 pl-9 cursor-pointer py-2 text-[15px]"
                                value="3"
                              >
                                3
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-gray-100 px-4 pl-9 cursor-pointer py-2 text-[15px]"
                                value="4"
                              >
                                4
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-gray-100 px-4 pl-9  cursor-pointer py-2 text-[15px]"
                                value="5"
                              >
                                5
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className=" ">
                        <div className=" gap-y-2 flex flex-col">
                          <label
                            htmlFor="city"
                            className="block font-medium leading-6 "
                          >
                            Toilets
                          </label>
                          <Select
                            value={toilets}
                            onValueChange={setToilets}
                            defaultValue={toilets}
                          >
                            <SelectTrigger className="border py-2.5 h-[46px]  border-gray-300 rounded-md text-primary-blue focus:outline-none px-3">
                              <SelectValue className="" />
                            </SelectTrigger>
                            <SelectContent className="bg-white w-full z-[200] max-h-[300px] shadow-sm text-gray-800">
                              <SelectItem
                                className="hover:bg-gray-100 px-4 pl-9  cursor-pointer py-2 text-[15px]"
                                value="1"
                              >
                                1
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-gray-100 px-4 pl-9  cursor-pointer py-2 text-[15px]"
                                value="2"
                              >
                                2
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-gray-100 px-4 pl-9 cursor-pointer py-2 text-[15px]"
                                value="3"
                              >
                                3
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-gray-100 px-4 pl-9 cursor-pointer py-2 text-[15px]"
                                value="4"
                              >
                                4
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-gray-100 px-4 pl-9  cursor-pointer py-2 text-[15px]"
                                value="5"
                              >
                                5
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className=" gap-y-2 flex flex-col">
                        <label
                          htmlFor="city"
                          className="block font-medium leading-6 "
                        >
                          Date completed
                        </label>
                        <Popover
                          open={openDatePopover}
                          onOpenChange={setOpenDatePopover}
                        >
                          <PopoverTrigger asChild>
                            <button
                              type="button"
                              className={cn(
                                "font-normal border border-gray-300 flex flex-row items-center rounded-md text-[15px] py-2.5 px-4  sm:leading-6",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <BsCalendar2Date className="mr-3 h-4 w-4" />
                              {date ? (
                                format(date, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={(date) => {
                                setDate(date);
                                setOpenDatePopover(false);
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className=" ">
                        <div className=" gap-y-2 flex flex-col">
                          <label
                            htmlFor="city"
                            className="block font-medium leading-6 "
                          >
                            Parking spaces
                          </label>
                          <Select
                            value={parkingSpaces}
                            onValueChange={setParkingSpaces}
                            defaultValue={parkingSpaces}
                          >
                            <SelectTrigger className="border py-2.5 h-[46px]  border-gray-300 rounded-md text-primary-blue focus:outline-none px-3">
                              <SelectValue className="" />
                            </SelectTrigger>
                            <SelectContent className="bg-white w-full z-[200] max-h-[300px] shadow-sm text-gray-800">
                              <SelectItem
                                className="hover:bg-gray-100 px-4 pl-9 cursor-pointer py-2 text-[15px]"
                                value="1"
                              >
                                1
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-gray-100 px-4 pl-9 cursor-pointer py-2 text-[15px]"
                                value="2"
                              >
                                2
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-gray-100 px-4 pl-9 cursor-pointer py-2 text-[15px]"
                                value="3"
                              >
                                3
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-gray-100 px-4 pl-9 cursor-pointer py-2 text-[15px]"
                                value="4"
                              >
                                4
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-gray-100 px-4 pl-9 cursor-pointer py-2 text-[15px]"
                                value="5"
                              >
                                5
                              </SelectItem>
                            </SelectContent>
                          </Select>
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
                  onClick={handleNextStep}
                  type="button"
                  className="flex disabled:opacity-50 focus:outline-none items-center rounded-md bg-primary-orange px-10 py-2.5 font-medium text-white"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className=" py-9 px-14 mb-[70px]">
              <nav className="flex" aria-label="Breadcrumb">
                <ol role="list" className="flex items-center gap-x-1">
                  <li>
                    <div>
                      <Link
                        href="/dashboard"
                        className=" text-primary-blue text-opacity-80 hover:text-gray-500"
                      >
                        <MdHome
                          className="h-5 w-5 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Home</span>
                      </Link>
                    </div>
                  </li>
                  {pages2.map((page) => (
                    <li className=" ml-2" key={page.name}>
                      <div className="flex items-center">
                        <ChevronRightIcon
                          className="h-5 w-5 flex-shrink-0 text-primary-blue"
                          aria-hidden="true"
                        />
                        <Link
                          href={page.href}
                          className={`ml-4 text-sm text-primary-blue hover:text-gray-700 ${
                            page.current ? " font-semibold" : ""
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
                <p className=" text-2xl font-semibold">Add images</p>
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
                  onClick={() => setpropertyStep("createProperty")}
                  type="button"
                  className="flex focus:outline-none items-center  gap-x-2 justify-center rounded-md pl-4 pr-7 py-2.5 h-[44px] font-medium text-primary-orange border border-primary-orange"
                >
                  <ChevronLeft />
                  Back
                </button>
              </div>
              <div className=" flex items-center">
                <button
                  disabled={loading}
                  onClick={() => setpropertyStep("addImages")}
                  type="submit"
                  className={` flex focus:outline-none items-center h-[44px] rounded-md bg-primary-orange px-10 py-2.5 font-medium text-white ${
                    loading ? " opacity-50" : ""
                  }`}
                >
                  {loading ? "Submitting" : "Submit"}
                </button>
              </div>
            </div>
          </>
        )}
      </form>
    </>
  );
};

export default CreateSingleproperty;
