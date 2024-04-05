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
  GetProjectByIdDocument,
  GetProjectsByCompanyDocument,
  useCreateProjectMutation,
  useGetCitiesByStateIdQuery,
  useGetDeveloperCompanyByUserQuery,
  useGetProjectMediaCategoriesQuery,
  useGetProjectStatusesQuery,
  useGetStatesQuery,
} from "@/src/generated/graphql";
import { ChevronLeft, ChevronRightIcon, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdHome } from "react-icons/md";
import * as filestack from "filestack-js";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Loader2 from "@/components/loading/Loader2";

const pages = [
  {
    name: "Projects",
    href: "/dashboard/projects",
    current: false,
  },
  {
    name: "Create project",
    href: "/dashboard/projects/createproject",
    current: true,
  },
];

const pages2 = [
  {
    name: "Projects",
    href: "/dashboard/createproject",
    current: false,
  },
  {
    name: "Create project",
    href: "/dashboard/projects/createproject",
    current: false,
  },
  {
    name: "Add images",
    href: "/dashboard/projects/createproject",
    current: true,
  },
];

interface UploadedFile {
  description: string;
  mediaUrl: string;
  projectMediaCategoryId: string;
}

type FormData = {
  projectName: string;
  description: string;
  address: string;
};

const CreateProject = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { register, handleSubmit, getValues, watch } = useForm<FormData>();
  const [stateId, setStateId] = useState<string | null>(null);
  const [mainProjectUploads, setMainProjectUploads] = useState<UploadedFile[]>(
    []
  );
  const [projectLayoutUploads, setProjectLayoutUploads] = useState<
    UploadedFile[]
  >([]);
  const [floorPlanUploads, setFloorPlanUploads] = useState<UploadedFile[]>([]);
  const [otherUploads, setOtherUploads] = useState<UploadedFile[]>([]);
  const [projectStep, setProjectStep] = useState("createProject");
  const [isProjectLayoutPickerOpen, setIsProjectLayoutPickerOpen] =
    useState(false);
  const [isMainProjectPickerOpen, setIsMainProjectPickerOpen] = useState(false);
  const [isFloorPlanPickerOpen, setIsFloorPlanPickerOpen] = useState(false);
  const [isOtherImagePickerOpen, setIsOtherImagePickerOpen] = useState(false);
  const [cityId, setCityId] = useState("");
  const getDeveloperCompanyByUser = useGetDeveloperCompanyByUserQuery();
  const getStates = useGetStatesQuery();
  const states = getStates?.data?.getStates;
  const developerCompanyId =
    getDeveloperCompanyByUser?.data?.getDeveloperCompanyByUser?.id;

  useEffect(() => {
    if (states) {
      const lagosState = states.find((state) => state?.stateName === "Lagos");
      if (lagosState) {
        setStateId(lagosState?.id!);
      }
    }
  }, [states]);

  const getProjectStatuses = useGetProjectStatusesQuery();
  const draftStatus = getProjectStatuses?.data?.getProjectStatuses?.find(
    (project) => project?.projectStatus === "Draft"
  );

  const draftStatusId = draftStatus ? draftStatus.id : null;

  const getProjectMediaCategories = useGetProjectMediaCategoriesQuery();

  const projectMediaCategories =
    getProjectMediaCategories?.data?.getProjectMediaCategories;
  const bannerMediaCategory = projectMediaCategories?.find(
    (project) => project?.mediaCategory === "Banner"
  );
  const bannerMediaCategoryId = bannerMediaCategory?.id;

  const projectLayoutMediaCategory = projectMediaCategories?.find(
    (project) => project?.mediaCategory === "PerspectiveOne"
  );
  const ProjectLayoutMediaCategoryId = projectLayoutMediaCategory?.id;

  const floorPlanMediaCategory = projectMediaCategories?.find(
    (project) => project?.mediaCategory === "PerspectiveTwo"
  );
  const floorPlanMediaCategoryId = floorPlanMediaCategory?.id;

  const otherMediaCategory = projectMediaCategories?.find(
    (project) => project?.mediaCategory === "Other"
  );
  const otherMediaCategoryId = otherMediaCategory?.id;

  const getCitiesByStateId = useGetCitiesByStateIdQuery({
    variables: {
      stateId: stateId!,
    },
  });
  const cities = getCitiesByStateId.data?.getCitiesByStateId;
  const apiKey = "Am510qpybQ3i95Kv17umgz";
  const client = filestack.init(apiKey);

  const handleNextStep = () => {
    if (!projectName || !address || !description || !cityId || !stateId) {
      showInputValidationToast();
      return;
    }
    setProjectStep("addImages");
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
      description: "Your project has been successfully created",
      duration: 3000,
    });
  };

  const openPickerMainProject = () => {
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
            description: "Main project image",
            mediaUrl: file.url,
            projectMediaCategoryId: bannerMediaCategoryId,
          }));
          setMainProjectUploads((prevFiles) => [...prevFiles, ...newFiles]); // Use functional update to concatenate new files
        }
      },
    };
    const picker = client.picker(pickerOptions);
    picker.open();
    setIsMainProjectPickerOpen(true);
  };
  const openPickerFloorPlan = () => {
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
            description: "Floor plan",
            mediaUrl: file.url,
            projectMediaCategoryId: floorPlanMediaCategoryId,
          }));
          setFloorPlanUploads((prevFiles) => [...prevFiles, ...newFiles]); // Use functional update to concatenate new files
        }
      },
    };
    const picker = client.picker(pickerOptions);
    picker.open();
    setIsFloorPlanPickerOpen(true);
  };
  const openPickerProjectlayout = () => {
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
            description: "Project layout",
            mediaUrl: file.url,
            projectMediaCategoryId: ProjectLayoutMediaCategoryId,
          }));
          setProjectLayoutUploads((prevFiles) => [...prevFiles, ...newFiles]); // Use functional update to concatenate new files
        }
      },
    };
    const picker = client.picker(pickerOptions);
    picker.open();
    setIsProjectLayoutPickerOpen(true);
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
            projectMediaCategoryId: otherMediaCategoryId,
          }));
          setOtherUploads((prevFiles) => [...prevFiles, ...newFiles]); // Use functional update to concatenate new files
        }
      },
    };
    const picker = client.picker(pickerOptions);
    picker.open();
    setIsOtherImagePickerOpen(true);
  };

  const deleteMainProjectImage = (index: number) => {
    setMainProjectUploads((prevUploads) =>
      prevUploads.filter((_, i) => i !== index)
    );
  };
  const deleteFloorPlanImage = (index: number) => {
    setFloorPlanUploads((prevUploads) =>
      prevUploads.filter((_, i) => i !== index)
    );
  };
  const deleteProjectLayoutImage = (index: number) => {
    setProjectLayoutUploads((prevUploads) =>
      prevUploads.filter((_, i) => i !== index)
    );
  };

  const deleteOtherMediaImage = (index: number) => {
    setOtherUploads((prevUploads) => prevUploads.filter((_, i) => i !== index));
  };

  const projectMedia: UploadedFile[] = [
    ...mainProjectUploads,
    ...projectLayoutUploads,
    ...floorPlanUploads,
    ...otherUploads,
  ];

  const { projectName, address, description } = watch();

  const [createProjectMutation, { loading }] = useCreateProjectMutation();

  const handleCreateProject = async (data: FormData) => {
    try {
      await createProjectMutation({
        variables: {
          cityId: cityId,
          projectStatusId: draftStatusId!,
          developerCompanyId: developerCompanyId,
          projectMedia: projectMedia,
          ...data,
        },
        refetchQueries: [GetProjectsByCompanyDocument, GetProjectByIdDocument],
      });
      showSuccessToast();
      router.push("/dashboard/projects");
    } catch (error) {
      console.error(error);
      showFailureToast(error);
    }
  };

  if (getDeveloperCompanyByUser.loading || getStates.loading) {
    return <Loader2 />;
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleCreateProject)}>
        {projectStep === "createProject" ? (
          <>
            <div className=" py-9 px-14 mb-[20px]">
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
                <p className=" text-2xl font-semibold">Create Project</p>
                <p className=" font-light mt-2">
                  Fill out the infromation below to create a new project
                </p>
                <div className=" flex flex-col gap-y-6 mt-5">
                  <div className=" flex flex-row gap-x-8 justify-between">
                    <div className=" w-full">
                      <label
                        htmlFor="projectname"
                        className="block  leading-6 font-medium "
                      >
                        Project name
                      </label>
                      <div className="mt-2">
                        <input
                          id="projectname"
                          type="text"
                          autoComplete="projectname"
                          required
                          className="block w-full rounded-md border border-gray-300 text-[15px] py-2.5 px-4  placeholder:text-gray-400 sm:leading-6"
                          {...register("projectName")}
                        />
                      </div>
                    </div>
                  </div>
                  <div className=" w-full">
                    <label
                      htmlFor="projectdescription"
                      className="block  leading-6 font-medium "
                    >
                      Project description
                    </label>
                    <Textarea
                      className=" mt-2 py-1 text-base text-primary-blue placeholder:font-light placeholder:text-[15px]"
                      placeholder="e.g This stunning property offers breathtaking ocean views and luxurious amenities..."
                      {...register("description")}
                    />
                  </div>
                  <div className=" flex flex-col gap-y-3 mt-2">
                    <p className=" text-[20px] font-medium">Project location</p>
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
                        htmlFor="address"
                        className="block  leading-6 font-medium "
                      >
                        Project address
                      </label>
                      <input
                        type="text"
                        className=" mt-2 text-base text-primary-blue border border-gray-300 rounded-md w-full py-2.5 px-3 placeholder:font-light placeholder:text-[15px]"
                        {...register("address")}
                      />
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
            <div className=" pt-9 px-14 h-screen">
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
                <p className=" text-2xl font-semibold">Add project images</p>
                <div className=" flex flex-col gap-y-3">
                  <div className=" flex flex-col mt-7 gap-y-6 px-2 max-w-[670px]">
                    <div>
                      <div className="flex flex-row justify-between">
                        <p className="text-lg">Main project images (min: 2)</p>
                        <button
                          type="button"
                          className=" flex items-center justify-center gap-x-2 rounded-sm "
                          onClick={openPickerMainProject}
                        >
                          <Plus className="w-5 h-5" />
                          Add images
                        </button>
                      </div>
                      <div className="mt-4 flex flex-col gap-y-3">
                        {mainProjectUploads.map((file, index) => (
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
                                onClick={() => deleteMainProjectImage(index)}
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
                        <p className="text-lg">Project layouts (min: 2)</p>
                        <button
                          type="button"
                          className=" flex items-center justify-center gap-x-2 rounded-sm "
                          onClick={openPickerProjectlayout}
                        >
                          <Plus className="w-5 h-5" />
                          Add images
                        </button>
                      </div>
                      <div className="mt-4 flex flex-col gap-y-3">
                        {projectLayoutUploads.map((file, index) => (
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
                                onClick={() => deleteProjectLayoutImage(index)}
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
                        <p className="text-lg">Floor plans (min: 2)</p>
                        <button
                          type="button"
                          className=" flex items-center justify-center gap-x-2 rounded-sm "
                          onClick={openPickerFloorPlan}
                        >
                          <Plus className="w-5 h-5" />
                          Add images
                        </button>
                      </div>
                      <div className="mt-4 flex flex-col gap-y-3">
                        {floorPlanUploads.map((file, index) => (
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
                                onClick={() => deleteFloorPlanImage(index)}
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
                        <p className="text-lg">Other images</p>
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
            <div className="bg-white border-t border-gray-200 shadow-md sticky bottom-0 h-[70px] gap-x-4 w-full flex px-[56px] justify-end mt-auto">
              <div className=" flex items-center">
                <button
                  onClick={() => setProjectStep("createProject")}
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
                  onClick={() => setProjectStep("addImages")}
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

export default CreateProject;
