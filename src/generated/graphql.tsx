// THIS IS A GENERATED FILE, use `npm run codegen` to regenerate
/* tslint:disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
};

export type Admin = {
  __typename?: 'Admin';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  fullname?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  mobile?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Role>;
  roleId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type AdminApprovePrequalification = {
  prequalificationId: Scalars['String']['input'];
  prequalificationStatusId: Scalars['Int']['input'];
};

export type AdminCreateInvite = {
  email: Scalars['String']['input'];
  fullname: Scalars['String']['input'];
  mobile: Scalars['String']['input'];
  roleId: Scalars['String']['input'];
};

export type AdminHandleInspectionSchedule = {
  inspectionStatusId: Scalars['Int']['input'];
  scheduleId: Scalars['String']['input'];
};

export type AdminInvite = {
  __typename?: 'AdminInvite';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  fullname?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  mobile?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Role>;
  roleId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type AdminSignUpAfterInvite = {
  inviteId: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type AdminSignUpResponse = {
  __typename?: 'AdminSignUpResponse';
  access_token: Scalars['String']['output'];
  email: Scalars['String']['output'];
  refresh_token: Scalars['String']['output'];
};

export type AdminSigninInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  twoFACode?: InputMaybe<Scalars['String']['input']>;
};

export type AdminSignupInput = {
  email: Scalars['String']['input'];
  fullname: Scalars['String']['input'];
  mobile: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type City = {
  __typename?: 'City';
  cityName?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  neighborhoods?: Maybe<Array<Maybe<Neighborhood>>>;
  projects?: Maybe<Array<Maybe<Project>>>;
  properties?: Maybe<Array<Maybe<Property>>>;
  state?: Maybe<State>;
  stateId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CompanyType = {
  __typename?: 'CompanyType';
  id?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type Country = {
  __typename?: 'Country';
  countryName?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  states?: Maybe<Array<Maybe<State>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CreateDeveloperCompany = {
  address?: InputMaybe<Scalars['String']['input']>;
  companyEmail: Scalars['String']['input'];
  companyMobile: Scalars['String']['input'];
  companyName: Scalars['String']['input'];
  companyTypeId: Scalars['Int']['input'];
  registrationNumber?: InputMaybe<Scalars['String']['input']>;
};

export type CreateInspectionSchedule = {
  dateScheduled: Scalars['DateTime']['input'];
  inspectionTypeId: Scalars['Int']['input'];
  propertyId: Scalars['String']['input'];
};

export type CreateInvestment = {
  description: Scalars['String']['input'];
  duration: Scalars['Int']['input'];
  investmentFrequencyId: Scalars['Int']['input'];
  startDate: Scalars['Date']['input'];
  totalAmount: Scalars['Float']['input'];
};

export type CreateInvestmentPayment = {
  amountPaid: Scalars['Float']['input'];
  datePaid: Scalars['DateTime']['input'];
  investmentId: Scalars['String']['input'];
  investmentPaymentScheduleId: Scalars['String']['input'];
  reference: Scalars['String']['input'];
  userWalletId: Scalars['String']['input'];
};

export type CreatePrequalification = {
  companyAddress?: InputMaybe<Scalars['String']['input']>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  fullname: Scalars['String']['input'];
  incomeMonthly: Scalars['Float']['input'];
  isJointApplication?: InputMaybe<Scalars['Boolean']['input']>;
  isSelfEmployed?: InputMaybe<Scalars['Boolean']['input']>;
  spouseEmail?: InputMaybe<Scalars['String']['input']>;
};

export type CreateProject = {
  address: Scalars['String']['input'];
  cityId: Scalars['String']['input'];
  description: Scalars['String']['input'];
  developerCompanyId?: InputMaybe<Scalars['String']['input']>;
  neighborhoodId?: InputMaybe<Scalars['String']['input']>;
  projectMedia?: InputMaybe<Array<InputMaybe<CreateProjectMedia>>>;
  projectName: Scalars['String']['input'];
  projectStatusId: Scalars['Int']['input'];
};

export type CreateProjectMedia = {
  description?: InputMaybe<Scalars['String']['input']>;
  index?: InputMaybe<Scalars['Int']['input']>;
  mediaUrl: Scalars['String']['input'];
  projectMediaCategoryId: Scalars['String']['input'];
};

export type CreateProperty = {
  categoryId: Scalars['String']['input'];
  cityId: Scalars['String']['input'];
  description: Scalars['String']['input'];
  developerCompanyId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  projectId?: InputMaybe<Scalars['String']['input']>;
  propertyDetail: CreatePropertyDetails;
  propertyMedia?: InputMaybe<Array<InputMaybe<CreatePropertyMedia>>>;
  propertyStatusId: Scalars['Int']['input'];
  prototypeId?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePropertyDetails = {
  address: Scalars['String']['input'];
  bathrooms: Scalars['Int']['input'];
  bedrooms: Scalars['Int']['input'];
  canMortgage?: InputMaybe<Scalars['Boolean']['input']>;
  canPayInstallment?: InputMaybe<Scalars['Boolean']['input']>;
  dateCompleted: Scalars['Date']['input'];
  floors: Scalars['Int']['input'];
  hasGarden?: InputMaybe<Scalars['Boolean']['input']>;
  hasPool?: InputMaybe<Scalars['Boolean']['input']>;
  isFurnished?: InputMaybe<Scalars['Boolean']['input']>;
  isNewConstruction?: InputMaybe<Scalars['Boolean']['input']>;
  latitude: Scalars['String']['input'];
  longitude: Scalars['String']['input'];
  neighborhoodId?: InputMaybe<Scalars['String']['input']>;
  parkingSpaces: Scalars['Int']['input'];
  propertyOptionId: Scalars['Int']['input'];
  sizeSqft: Scalars['Int']['input'];
  toilets: Scalars['Int']['input'];
};

export type CreatePropertyMedia = {
  description?: InputMaybe<Scalars['String']['input']>;
  index?: InputMaybe<Scalars['Int']['input']>;
  mediaCategoryId: Scalars['String']['input'];
  mediaUrl: Scalars['String']['input'];
};

export type CreatePrototype = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  projectId: Scalars['String']['input'];
  prototypeMedia?: InputMaybe<Array<InputMaybe<CreatePrototypeMedia>>>;
  prototypeName: Scalars['String']['input'];
};

export type CreatePrototypeMedia = {
  description?: InputMaybe<Scalars['String']['input']>;
  index?: InputMaybe<Scalars['Int']['input']>;
  mediaUrl: Scalars['String']['input'];
  propertyMediaCategoryId: Scalars['String']['input'];
};

export type DeveloperCompany = {
  __typename?: 'DeveloperCompany';
  address?: Maybe<Scalars['String']['output']>;
  companyEmail?: Maybe<Scalars['String']['output']>;
  companyLogo?: Maybe<Scalars['String']['output']>;
  companyMobile?: Maybe<Scalars['String']['output']>;
  companyName?: Maybe<Scalars['String']['output']>;
  companyType?: Maybe<CompanyType>;
  companyTypeId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  ownedBy?: Maybe<User>;
  ownedById?: Maybe<Scalars['String']['output']>;
  registrationNumber?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  vetted?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export type DeveloperHandleInspectionSchedule = {
  agentId?: InputMaybe<Scalars['String']['input']>;
  inspectionStatusId: Scalars['Int']['input'];
  scheduleId: Scalars['String']['input'];
};

export type DurationType = {
  __typename?: 'DurationType';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  durationType?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  propertyPurchaseRequests?: Maybe<Array<Maybe<PropertyPurchaseRequest>>>;
};

export type InspectionCalendarLog = {
  __typename?: 'InspectionCalendarLog';
  date?: Maybe<Scalars['String']['output']>;
  inspectionsForDay?: Maybe<Array<Maybe<InspectionSchedule>>>;
};

export type InspectionSchedule = {
  __typename?: 'InspectionSchedule';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dateScheduled?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  inspectionScheduleSlip?: Maybe<InspectionScheduleSlip>;
  inspectionStatus?: Maybe<InspectionStatus>;
  inspectionStatusId?: Maybe<Scalars['Int']['output']>;
  inspectionType?: Maybe<InspectionType>;
  inspectionTypeId?: Maybe<Scalars['Int']['output']>;
  property?: Maybe<Property>;
  propertyId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type InspectionScheduleSlip = {
  __typename?: 'InspectionScheduleSlip';
  agent?: Maybe<User>;
  agentId?: Maybe<Scalars['String']['output']>;
  approvedDate?: Maybe<Scalars['DateTime']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  developerCompany?: Maybe<DeveloperCompany>;
  developerCompanyId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  inspectionSchedule?: Maybe<InspectionSchedule>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type InspectionStatus = {
  __typename?: 'InspectionStatus';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  inspectionSchedules?: Maybe<Array<Maybe<InspectionSchedule>>>;
  inspectionStatus?: Maybe<Scalars['String']['output']>;
};

export type InspectionType = {
  __typename?: 'InspectionType';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  inspectionSchedules?: Maybe<Array<Maybe<InspectionSchedule>>>;
  inspectionType?: Maybe<Scalars['String']['output']>;
};

export type Investment = {
  __typename?: 'Investment';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  investmentFrequency?: Maybe<InvestmentFrequency>;
  investmentFrequencyId?: Maybe<Scalars['Int']['output']>;
  investmentPaymentSchedules?: Maybe<Array<Maybe<InvestmentPaymentSchedule>>>;
  investmentPayments?: Maybe<Array<Maybe<InvestmentPayment>>>;
  investmentState?: Maybe<InvestmentState>;
  investmentStateId?: Maybe<Scalars['Int']['output']>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  totalAmount?: Maybe<Scalars['Float']['output']>;
  totalPaid?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type InvestmentFrequency = {
  __typename?: 'InvestmentFrequency';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  investmentFrequency?: Maybe<Scalars['String']['output']>;
  investments?: Maybe<Array<Maybe<Investment>>>;
};

export type InvestmentPayment = {
  __typename?: 'InvestmentPayment';
  amountPaid?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  datePaid?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  investment?: Maybe<Investment>;
  investmentId?: Maybe<Scalars['String']['output']>;
  investmentPaymentSchedule?: Maybe<InvestmentPaymentSchedule>;
  investmentPaymentScheduleId?: Maybe<Scalars['String']['output']>;
  reference?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userWallet?: Maybe<UserWallet>;
  userWalletId?: Maybe<Scalars['String']['output']>;
};

export type InvestmentPaymentSchedule = {
  __typename?: 'InvestmentPaymentSchedule';
  amountDue?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dateDue?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  investment?: Maybe<Investment>;
  investmentId?: Maybe<Scalars['String']['output']>;
  investmentPayments?: Maybe<Array<Maybe<InvestmentPayment>>>;
  paid?: Maybe<Scalars['Boolean']['output']>;
  paymentStatus?: Maybe<PaymentStatus>;
  paymentStatusId?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type InvestmentState = {
  __typename?: 'InvestmentState';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  investmentState?: Maybe<Scalars['String']['output']>;
  investments?: Maybe<Array<Maybe<Investment>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addPropertyToWishlist?: Maybe<Scalars['Boolean']['output']>;
  adminApprovePrequalification?: Maybe<Scalars['Boolean']['output']>;
  adminHandleInspectionSchedule: Scalars['String']['output'];
  adminLogOut?: Maybe<Scalars['Boolean']['output']>;
  adminSignIn?: Maybe<AdminSignUpResponse>;
  adminSignUp?: Maybe<AdminSignUpResponse>;
  adminSignUpAfterInvite?: Maybe<AdminSignUpResponse>;
  createAdminInvite?: Maybe<AdminInvite>;
  createDeveloperCompany?: Maybe<DeveloperCompany>;
  createInspectionSchedule?: Maybe<InspectionSchedule>;
  createInvestment?: Maybe<Investment>;
  createPrequalification?: Maybe<Prequalification>;
  createProject?: Maybe<Project>;
  createProperty?: Maybe<Property>;
  createPrototype?: Maybe<Prototype>;
  deleteAllDeveloperCompanies?: Maybe<Scalars['Boolean']['output']>;
  deleteAllInspectionSchedules?: Maybe<Scalars['Boolean']['output']>;
  deleteAllInvestements?: Maybe<Scalars['Boolean']['output']>;
  deleteAllPrequalifications?: Maybe<Scalars['Boolean']['output']>;
  deleteAllProjects?: Maybe<Scalars['Boolean']['output']>;
  deleteAllProperties?: Maybe<Scalars['Boolean']['output']>;
  deleteAllPropertyCategories?: Maybe<Scalars['Boolean']['output']>;
  deleteAllPrototypes?: Maybe<Scalars['Boolean']['output']>;
  deleteAllUserWishlists?: Maybe<Scalars['Boolean']['output']>;
  deleteAllUsers?: Maybe<Scalars['Boolean']['output']>;
  deleteDeveloperCompany?: Maybe<Scalars['Boolean']['output']>;
  deleteInspectionSchedule?: Maybe<Scalars['Boolean']['output']>;
  deleteInvestment?: Maybe<Scalars['Boolean']['output']>;
  deletePrequalification?: Maybe<Scalars['Boolean']['output']>;
  deleteProject?: Maybe<Scalars['Boolean']['output']>;
  deleteProperty?: Maybe<Scalars['Boolean']['output']>;
  deletePropertyfromWishlist?: Maybe<Scalars['Boolean']['output']>;
  deletePrototype?: Maybe<Scalars['Boolean']['output']>;
  deleteUserByEmail?: Maybe<Scalars['Boolean']['output']>;
  deleteUserById?: Maybe<Scalars['Boolean']['output']>;
  developerHandleInspectionSchedule: InspectionScheduleSlip;
  endInvestment?: Maybe<Scalars['Boolean']['output']>;
  generateQrCodeDataURL: Scalars['String']['output'];
  logOut?: Maybe<Scalars['Boolean']['output']>;
  pauseInvestment?: Maybe<Scalars['Boolean']['output']>;
  resendVerificationCode?: Maybe<Scalars['Boolean']['output']>;
  resumeInvestment?: Maybe<Scalars['Boolean']['output']>;
  signIn?: Maybe<UserSignInResponse>;
  signUp?: Maybe<UserSignUpResponse>;
  turnOnTwoFactorAuth: Scalars['Boolean']['output'];
  updateDeveloperCompany?: Maybe<DeveloperCompany>;
  updateInspectionSchedule?: Maybe<InspectionSchedule>;
  updateInvestment?: Maybe<Investment>;
  updatePrequalification?: Maybe<Prequalification>;
  updateProject?: Maybe<Project>;
  updateProperty?: Maybe<Property>;
  updatePrototype?: Maybe<Prototype>;
  userCreateInvite?: Maybe<UserDeveloperInvite>;
  userSignUpAfterInvite?: Maybe<UserSignUpResponse>;
  verification?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationAddPropertyToWishlistArgs = {
  propertyId: Scalars['String']['input'];
};


export type MutationAdminApprovePrequalificationArgs = {
  input: AdminApprovePrequalification;
};


export type MutationAdminHandleInspectionScheduleArgs = {
  input: AdminHandleInspectionSchedule;
};


export type MutationAdminSignInArgs = {
  input: AdminSigninInput;
};


export type MutationAdminSignUpArgs = {
  input: AdminSignupInput;
};


export type MutationAdminSignUpAfterInviteArgs = {
  input: AdminSignUpAfterInvite;
};


export type MutationCreateAdminInviteArgs = {
  input?: InputMaybe<AdminCreateInvite>;
};


export type MutationCreateDeveloperCompanyArgs = {
  input?: InputMaybe<CreateDeveloperCompany>;
};


export type MutationCreateInspectionScheduleArgs = {
  input: CreateInspectionSchedule;
};


export type MutationCreateInvestmentArgs = {
  input: CreateInvestment;
};


export type MutationCreatePrequalificationArgs = {
  input: CreatePrequalification;
};


export type MutationCreateProjectArgs = {
  input: CreateProject;
};


export type MutationCreatePropertyArgs = {
  input: CreateProperty;
};


export type MutationCreatePrototypeArgs = {
  input: CreatePrototype;
};


export type MutationDeleteDeveloperCompanyArgs = {
  companyId: Scalars['String']['input'];
};


export type MutationDeleteInspectionScheduleArgs = {
  scheduleId: Scalars['String']['input'];
};


export type MutationDeleteInvestmentArgs = {
  investmentId: Scalars['String']['input'];
};


export type MutationDeletePrequalificationArgs = {
  prequalificationId: Scalars['String']['input'];
};


export type MutationDeleteProjectArgs = {
  projectId: Scalars['String']['input'];
};


export type MutationDeletePropertyArgs = {
  propertyId: Scalars['String']['input'];
};


export type MutationDeletePropertyfromWishlistArgs = {
  propertyId: Scalars['String']['input'];
};


export type MutationDeletePrototypeArgs = {
  prototypeId: Scalars['String']['input'];
};


export type MutationDeleteUserByEmailArgs = {
  email: Scalars['String']['input'];
};


export type MutationDeleteUserByIdArgs = {
  userId: Scalars['String']['input'];
};


export type MutationDeveloperHandleInspectionScheduleArgs = {
  input: DeveloperHandleInspectionSchedule;
};


export type MutationEndInvestmentArgs = {
  investmentId: Scalars['String']['input'];
};


export type MutationPauseInvestmentArgs = {
  investmentId: Scalars['String']['input'];
};


export type MutationResumeInvestmentArgs = {
  input?: InputMaybe<ResumeInvestment>;
};


export type MutationSignInArgs = {
  input: UserSigninInput;
};


export type MutationSignUpArgs = {
  input: UserSignUpInput;
};


export type MutationTurnOnTwoFactorAuthArgs = {
  twoFACode: Scalars['String']['input'];
};


export type MutationUpdateDeveloperCompanyArgs = {
  input?: InputMaybe<UpdateDeveloperCompany>;
};


export type MutationUpdateInspectionScheduleArgs = {
  input: UpdateInspectionSchedule;
};


export type MutationUpdateInvestmentArgs = {
  input: UpdateInvestment;
};


export type MutationUpdatePrequalificationArgs = {
  input: UpdatePrequalification;
};


export type MutationUpdateProjectArgs = {
  input: UpdateProject;
};


export type MutationUpdatePropertyArgs = {
  input: UpdateProperty;
};


export type MutationUpdatePrototypeArgs = {
  input: UpdatePrototype;
};


export type MutationUserCreateInviteArgs = {
  input?: InputMaybe<UserCreateInvite>;
};


export type MutationUserSignUpAfterInviteArgs = {
  input: UserSignUpAfterInvite;
};


export type MutationVerificationArgs = {
  code: Scalars['Float']['input'];
};

export type Neighborhood = {
  __typename?: 'Neighborhood';
  city?: Maybe<City>;
  cityId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  projects?: Maybe<Array<Maybe<Project>>>;
  propertyDetails?: Maybe<Array<Maybe<PropertyDetail>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PaymentStatus = {
  __typename?: 'PaymentStatus';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  paymentStatus?: Maybe<Scalars['String']['output']>;
};

export type Prequalification = {
  __typename?: 'Prequalification';
  companyAddress?: Maybe<Scalars['String']['output']>;
  companyName?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  fullname?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  incomeMonthly?: Maybe<Scalars['Float']['output']>;
  isJointApplication?: Maybe<Scalars['Boolean']['output']>;
  isSelfEmployed?: Maybe<Scalars['Boolean']['output']>;
  prequalificationStatus?: Maybe<PrequalificationStatus>;
  prequalificationStatusId?: Maybe<Scalars['Int']['output']>;
  spouseEmail?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type PrequalificationStatus = {
  __typename?: 'PrequalificationStatus';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  prequalificationStatus?: Maybe<Scalars['String']['output']>;
  prequalifications?: Maybe<Array<Maybe<Prequalification>>>;
};

export type Project = {
  __typename?: 'Project';
  address?: Maybe<Scalars['String']['output']>;
  city?: Maybe<City>;
  cityId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  developerCompany?: Maybe<DeveloperCompany>;
  developerCompanyId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  neighborhood?: Maybe<Neighborhood>;
  neighborhoodId?: Maybe<Scalars['String']['output']>;
  projectLayoutUrl?: Maybe<Scalars['String']['output']>;
  projectName?: Maybe<Scalars['String']['output']>;
  projectStatus?: Maybe<ProjectStatus>;
  projectStatusId?: Maybe<Scalars['Int']['output']>;
  projectsMedia?: Maybe<Array<Maybe<ProjectMedia>>>;
  properties?: Maybe<Array<Maybe<Property>>>;
  prototypes?: Maybe<Array<Maybe<Prototype>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type ProjectByCompanyResponse = {
  __typename?: 'ProjectByCompanyResponse';
  cursorId?: Maybe<Scalars['String']['output']>;
  projectsByCompany?: Maybe<Array<Maybe<Project>>>;
};

export type ProjectMedia = {
  __typename?: 'ProjectMedia';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  index?: Maybe<Scalars['Int']['output']>;
  mediaUrl?: Maybe<Scalars['String']['output']>;
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['String']['output']>;
  projectMediaCategory?: Maybe<ProjectMediaCategory>;
  projectMediaCategoryId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ProjectMediaCategory = {
  __typename?: 'ProjectMediaCategory';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  mediaCategory?: Maybe<Scalars['String']['output']>;
  projectsMedia?: Maybe<Array<Maybe<ProjectMedia>>>;
  required?: Maybe<Scalars['Boolean']['output']>;
};

export type ProjectStatus = {
  __typename?: 'ProjectStatus';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  projectStatus?: Maybe<Scalars['String']['output']>;
  projects?: Maybe<Array<Maybe<Project>>>;
};

export type Property = {
  __typename?: 'Property';
  category?: Maybe<PropertyCategory>;
  categoryId?: Maybe<Scalars['String']['output']>;
  city?: Maybe<City>;
  cityId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  developedBy?: Maybe<User>;
  developedById?: Maybe<Scalars['String']['output']>;
  developerCompany?: Maybe<DeveloperCompany>;
  developerCompanyId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['String']['output']>;
  propertiesCostHistory?: Maybe<Array<Maybe<PropertyCostHistory>>>;
  propertiesMedia?: Maybe<Array<Maybe<PropertyMedia>>>;
  propertyDetail?: Maybe<PropertyDetail>;
  propertyOwned?: Maybe<PropertyOwned>;
  propertyPurchaseRequests?: Maybe<Array<Maybe<PropertyPurchaseRequest>>>;
  propertyStatus?: Maybe<PropertyStatus>;
  propertyStatusId?: Maybe<Scalars['Int']['output']>;
  propertyUpdateRequests?: Maybe<Array<Maybe<PropertyUpdateRequest>>>;
  prototype?: Maybe<Prototype>;
  prototypeId?: Maybe<Scalars['String']['output']>;
  rents?: Maybe<Array<Maybe<PropertyRented>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PropertyCategory = {
  __typename?: 'PropertyCategory';
  categoryName?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  properties?: Maybe<Array<Maybe<Property>>>;
  prototypes?: Maybe<Array<Maybe<Prototype>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PropertyCostHistory = {
  __typename?: 'PropertyCostHistory';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  effectiveDate?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  property?: Maybe<Property>;
  propertyId?: Maybe<Scalars['String']['output']>;
};

export type PropertyDetail = {
  __typename?: 'PropertyDetail';
  address?: Maybe<Scalars['String']['output']>;
  bathrooms?: Maybe<Scalars['Int']['output']>;
  bedrooms?: Maybe<Scalars['Int']['output']>;
  canMortgage?: Maybe<Scalars['Boolean']['output']>;
  canPayInstallment?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dateCompleted?: Maybe<Scalars['Date']['output']>;
  floors?: Maybe<Scalars['Int']['output']>;
  hasGarden?: Maybe<Scalars['Boolean']['output']>;
  hasPool?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isFurnished?: Maybe<Scalars['Boolean']['output']>;
  isNewConstruction?: Maybe<Scalars['Boolean']['output']>;
  latitude?: Maybe<Scalars['String']['output']>;
  longitude?: Maybe<Scalars['String']['output']>;
  neighborhood?: Maybe<Neighborhood>;
  neighborhoodId?: Maybe<Scalars['String']['output']>;
  parkingSpaces?: Maybe<Scalars['Int']['output']>;
  property?: Maybe<Property>;
  propertyOption?: Maybe<PropertyOption>;
  propertyOptionId?: Maybe<Scalars['Int']['output']>;
  sizeSqft?: Maybe<Scalars['Int']['output']>;
  toilets?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PropertyMedia = {
  __typename?: 'PropertyMedia';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  index?: Maybe<Scalars['Int']['output']>;
  mediaUrl?: Maybe<Scalars['String']['output']>;
  property?: Maybe<Property>;
  propertyId?: Maybe<Scalars['String']['output']>;
  propertyMediaCategory?: Maybe<PropertyMediaCategory>;
  propertyMediaCategoryId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PropertyMediaCategory = {
  __typename?: 'PropertyMediaCategory';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  mediaCategory?: Maybe<Scalars['String']['output']>;
  propertiesMedia?: Maybe<Array<Maybe<PropertyMedia>>>;
  required?: Maybe<Scalars['Boolean']['output']>;
};

export type PropertyOption = {
  __typename?: 'PropertyOption';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  propertyDetails?: Maybe<Array<Maybe<PropertyDetail>>>;
  propertyOption?: Maybe<Scalars['String']['output']>;
};

export type PropertyOwned = {
  __typename?: 'PropertyOwned';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  property?: Maybe<Property>;
  propertyId?: Maybe<Scalars['String']['output']>;
  purchaseDate?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type PropertyPurchaseRequest = {
  __typename?: 'PropertyPurchaseRequest';
  approvalDate?: Maybe<Scalars['DateTime']['output']>;
  approved?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  durationType?: Maybe<DurationType>;
  durationTypeId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  property?: Maybe<Property>;
  propertyId?: Maybe<Scalars['String']['output']>;
  purchaseDuration?: Maybe<Scalars['Int']['output']>;
  purchaseRequestType?: Maybe<PurchaseRequestType>;
  purchaseRequestTypeId?: Maybe<Scalars['Int']['output']>;
  requestDate?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type PropertyRented = {
  __typename?: 'PropertyRented';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  property?: Maybe<Property>;
  propertyId?: Maybe<Scalars['String']['output']>;
  rentDateEnd?: Maybe<Scalars['DateTime']['output']>;
  rentDateStart?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type PropertyStatus = {
  __typename?: 'PropertyStatus';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  properties?: Maybe<Array<Maybe<Property>>>;
  propertyStatus?: Maybe<Scalars['String']['output']>;
};

export type PropertyUpdateRequest = {
  __typename?: 'PropertyUpdateRequest';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  property?: Maybe<Property>;
  propertyId?: Maybe<Scalars['String']['output']>;
  requestUpdateStatus?: Maybe<RequestUpdateStatus>;
  requestUpdateStatusId?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type Prototype = {
  __typename?: 'Prototype';
  category?: Maybe<PropertyCategory>;
  categoryId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  mediaUrl?: Maybe<Scalars['String']['output']>;
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['String']['output']>;
  properties?: Maybe<Array<Maybe<Property>>>;
  prototypeName?: Maybe<Scalars['String']['output']>;
  prototypesMedia?: Maybe<Array<Maybe<PrototypeMedia>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PrototypeMedia = {
  __typename?: 'PrototypeMedia';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  index?: Maybe<Scalars['Int']['output']>;
  mediaUrl?: Maybe<Scalars['String']['output']>;
  propertyMediaCategory?: Maybe<PropertyMediaCategory>;
  propertyMediaCategoryId?: Maybe<Scalars['String']['output']>;
  prototype?: Maybe<Prototype>;
  prototypeId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PurchaseRequestType = {
  __typename?: 'PurchaseRequestType';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  propertyPurchaseRequests?: Maybe<Array<Maybe<PropertyPurchaseRequest>>>;
  purchaseRequestType?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  adminGetInspectionSchedules?: Maybe<Array<Maybe<InspectionCalendarLog>>>;
  adminGetInvestments?: Maybe<Array<Maybe<Investment>>>;
  adminViewPrequalifications?: Maybe<Array<Maybe<Prequalification>>>;
  getAdminById?: Maybe<Admin>;
  getAdminRoles?: Maybe<Array<Maybe<Role>>>;
  getAllRoles?: Maybe<Array<Maybe<Role>>>;
  getAllUserWishlists?: Maybe<Array<Maybe<UserWishlist>>>;
  getAllUsers?: Maybe<Array<Maybe<User>>>;
  getCities?: Maybe<Array<Maybe<City>>>;
  getCitiesByStateId?: Maybe<Array<Maybe<City>>>;
  getCompanyTypes?: Maybe<Array<Maybe<CompanyType>>>;
  getDeveloperCompanies?: Maybe<Array<Maybe<DeveloperCompany>>>;
  getDeveloperCompanyById?: Maybe<DeveloperCompany>;
  getDeveloperCompanyByUser?: Maybe<DeveloperCompany>;
  getInpectionScheduleById?: Maybe<InspectionSchedule>;
  getInspectionScheduleByDeveloper?: Maybe<Array<Maybe<InspectionCalendarLog>>>;
  getInspectionSchedules?: Maybe<Array<Maybe<InspectionSchedule>>>;
  getInspectionStatus?: Maybe<Array<Maybe<InspectionStatus>>>;
  getInspectionTypes?: Maybe<Array<Maybe<InspectionType>>>;
  getInvestementsByUser?: Maybe<Array<Maybe<Investment>>>;
  getInvestments?: Maybe<Array<Maybe<Investment>>>;
  getPrequalificationById?: Maybe<Prequalification>;
  getPrequalifications?: Maybe<Array<Maybe<Prequalification>>>;
  getPrequalificationsByUser?: Maybe<Array<Maybe<Prequalification>>>;
  getProjectById?: Maybe<Project>;
  getProjectMediaCategories?: Maybe<Array<Maybe<ProjectMediaCategory>>>;
  getProjectStatuses?: Maybe<Array<Maybe<ProjectStatus>>>;
  getProjects?: Maybe<Array<Maybe<Project>>>;
  getProjectsByCompany?: Maybe<ProjectByCompanyResponse>;
  getProperties?: Maybe<Array<Maybe<Property>>>;
  getPropertiesByCompany?: Maybe<Array<Maybe<Property>>>;
  getPropertiesByProject?: Maybe<Array<Maybe<Property>>>;
  getPropertyByDeveloper?: Maybe<Array<Maybe<Property>>>;
  getPropertyById?: Maybe<Property>;
  getPropertyCategories?: Maybe<Array<Maybe<PropertyCategory>>>;
  getPropertyMediaCategories?: Maybe<Array<Maybe<PropertyMediaCategory>>>;
  getPropertyOptions?: Maybe<Array<Maybe<PropertyOption>>>;
  getPropertyStatuses?: Maybe<Array<Maybe<PropertyStatus>>>;
  getPrototypeById?: Maybe<Prototype>;
  getPrototypes?: Maybe<Array<Maybe<Prototype>>>;
  getPrototypesByProject?: Maybe<Array<Maybe<Prototype>>>;
  getStates?: Maybe<Array<Maybe<State>>>;
  getUserById?: Maybe<User>;
  getUserDeveloperRoles?: Maybe<Array<Maybe<Role>>>;
  getUserWishlistById?: Maybe<UserWishlist>;
  getUserWishlistsByUser?: Maybe<Array<Maybe<Property>>>;
  userGetInspectionSchedules?: Maybe<Array<Maybe<InspectionSchedule>>>;
};


export type QueryAdminGetInspectionSchedulesArgs = {
  monthValue?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetCitiesByStateIdArgs = {
  stateId: Scalars['String']['input'];
};


export type QueryGetDeveloperCompanyByIdArgs = {
  companyId: Scalars['String']['input'];
};


export type QueryGetInpectionScheduleByIdArgs = {
  scheduleId: Scalars['String']['input'];
};


export type QueryGetInspectionScheduleByDeveloperArgs = {
  monthValue?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetPrequalificationByIdArgs = {
  prequalificationId: Scalars['String']['input'];
};


export type QueryGetProjectByIdArgs = {
  projectId: Scalars['String']['input'];
};


export type QueryGetProjectsByCompanyArgs = {
  companyId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  sets?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetPropertiesByCompanyArgs = {
  companyId: Scalars['String']['input'];
};


export type QueryGetPropertiesByProjectArgs = {
  projectId: Scalars['String']['input'];
};


export type QueryGetPropertyByDeveloperArgs = {
  developerId: Scalars['String']['input'];
};


export type QueryGetPropertyByIdArgs = {
  propertyId: Scalars['String']['input'];
};


export type QueryGetPrototypeByIdArgs = {
  prototypeId: Scalars['String']['input'];
};


export type QueryGetPrototypesByProjectArgs = {
  projectId: Scalars['String']['input'];
};


export type QueryGetUserWishlistByIdArgs = {
  wishlistId: Scalars['String']['input'];
};

export type RequestUpdateStatus = {
  __typename?: 'RequestUpdateStatus';
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  propertyUpdateRequests?: Maybe<Array<Maybe<PropertyUpdateRequest>>>;
  requestUpdateStatus?: Maybe<Scalars['String']['output']>;
};

export type ResumeInvestment = {
  investmentId: Scalars['String']['input'];
  resumeDate: Scalars['Date']['input'];
};

export type Role = {
  __typename?: 'Role';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  roleDescription?: Maybe<Scalars['String']['output']>;
  roleName?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type State = {
  __typename?: 'State';
  cities?: Maybe<Array<Maybe<City>>>;
  country?: Maybe<Country>;
  countryId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  stateName?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TokenResponse = {
  __typename?: 'TokenResponse';
  access_token: Scalars['String']['output'];
  refresh_token: Scalars['String']['output'];
};

export type UpdateDeveloperCompany = {
  address?: InputMaybe<Scalars['String']['input']>;
  companyEmail?: InputMaybe<Scalars['String']['input']>;
  companyId: Scalars['String']['input'];
  companyLogo?: InputMaybe<Scalars['String']['input']>;
  companyMobile?: InputMaybe<Scalars['String']['input']>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  companyTypeId?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  registrationNumber?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateInspectionSchedule = {
  dateScheduled?: InputMaybe<Scalars['DateTime']['input']>;
  inspectionTypeId?: InputMaybe<Scalars['Int']['input']>;
  scheduleId: Scalars['String']['input'];
};

export type UpdateInvestment = {
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  investmentFrequencyId?: InputMaybe<Scalars['Int']['input']>;
  investmentId: Scalars['String']['input'];
  startDate?: InputMaybe<Scalars['Date']['input']>;
  totalAmount?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdatePrequalification = {
  companyAddress?: InputMaybe<Scalars['String']['input']>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  incomeMonthly?: InputMaybe<Scalars['Float']['input']>;
  isJointApplication?: InputMaybe<Scalars['Boolean']['input']>;
  isSelfEmployed?: InputMaybe<Scalars['Boolean']['input']>;
  prequalificationId: Scalars['String']['input'];
  spouseEmail?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProject = {
  address?: InputMaybe<Scalars['String']['input']>;
  cityId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  neighborhoodId?: InputMaybe<Scalars['String']['input']>;
  projectId: Scalars['String']['input'];
  projectLayoutUrl?: InputMaybe<Scalars['String']['input']>;
  projectMedia?: InputMaybe<Array<InputMaybe<CreateProjectMedia>>>;
  projectName?: InputMaybe<Scalars['String']['input']>;
  projectStatusId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateProperty = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
  cityId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  projectId?: InputMaybe<Scalars['String']['input']>;
  propertyDetail?: InputMaybe<UpdatePropertyDetails>;
  propertyId: Scalars['String']['input'];
  propertyMedia?: InputMaybe<Array<InputMaybe<CreatePropertyMedia>>>;
  propertyStatusId?: InputMaybe<Scalars['Int']['input']>;
  prototypeId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePropertyDetails = {
  address?: InputMaybe<Scalars['String']['input']>;
  bathrooms?: InputMaybe<Scalars['Int']['input']>;
  bedrooms?: InputMaybe<Scalars['Int']['input']>;
  canMortgage?: InputMaybe<Scalars['Boolean']['input']>;
  canPayInstallment?: InputMaybe<Scalars['Boolean']['input']>;
  dateCompleted?: InputMaybe<Scalars['Date']['input']>;
  floors?: InputMaybe<Scalars['Int']['input']>;
  hasGarden?: InputMaybe<Scalars['Boolean']['input']>;
  hasPool?: InputMaybe<Scalars['Boolean']['input']>;
  isFurnished?: InputMaybe<Scalars['Boolean']['input']>;
  isNewConstruction?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['String']['input']>;
  neighborhoodId?: InputMaybe<Scalars['String']['input']>;
  parkingSpaces?: InputMaybe<Scalars['Int']['input']>;
  propertyOptionId?: InputMaybe<Scalars['Int']['input']>;
  sizeSqft?: InputMaybe<Scalars['Int']['input']>;
  toilets?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdatePrototype = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  mediaUrl?: InputMaybe<Scalars['String']['input']>;
  prototypeId: Scalars['String']['input'];
  prototypeName?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  fullname?: Maybe<Scalars['String']['output']>;
  hasCompany?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isDeveloper?: Maybe<Scalars['Boolean']['output']>;
  mobile?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Role>;
  roleId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userWallet?: Maybe<UserWallet>;
  vetted?: Maybe<Scalars['Boolean']['output']>;
};

export type UserCreateInvite = {
  developerCompanyId: Scalars['String']['input'];
  email: Scalars['String']['input'];
  fullname: Scalars['String']['input'];
  mobile: Scalars['String']['input'];
  roleId: Scalars['String']['input'];
};

export type UserDeveloperCompany = {
  __typename?: 'UserDeveloperCompany';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  developerCompany?: Maybe<DeveloperCompany>;
  developerCompanyId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isOwner?: Maybe<Scalars['Boolean']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type UserDeveloperInvite = {
  __typename?: 'UserDeveloperInvite';
  accepted?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  developerCompany?: Maybe<DeveloperCompany>;
  developerCompanyId?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  fullname?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  mobile?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Role>;
  roleId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UserSignInResponse = {
  __typename?: 'UserSignInResponse';
  hasDeveloperCompany?: Maybe<Scalars['Boolean']['output']>;
  token?: Maybe<TokenResponse>;
  user?: Maybe<User>;
  verified?: Maybe<Scalars['Boolean']['output']>;
  vetted?: Maybe<Scalars['Boolean']['output']>;
};

export type UserSignUpAfterInvite = {
  inviteId: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UserSignUpInput = {
  email: Scalars['String']['input'];
  fullname: Scalars['String']['input'];
  hasCompany?: InputMaybe<Scalars['Boolean']['input']>;
  isDeveloper?: InputMaybe<Scalars['Boolean']['input']>;
  mobile: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UserSignUpResponse = {
  __typename?: 'UserSignUpResponse';
  token?: Maybe<TokenResponse>;
  user?: Maybe<User>;
};

export type UserSigninInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UserWallet = {
  __typename?: 'UserWallet';
  accountNumber?: Maybe<Scalars['String']['output']>;
  balance?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  investmentPayments?: Maybe<Array<Maybe<InvestmentPayment>>>;
  savings?: Maybe<Scalars['Float']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type UserWishlist = {
  __typename?: 'UserWishlist';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  property?: Maybe<Property>;
  propertyId?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type AdminSigninMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  twoFACode: Scalars['String']['input'];
}>;


export type AdminSigninMutation = { __typename?: 'Mutation', adminSignIn?: { __typename?: 'AdminSignUpResponse', access_token: string, refresh_token: string } | null };

export type CreateDeveloperCompanyMutationVariables = Exact<{
  companyName: Scalars['String']['input'];
  companyEmail: Scalars['String']['input'];
  companyMobile: Scalars['String']['input'];
  companyTypeId: Scalars['Int']['input'];
  registrationNumber?: InputMaybe<Scalars['String']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateDeveloperCompanyMutation = { __typename?: 'Mutation', createDeveloperCompany?: { __typename?: 'DeveloperCompany', id?: string | null, companyName?: string | null, companyEmail?: string | null, createdAt?: any | null } | null };

export type CreateProjectMutationVariables = Exact<{
  projectName: Scalars['String']['input'];
  description: Scalars['String']['input'];
  address: Scalars['String']['input'];
  cityId: Scalars['String']['input'];
  projectStatusId: Scalars['Int']['input'];
  developerCompanyId?: InputMaybe<Scalars['String']['input']>;
  neighborhoodId?: InputMaybe<Scalars['String']['input']>;
  projectMedia?: InputMaybe<Array<InputMaybe<CreateProjectMedia>> | InputMaybe<CreateProjectMedia>>;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject?: { __typename?: 'Project', id?: string | null, projectName?: string | null, address?: string | null } | null };

export type CreatePropertyMutationVariables = Exact<{
  name: Scalars['String']['input'];
  description: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  categoryId: Scalars['String']['input'];
  propertyStatusId: Scalars['Int']['input'];
  projectId?: InputMaybe<Scalars['String']['input']>;
  prototypeId?: InputMaybe<Scalars['String']['input']>;
  cityId: Scalars['String']['input'];
  developerCompanyId?: InputMaybe<Scalars['String']['input']>;
  propertyDetail: CreatePropertyDetails;
  propertyMedia?: InputMaybe<Array<InputMaybe<CreatePropertyMedia>> | InputMaybe<CreatePropertyMedia>>;
}>;


export type CreatePropertyMutation = { __typename?: 'Mutation', createProperty?: { __typename?: 'Property', id?: string | null, name?: string | null, description?: string | null, price?: number | null, createdAt?: any | null } | null };

export type CreatePrototypeMutationVariables = Exact<{
  prototypeName: Scalars['String']['input'];
  description: Scalars['String']['input'];
  projectId: Scalars['String']['input'];
  categoryId?: InputMaybe<Scalars['String']['input']>;
  prototypeMedia?: InputMaybe<Array<InputMaybe<CreatePrototypeMedia>> | InputMaybe<CreatePrototypeMedia>>;
}>;


export type CreatePrototypeMutation = { __typename?: 'Mutation', createPrototype?: { __typename?: 'Prototype', id?: string | null, prototypeName?: string | null } | null };

export type GetAllRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRolesQuery = { __typename?: 'Query', getAllRoles?: Array<{ __typename?: 'Role', id?: string | null, roleName?: string | null, createdAt?: any | null } | null> | null };

export type GetCitiesByStateIdQueryVariables = Exact<{
  stateId: Scalars['String']['input'];
}>;


export type GetCitiesByStateIdQuery = { __typename?: 'Query', getCitiesByStateId?: Array<{ __typename?: 'City', id?: string | null, cityName?: string | null, stateId?: string | null } | null> | null };

export type GetCompanyTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCompanyTypesQuery = { __typename?: 'Query', getCompanyTypes?: Array<{ __typename?: 'CompanyType', id?: number | null, type?: string | null } | null> | null };

export type GetDeveloperCompanyByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDeveloperCompanyByUserQuery = { __typename?: 'Query', getDeveloperCompanyByUser?: { __typename?: 'DeveloperCompany', id?: string | null, companyName?: string | null, companyEmail?: string | null, createdAt?: any | null, companyType?: { __typename?: 'CompanyType', id?: number | null, type?: string | null } | null } | null };

export type GetProjectByIdQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;


export type GetProjectByIdQuery = { __typename?: 'Query', getProjectById?: { __typename?: 'Project', id?: string | null, projectName?: string | null, description?: string | null, cityId?: string | null, address?: string | null, city?: { __typename?: 'City', cityName?: string | null, state?: { __typename?: 'State', stateName?: string | null } | null } | null, projectsMedia?: Array<{ __typename?: 'ProjectMedia', mediaUrl?: string | null, projectMediaCategoryId?: string | null, projectMediaCategory?: { __typename?: 'ProjectMediaCategory', mediaCategory?: string | null } | null } | null> | null, prototypes?: Array<{ __typename?: 'Prototype', prototypeName?: string | null, description?: string | null, prototypesMedia?: Array<{ __typename?: 'PrototypeMedia', mediaUrl?: string | null, propertyMediaCategoryId?: string | null, propertyMediaCategory?: { __typename?: 'PropertyMediaCategory', mediaCategory?: string | null } | null } | null> | null } | null> | null, properties?: Array<{ __typename?: 'Property', description?: string | null, name?: string | null, price?: number | null, id?: string | null, propertyDetail?: { __typename?: 'PropertyDetail', address?: string | null, bedrooms?: number | null, bathrooms?: number | null, sizeSqft?: number | null } | null, propertiesMedia?: Array<{ __typename?: 'PropertyMedia', mediaUrl?: string | null, propertyMediaCategoryId?: string | null, propertyMediaCategory?: { __typename?: 'PropertyMediaCategory', mediaCategory?: string | null } | null } | null> | null } | null> | null } | null };

export type GetProjectMediaCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectMediaCategoriesQuery = { __typename?: 'Query', getProjectMediaCategories?: Array<{ __typename?: 'ProjectMediaCategory', id?: string | null, mediaCategory?: string | null, required?: boolean | null } | null> | null };

export type GetProjectStatusesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectStatusesQuery = { __typename?: 'Query', getProjectStatuses?: Array<{ __typename?: 'ProjectStatus', projectStatus?: string | null, id?: number | null } | null> | null };

export type GetProjectsByCompanyQueryVariables = Exact<{
  companyId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  sets?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetProjectsByCompanyQuery = { __typename?: 'Query', getProjectsByCompany?: { __typename?: 'ProjectByCompanyResponse', cursorId?: string | null, projectsByCompany?: Array<{ __typename?: 'Project', id?: string | null, projectName?: string | null, description?: string | null, address?: string | null, cityId?: string | null, projectsMedia?: Array<{ __typename?: 'ProjectMedia', mediaUrl?: string | null, projectMediaCategoryId?: string | null, projectMediaCategory?: { __typename?: 'ProjectMediaCategory', mediaCategory?: string | null } | null } | null> | null } | null> | null } | null };

export type GetPropertiesByCompanyQueryVariables = Exact<{
  companyId: Scalars['String']['input'];
}>;


export type GetPropertiesByCompanyQuery = { __typename?: 'Query', getPropertiesByCompany?: Array<{ __typename?: 'Property', id?: string | null, description?: string | null, price?: number | null, propertyStatus?: { __typename?: 'PropertyStatus', propertyStatus?: string | null } | null, propertyDetail?: { __typename?: 'PropertyDetail', longitude?: string | null, floors?: number | null, bedrooms?: number | null, bathrooms?: number | null, sizeSqft?: number | null, address?: string | null } | null, propertiesMedia?: Array<{ __typename?: 'PropertyMedia', id?: string | null, mediaUrl?: string | null, propertyMediaCategory?: { __typename?: 'PropertyMediaCategory', mediaCategory?: string | null } | null } | null> | null } | null> | null };

export type GetPropertyByIdQueryVariables = Exact<{
  propertyId: Scalars['String']['input'];
}>;


export type GetPropertyByIdQuery = { __typename?: 'Query', getPropertyById?: { __typename?: 'Property', id?: string | null, name?: string | null, description?: string | null, price?: number | null, cityId?: string | null, city?: { __typename?: 'City', cityName?: string | null, state?: { __typename?: 'State', stateName?: string | null } | null } | null, propertyStatus?: { __typename?: 'PropertyStatus', propertyStatus?: string | null } | null, propertyDetail?: { __typename?: 'PropertyDetail', longitude?: string | null, floors?: number | null, isFurnished?: boolean | null, isNewConstruction?: boolean | null, hasPool?: boolean | null, hasGarden?: boolean | null, canMortgage?: boolean | null, canPayInstallment?: boolean | null, dateCompleted?: any | null, parkingSpaces?: number | null, bedrooms?: number | null, bathrooms?: number | null, sizeSqft?: number | null, address?: string | null } | null, propertiesMedia?: Array<{ __typename?: 'PropertyMedia', id?: string | null, mediaUrl?: string | null, propertyMediaCategory?: { __typename?: 'PropertyMediaCategory', mediaCategory?: string | null } | null } | null> | null } | null };

export type GetPropertyCategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPropertyCategoryQuery = { __typename?: 'Query', getPropertyCategories?: Array<{ __typename?: 'PropertyCategory', categoryName?: string | null, id?: string | null } | null> | null };

export type GetPropertyMediaCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPropertyMediaCategoriesQuery = { __typename?: 'Query', getPropertyMediaCategories?: Array<{ __typename?: 'PropertyMediaCategory', id?: string | null, mediaCategory?: string | null } | null> | null };

export type GetPropertyOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPropertyOptionsQuery = { __typename?: 'Query', getPropertyOptions?: Array<{ __typename?: 'PropertyOption', propertyOption?: string | null, id?: number | null } | null> | null };

export type GetPropertyStatusesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPropertyStatusesQuery = { __typename?: 'Query', getPropertyStatuses?: Array<{ __typename?: 'PropertyStatus', propertyStatus?: string | null, id?: number | null } | null> | null };

export type GetPrototypeByProjectQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;


export type GetPrototypeByProjectQuery = { __typename?: 'Query', getPrototypesByProject?: Array<{ __typename?: 'Prototype', id?: string | null, prototypeName?: string | null, description?: string | null, createdAt?: any | null, prototypesMedia?: Array<{ __typename?: 'PrototypeMedia', mediaUrl?: string | null, propertyMediaCategoryId?: string | null, propertyMediaCategory?: { __typename?: 'PropertyMediaCategory', mediaCategory?: string | null } | null } | null> | null } | null> | null };

export type GetStatesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStatesQuery = { __typename?: 'Query', getStates?: Array<{ __typename?: 'State', stateName?: string | null, id?: string | null } | null> | null };

export type GetUserByIdQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserByIdQuery = { __typename?: 'Query', getUserById?: { __typename?: 'User', id?: string | null, fullname?: string | null, email?: string | null, mobile?: string | null, vetted?: boolean | null, isDeveloper?: boolean | null, hasCompany?: boolean | null, roleId?: string | null, createdAt?: any | null, role?: { __typename?: 'Role', roleName?: string | null, roleDescription?: string | null, id?: string | null } | null } | null };

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = { __typename?: 'Mutation', logOut?: boolean | null };

export type SignInMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn?: { __typename?: 'UserSignInResponse', verified?: boolean | null, vetted?: boolean | null, hasDeveloperCompany?: boolean | null, token?: { __typename?: 'TokenResponse', access_token: string, refresh_token: string } | null, user?: { __typename?: 'User', fullname?: string | null, id?: string | null, email?: string | null, mobile?: string | null, hasCompany?: boolean | null } | null } | null };

export type SignUpMutationVariables = Exact<{
  email: Scalars['String']['input'];
  fullname: Scalars['String']['input'];
  mobile: Scalars['String']['input'];
  password: Scalars['String']['input'];
  isDeveloper?: InputMaybe<Scalars['Boolean']['input']>;
  hasCompany?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp?: { __typename?: 'UserSignUpResponse', token?: { __typename?: 'TokenResponse', access_token: string, refresh_token: string } | null, user?: { __typename?: 'User', fullname?: string | null, id?: string | null, email?: string | null, mobile?: string | null } | null } | null };


export const AdminSigninDocument = gql`
    mutation AdminSignin($email: String!, $password: String!, $twoFACode: String!) {
  adminSignIn(input: {email: $email, password: $password, twoFACode: $twoFACode}) {
    access_token
    refresh_token
  }
}
    `;
export type AdminSigninMutationFn = Apollo.MutationFunction<AdminSigninMutation, AdminSigninMutationVariables>;

/**
 * __useAdminSigninMutation__
 *
 * To run a mutation, you first call `useAdminSigninMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminSigninMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminSigninMutation, { data, loading, error }] = useAdminSigninMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      twoFACode: // value for 'twoFACode'
 *   },
 * });
 */
export function useAdminSigninMutation(baseOptions?: Apollo.MutationHookOptions<AdminSigninMutation, AdminSigninMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminSigninMutation, AdminSigninMutationVariables>(AdminSigninDocument, options);
      }
export type AdminSigninMutationHookResult = ReturnType<typeof useAdminSigninMutation>;
export type AdminSigninMutationResult = Apollo.MutationResult<AdminSigninMutation>;
export type AdminSigninMutationOptions = Apollo.BaseMutationOptions<AdminSigninMutation, AdminSigninMutationVariables>;
export const CreateDeveloperCompanyDocument = gql`
    mutation CreateDeveloperCompany($companyName: String!, $companyEmail: String!, $companyMobile: String!, $companyTypeId: Int!, $registrationNumber: String, $address: String) {
  createDeveloperCompany(
    input: {companyName: $companyName, companyEmail: $companyEmail, companyMobile: $companyMobile, companyTypeId: $companyTypeId, registrationNumber: $registrationNumber, address: $address}
  ) {
    id
    companyName
    companyEmail
    createdAt
  }
}
    `;
export type CreateDeveloperCompanyMutationFn = Apollo.MutationFunction<CreateDeveloperCompanyMutation, CreateDeveloperCompanyMutationVariables>;

/**
 * __useCreateDeveloperCompanyMutation__
 *
 * To run a mutation, you first call `useCreateDeveloperCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDeveloperCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDeveloperCompanyMutation, { data, loading, error }] = useCreateDeveloperCompanyMutation({
 *   variables: {
 *      companyName: // value for 'companyName'
 *      companyEmail: // value for 'companyEmail'
 *      companyMobile: // value for 'companyMobile'
 *      companyTypeId: // value for 'companyTypeId'
 *      registrationNumber: // value for 'registrationNumber'
 *      address: // value for 'address'
 *   },
 * });
 */
export function useCreateDeveloperCompanyMutation(baseOptions?: Apollo.MutationHookOptions<CreateDeveloperCompanyMutation, CreateDeveloperCompanyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDeveloperCompanyMutation, CreateDeveloperCompanyMutationVariables>(CreateDeveloperCompanyDocument, options);
      }
export type CreateDeveloperCompanyMutationHookResult = ReturnType<typeof useCreateDeveloperCompanyMutation>;
export type CreateDeveloperCompanyMutationResult = Apollo.MutationResult<CreateDeveloperCompanyMutation>;
export type CreateDeveloperCompanyMutationOptions = Apollo.BaseMutationOptions<CreateDeveloperCompanyMutation, CreateDeveloperCompanyMutationVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($projectName: String!, $description: String!, $address: String!, $cityId: String!, $projectStatusId: Int!, $developerCompanyId: String, $neighborhoodId: String, $projectMedia: [CreateProjectMedia]) {
  createProject(
    input: {projectName: $projectName, description: $description, address: $address, cityId: $cityId, projectStatusId: $projectStatusId, developerCompanyId: $developerCompanyId, neighborhoodId: $neighborhoodId, projectMedia: $projectMedia}
  ) {
    id
    projectName
    address
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      projectName: // value for 'projectName'
 *      description: // value for 'description'
 *      address: // value for 'address'
 *      cityId: // value for 'cityId'
 *      projectStatusId: // value for 'projectStatusId'
 *      developerCompanyId: // value for 'developerCompanyId'
 *      neighborhoodId: // value for 'neighborhoodId'
 *      projectMedia: // value for 'projectMedia'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const CreatePropertyDocument = gql`
    mutation CreateProperty($name: String!, $description: String!, $price: Float!, $categoryId: String!, $propertyStatusId: Int!, $projectId: String, $prototypeId: String, $cityId: String!, $developerCompanyId: String, $propertyDetail: CreatePropertyDetails!, $propertyMedia: [CreatePropertyMedia]) {
  createProperty(
    input: {name: $name, description: $description, price: $price, categoryId: $categoryId, propertyStatusId: $propertyStatusId, projectId: $projectId, prototypeId: $prototypeId, cityId: $cityId, developerCompanyId: $developerCompanyId, propertyDetail: $propertyDetail, propertyMedia: $propertyMedia}
  ) {
    id
    name
    description
    price
    createdAt
  }
}
    `;
export type CreatePropertyMutationFn = Apollo.MutationFunction<CreatePropertyMutation, CreatePropertyMutationVariables>;

/**
 * __useCreatePropertyMutation__
 *
 * To run a mutation, you first call `useCreatePropertyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePropertyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPropertyMutation, { data, loading, error }] = useCreatePropertyMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      price: // value for 'price'
 *      categoryId: // value for 'categoryId'
 *      propertyStatusId: // value for 'propertyStatusId'
 *      projectId: // value for 'projectId'
 *      prototypeId: // value for 'prototypeId'
 *      cityId: // value for 'cityId'
 *      developerCompanyId: // value for 'developerCompanyId'
 *      propertyDetail: // value for 'propertyDetail'
 *      propertyMedia: // value for 'propertyMedia'
 *   },
 * });
 */
export function useCreatePropertyMutation(baseOptions?: Apollo.MutationHookOptions<CreatePropertyMutation, CreatePropertyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePropertyMutation, CreatePropertyMutationVariables>(CreatePropertyDocument, options);
      }
export type CreatePropertyMutationHookResult = ReturnType<typeof useCreatePropertyMutation>;
export type CreatePropertyMutationResult = Apollo.MutationResult<CreatePropertyMutation>;
export type CreatePropertyMutationOptions = Apollo.BaseMutationOptions<CreatePropertyMutation, CreatePropertyMutationVariables>;
export const CreatePrototypeDocument = gql`
    mutation CreatePrototype($prototypeName: String!, $description: String!, $projectId: String!, $categoryId: String, $prototypeMedia: [CreatePrototypeMedia]) {
  createPrototype(
    input: {prototypeName: $prototypeName, description: $description, projectId: $projectId, categoryId: $categoryId, prototypeMedia: $prototypeMedia}
  ) {
    id
    prototypeName
  }
}
    `;
export type CreatePrototypeMutationFn = Apollo.MutationFunction<CreatePrototypeMutation, CreatePrototypeMutationVariables>;

/**
 * __useCreatePrototypeMutation__
 *
 * To run a mutation, you first call `useCreatePrototypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePrototypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPrototypeMutation, { data, loading, error }] = useCreatePrototypeMutation({
 *   variables: {
 *      prototypeName: // value for 'prototypeName'
 *      description: // value for 'description'
 *      projectId: // value for 'projectId'
 *      categoryId: // value for 'categoryId'
 *      prototypeMedia: // value for 'prototypeMedia'
 *   },
 * });
 */
export function useCreatePrototypeMutation(baseOptions?: Apollo.MutationHookOptions<CreatePrototypeMutation, CreatePrototypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePrototypeMutation, CreatePrototypeMutationVariables>(CreatePrototypeDocument, options);
      }
export type CreatePrototypeMutationHookResult = ReturnType<typeof useCreatePrototypeMutation>;
export type CreatePrototypeMutationResult = Apollo.MutationResult<CreatePrototypeMutation>;
export type CreatePrototypeMutationOptions = Apollo.BaseMutationOptions<CreatePrototypeMutation, CreatePrototypeMutationVariables>;
export const GetAllRolesDocument = gql`
    query GetAllRoles {
  getAllRoles {
    id
    roleName
    createdAt
  }
}
    `;

/**
 * __useGetAllRolesQuery__
 *
 * To run a query within a React component, call `useGetAllRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllRolesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllRolesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllRolesQuery, GetAllRolesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllRolesQuery, GetAllRolesQueryVariables>(GetAllRolesDocument, options);
      }
export function useGetAllRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllRolesQuery, GetAllRolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllRolesQuery, GetAllRolesQueryVariables>(GetAllRolesDocument, options);
        }
export function useGetAllRolesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllRolesQuery, GetAllRolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllRolesQuery, GetAllRolesQueryVariables>(GetAllRolesDocument, options);
        }
export type GetAllRolesQueryHookResult = ReturnType<typeof useGetAllRolesQuery>;
export type GetAllRolesLazyQueryHookResult = ReturnType<typeof useGetAllRolesLazyQuery>;
export type GetAllRolesSuspenseQueryHookResult = ReturnType<typeof useGetAllRolesSuspenseQuery>;
export type GetAllRolesQueryResult = Apollo.QueryResult<GetAllRolesQuery, GetAllRolesQueryVariables>;
export const GetCitiesByStateIdDocument = gql`
    query GetCitiesByStateId($stateId: String!) {
  getCitiesByStateId(stateId: $stateId) {
    id
    cityName
    stateId
  }
}
    `;

/**
 * __useGetCitiesByStateIdQuery__
 *
 * To run a query within a React component, call `useGetCitiesByStateIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCitiesByStateIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCitiesByStateIdQuery({
 *   variables: {
 *      stateId: // value for 'stateId'
 *   },
 * });
 */
export function useGetCitiesByStateIdQuery(baseOptions: Apollo.QueryHookOptions<GetCitiesByStateIdQuery, GetCitiesByStateIdQueryVariables> & ({ variables: GetCitiesByStateIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCitiesByStateIdQuery, GetCitiesByStateIdQueryVariables>(GetCitiesByStateIdDocument, options);
      }
export function useGetCitiesByStateIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCitiesByStateIdQuery, GetCitiesByStateIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCitiesByStateIdQuery, GetCitiesByStateIdQueryVariables>(GetCitiesByStateIdDocument, options);
        }
export function useGetCitiesByStateIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCitiesByStateIdQuery, GetCitiesByStateIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCitiesByStateIdQuery, GetCitiesByStateIdQueryVariables>(GetCitiesByStateIdDocument, options);
        }
export type GetCitiesByStateIdQueryHookResult = ReturnType<typeof useGetCitiesByStateIdQuery>;
export type GetCitiesByStateIdLazyQueryHookResult = ReturnType<typeof useGetCitiesByStateIdLazyQuery>;
export type GetCitiesByStateIdSuspenseQueryHookResult = ReturnType<typeof useGetCitiesByStateIdSuspenseQuery>;
export type GetCitiesByStateIdQueryResult = Apollo.QueryResult<GetCitiesByStateIdQuery, GetCitiesByStateIdQueryVariables>;
export const GetCompanyTypesDocument = gql`
    query getCompanyTypes {
  getCompanyTypes {
    id
    type
  }
}
    `;

/**
 * __useGetCompanyTypesQuery__
 *
 * To run a query within a React component, call `useGetCompanyTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompanyTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompanyTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCompanyTypesQuery(baseOptions?: Apollo.QueryHookOptions<GetCompanyTypesQuery, GetCompanyTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCompanyTypesQuery, GetCompanyTypesQueryVariables>(GetCompanyTypesDocument, options);
      }
export function useGetCompanyTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCompanyTypesQuery, GetCompanyTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCompanyTypesQuery, GetCompanyTypesQueryVariables>(GetCompanyTypesDocument, options);
        }
export function useGetCompanyTypesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCompanyTypesQuery, GetCompanyTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCompanyTypesQuery, GetCompanyTypesQueryVariables>(GetCompanyTypesDocument, options);
        }
export type GetCompanyTypesQueryHookResult = ReturnType<typeof useGetCompanyTypesQuery>;
export type GetCompanyTypesLazyQueryHookResult = ReturnType<typeof useGetCompanyTypesLazyQuery>;
export type GetCompanyTypesSuspenseQueryHookResult = ReturnType<typeof useGetCompanyTypesSuspenseQuery>;
export type GetCompanyTypesQueryResult = Apollo.QueryResult<GetCompanyTypesQuery, GetCompanyTypesQueryVariables>;
export const GetDeveloperCompanyByUserDocument = gql`
    query GetDeveloperCompanyByUser {
  getDeveloperCompanyByUser {
    id
    companyName
    companyEmail
    companyType {
      id
      type
    }
    createdAt
  }
}
    `;

/**
 * __useGetDeveloperCompanyByUserQuery__
 *
 * To run a query within a React component, call `useGetDeveloperCompanyByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDeveloperCompanyByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDeveloperCompanyByUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDeveloperCompanyByUserQuery(baseOptions?: Apollo.QueryHookOptions<GetDeveloperCompanyByUserQuery, GetDeveloperCompanyByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDeveloperCompanyByUserQuery, GetDeveloperCompanyByUserQueryVariables>(GetDeveloperCompanyByUserDocument, options);
      }
export function useGetDeveloperCompanyByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDeveloperCompanyByUserQuery, GetDeveloperCompanyByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDeveloperCompanyByUserQuery, GetDeveloperCompanyByUserQueryVariables>(GetDeveloperCompanyByUserDocument, options);
        }
export function useGetDeveloperCompanyByUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetDeveloperCompanyByUserQuery, GetDeveloperCompanyByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDeveloperCompanyByUserQuery, GetDeveloperCompanyByUserQueryVariables>(GetDeveloperCompanyByUserDocument, options);
        }
export type GetDeveloperCompanyByUserQueryHookResult = ReturnType<typeof useGetDeveloperCompanyByUserQuery>;
export type GetDeveloperCompanyByUserLazyQueryHookResult = ReturnType<typeof useGetDeveloperCompanyByUserLazyQuery>;
export type GetDeveloperCompanyByUserSuspenseQueryHookResult = ReturnType<typeof useGetDeveloperCompanyByUserSuspenseQuery>;
export type GetDeveloperCompanyByUserQueryResult = Apollo.QueryResult<GetDeveloperCompanyByUserQuery, GetDeveloperCompanyByUserQueryVariables>;
export const GetProjectByIdDocument = gql`
    query GetProjectById($projectId: String!) {
  getProjectById(projectId: $projectId) {
    id
    projectName
    description
    cityId
    city {
      cityName
      state {
        stateName
      }
    }
    address
    projectsMedia {
      mediaUrl
      projectMediaCategory {
        mediaCategory
      }
      projectMediaCategoryId
    }
    prototypes {
      prototypeName
      description
      prototypesMedia {
        mediaUrl
        propertyMediaCategory {
          mediaCategory
        }
        propertyMediaCategoryId
      }
    }
    properties {
      description
      name
      price
      id
      propertyDetail {
        address
        bedrooms
        bathrooms
        sizeSqft
      }
      propertiesMedia {
        propertyMediaCategory {
          mediaCategory
        }
        mediaUrl
        propertyMediaCategoryId
      }
    }
  }
}
    `;

/**
 * __useGetProjectByIdQuery__
 *
 * To run a query within a React component, call `useGetProjectByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectByIdQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetProjectByIdQuery(baseOptions: Apollo.QueryHookOptions<GetProjectByIdQuery, GetProjectByIdQueryVariables> & ({ variables: GetProjectByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectByIdQuery, GetProjectByIdQueryVariables>(GetProjectByIdDocument, options);
      }
export function useGetProjectByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectByIdQuery, GetProjectByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectByIdQuery, GetProjectByIdQueryVariables>(GetProjectByIdDocument, options);
        }
export function useGetProjectByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProjectByIdQuery, GetProjectByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProjectByIdQuery, GetProjectByIdQueryVariables>(GetProjectByIdDocument, options);
        }
export type GetProjectByIdQueryHookResult = ReturnType<typeof useGetProjectByIdQuery>;
export type GetProjectByIdLazyQueryHookResult = ReturnType<typeof useGetProjectByIdLazyQuery>;
export type GetProjectByIdSuspenseQueryHookResult = ReturnType<typeof useGetProjectByIdSuspenseQuery>;
export type GetProjectByIdQueryResult = Apollo.QueryResult<GetProjectByIdQuery, GetProjectByIdQueryVariables>;
export const GetProjectMediaCategoriesDocument = gql`
    query GetProjectMediaCategories {
  getProjectMediaCategories {
    id
    mediaCategory
    required
  }
}
    `;

/**
 * __useGetProjectMediaCategoriesQuery__
 *
 * To run a query within a React component, call `useGetProjectMediaCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectMediaCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectMediaCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProjectMediaCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetProjectMediaCategoriesQuery, GetProjectMediaCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectMediaCategoriesQuery, GetProjectMediaCategoriesQueryVariables>(GetProjectMediaCategoriesDocument, options);
      }
export function useGetProjectMediaCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectMediaCategoriesQuery, GetProjectMediaCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectMediaCategoriesQuery, GetProjectMediaCategoriesQueryVariables>(GetProjectMediaCategoriesDocument, options);
        }
export function useGetProjectMediaCategoriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProjectMediaCategoriesQuery, GetProjectMediaCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProjectMediaCategoriesQuery, GetProjectMediaCategoriesQueryVariables>(GetProjectMediaCategoriesDocument, options);
        }
export type GetProjectMediaCategoriesQueryHookResult = ReturnType<typeof useGetProjectMediaCategoriesQuery>;
export type GetProjectMediaCategoriesLazyQueryHookResult = ReturnType<typeof useGetProjectMediaCategoriesLazyQuery>;
export type GetProjectMediaCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetProjectMediaCategoriesSuspenseQuery>;
export type GetProjectMediaCategoriesQueryResult = Apollo.QueryResult<GetProjectMediaCategoriesQuery, GetProjectMediaCategoriesQueryVariables>;
export const GetProjectStatusesDocument = gql`
    query getProjectStatuses {
  getProjectStatuses {
    projectStatus
    id
  }
}
    `;

/**
 * __useGetProjectStatusesQuery__
 *
 * To run a query within a React component, call `useGetProjectStatusesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectStatusesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectStatusesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProjectStatusesQuery(baseOptions?: Apollo.QueryHookOptions<GetProjectStatusesQuery, GetProjectStatusesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectStatusesQuery, GetProjectStatusesQueryVariables>(GetProjectStatusesDocument, options);
      }
export function useGetProjectStatusesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectStatusesQuery, GetProjectStatusesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectStatusesQuery, GetProjectStatusesQueryVariables>(GetProjectStatusesDocument, options);
        }
export function useGetProjectStatusesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProjectStatusesQuery, GetProjectStatusesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProjectStatusesQuery, GetProjectStatusesQueryVariables>(GetProjectStatusesDocument, options);
        }
export type GetProjectStatusesQueryHookResult = ReturnType<typeof useGetProjectStatusesQuery>;
export type GetProjectStatusesLazyQueryHookResult = ReturnType<typeof useGetProjectStatusesLazyQuery>;
export type GetProjectStatusesSuspenseQueryHookResult = ReturnType<typeof useGetProjectStatusesSuspenseQuery>;
export type GetProjectStatusesQueryResult = Apollo.QueryResult<GetProjectStatusesQuery, GetProjectStatusesQueryVariables>;
export const GetProjectsByCompanyDocument = gql`
    query GetProjectsByCompany($companyId: String!, $cursor: String, $sets: Float) {
  getProjectsByCompany(companyId: $companyId, cursor: $cursor, sets: $sets) {
    projectsByCompany {
      id
      projectName
      description
      address
      projectsMedia {
        mediaUrl
        projectMediaCategoryId
        projectMediaCategory {
          mediaCategory
        }
      }
      cityId
    }
    cursorId
  }
}
    `;

/**
 * __useGetProjectsByCompanyQuery__
 *
 * To run a query within a React component, call `useGetProjectsByCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsByCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsByCompanyQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *      cursor: // value for 'cursor'
 *      sets: // value for 'sets'
 *   },
 * });
 */
export function useGetProjectsByCompanyQuery(baseOptions: Apollo.QueryHookOptions<GetProjectsByCompanyQuery, GetProjectsByCompanyQueryVariables> & ({ variables: GetProjectsByCompanyQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectsByCompanyQuery, GetProjectsByCompanyQueryVariables>(GetProjectsByCompanyDocument, options);
      }
export function useGetProjectsByCompanyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsByCompanyQuery, GetProjectsByCompanyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectsByCompanyQuery, GetProjectsByCompanyQueryVariables>(GetProjectsByCompanyDocument, options);
        }
export function useGetProjectsByCompanySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProjectsByCompanyQuery, GetProjectsByCompanyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProjectsByCompanyQuery, GetProjectsByCompanyQueryVariables>(GetProjectsByCompanyDocument, options);
        }
export type GetProjectsByCompanyQueryHookResult = ReturnType<typeof useGetProjectsByCompanyQuery>;
export type GetProjectsByCompanyLazyQueryHookResult = ReturnType<typeof useGetProjectsByCompanyLazyQuery>;
export type GetProjectsByCompanySuspenseQueryHookResult = ReturnType<typeof useGetProjectsByCompanySuspenseQuery>;
export type GetProjectsByCompanyQueryResult = Apollo.QueryResult<GetProjectsByCompanyQuery, GetProjectsByCompanyQueryVariables>;
export const GetPropertiesByCompanyDocument = gql`
    query GetPropertiesByCompany($companyId: String!) {
  getPropertiesByCompany(companyId: $companyId) {
    id
    description
    price
    propertyStatus {
      propertyStatus
    }
    propertyDetail {
      longitude
      floors
      bedrooms
      bathrooms
      sizeSqft
      floors
      address
    }
    propertiesMedia {
      id
      mediaUrl
      propertyMediaCategory {
        mediaCategory
      }
    }
  }
}
    `;

/**
 * __useGetPropertiesByCompanyQuery__
 *
 * To run a query within a React component, call `useGetPropertiesByCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPropertiesByCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPropertiesByCompanyQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useGetPropertiesByCompanyQuery(baseOptions: Apollo.QueryHookOptions<GetPropertiesByCompanyQuery, GetPropertiesByCompanyQueryVariables> & ({ variables: GetPropertiesByCompanyQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPropertiesByCompanyQuery, GetPropertiesByCompanyQueryVariables>(GetPropertiesByCompanyDocument, options);
      }
export function useGetPropertiesByCompanyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPropertiesByCompanyQuery, GetPropertiesByCompanyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPropertiesByCompanyQuery, GetPropertiesByCompanyQueryVariables>(GetPropertiesByCompanyDocument, options);
        }
export function useGetPropertiesByCompanySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPropertiesByCompanyQuery, GetPropertiesByCompanyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPropertiesByCompanyQuery, GetPropertiesByCompanyQueryVariables>(GetPropertiesByCompanyDocument, options);
        }
export type GetPropertiesByCompanyQueryHookResult = ReturnType<typeof useGetPropertiesByCompanyQuery>;
export type GetPropertiesByCompanyLazyQueryHookResult = ReturnType<typeof useGetPropertiesByCompanyLazyQuery>;
export type GetPropertiesByCompanySuspenseQueryHookResult = ReturnType<typeof useGetPropertiesByCompanySuspenseQuery>;
export type GetPropertiesByCompanyQueryResult = Apollo.QueryResult<GetPropertiesByCompanyQuery, GetPropertiesByCompanyQueryVariables>;
export const GetPropertyByIdDocument = gql`
    query GetPropertyById($propertyId: String!) {
  getPropertyById(propertyId: $propertyId) {
    id
    name
    description
    price
    cityId
    city {
      cityName
      state {
        stateName
      }
    }
    propertyStatus {
      propertyStatus
    }
    propertyDetail {
      longitude
      floors
      isFurnished
      isNewConstruction
      hasPool
      hasGarden
      canMortgage
      canPayInstallment
      dateCompleted
      parkingSpaces
      bedrooms
      bathrooms
      sizeSqft
      floors
      address
    }
    propertiesMedia {
      id
      mediaUrl
      propertyMediaCategory {
        mediaCategory
      }
    }
  }
}
    `;

/**
 * __useGetPropertyByIdQuery__
 *
 * To run a query within a React component, call `useGetPropertyByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPropertyByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPropertyByIdQuery({
 *   variables: {
 *      propertyId: // value for 'propertyId'
 *   },
 * });
 */
export function useGetPropertyByIdQuery(baseOptions: Apollo.QueryHookOptions<GetPropertyByIdQuery, GetPropertyByIdQueryVariables> & ({ variables: GetPropertyByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPropertyByIdQuery, GetPropertyByIdQueryVariables>(GetPropertyByIdDocument, options);
      }
export function useGetPropertyByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPropertyByIdQuery, GetPropertyByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPropertyByIdQuery, GetPropertyByIdQueryVariables>(GetPropertyByIdDocument, options);
        }
export function useGetPropertyByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPropertyByIdQuery, GetPropertyByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPropertyByIdQuery, GetPropertyByIdQueryVariables>(GetPropertyByIdDocument, options);
        }
export type GetPropertyByIdQueryHookResult = ReturnType<typeof useGetPropertyByIdQuery>;
export type GetPropertyByIdLazyQueryHookResult = ReturnType<typeof useGetPropertyByIdLazyQuery>;
export type GetPropertyByIdSuspenseQueryHookResult = ReturnType<typeof useGetPropertyByIdSuspenseQuery>;
export type GetPropertyByIdQueryResult = Apollo.QueryResult<GetPropertyByIdQuery, GetPropertyByIdQueryVariables>;
export const GetPropertyCategoryDocument = gql`
    query getPropertyCategory {
  getPropertyCategories {
    categoryName
    id
  }
}
    `;

/**
 * __useGetPropertyCategoryQuery__
 *
 * To run a query within a React component, call `useGetPropertyCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPropertyCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPropertyCategoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPropertyCategoryQuery(baseOptions?: Apollo.QueryHookOptions<GetPropertyCategoryQuery, GetPropertyCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPropertyCategoryQuery, GetPropertyCategoryQueryVariables>(GetPropertyCategoryDocument, options);
      }
export function useGetPropertyCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPropertyCategoryQuery, GetPropertyCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPropertyCategoryQuery, GetPropertyCategoryQueryVariables>(GetPropertyCategoryDocument, options);
        }
export function useGetPropertyCategorySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPropertyCategoryQuery, GetPropertyCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPropertyCategoryQuery, GetPropertyCategoryQueryVariables>(GetPropertyCategoryDocument, options);
        }
export type GetPropertyCategoryQueryHookResult = ReturnType<typeof useGetPropertyCategoryQuery>;
export type GetPropertyCategoryLazyQueryHookResult = ReturnType<typeof useGetPropertyCategoryLazyQuery>;
export type GetPropertyCategorySuspenseQueryHookResult = ReturnType<typeof useGetPropertyCategorySuspenseQuery>;
export type GetPropertyCategoryQueryResult = Apollo.QueryResult<GetPropertyCategoryQuery, GetPropertyCategoryQueryVariables>;
export const GetPropertyMediaCategoriesDocument = gql`
    query GetPropertyMediaCategories {
  getPropertyMediaCategories {
    id
    mediaCategory
  }
}
    `;

/**
 * __useGetPropertyMediaCategoriesQuery__
 *
 * To run a query within a React component, call `useGetPropertyMediaCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPropertyMediaCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPropertyMediaCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPropertyMediaCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetPropertyMediaCategoriesQuery, GetPropertyMediaCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPropertyMediaCategoriesQuery, GetPropertyMediaCategoriesQueryVariables>(GetPropertyMediaCategoriesDocument, options);
      }
export function useGetPropertyMediaCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPropertyMediaCategoriesQuery, GetPropertyMediaCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPropertyMediaCategoriesQuery, GetPropertyMediaCategoriesQueryVariables>(GetPropertyMediaCategoriesDocument, options);
        }
export function useGetPropertyMediaCategoriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPropertyMediaCategoriesQuery, GetPropertyMediaCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPropertyMediaCategoriesQuery, GetPropertyMediaCategoriesQueryVariables>(GetPropertyMediaCategoriesDocument, options);
        }
export type GetPropertyMediaCategoriesQueryHookResult = ReturnType<typeof useGetPropertyMediaCategoriesQuery>;
export type GetPropertyMediaCategoriesLazyQueryHookResult = ReturnType<typeof useGetPropertyMediaCategoriesLazyQuery>;
export type GetPropertyMediaCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetPropertyMediaCategoriesSuspenseQuery>;
export type GetPropertyMediaCategoriesQueryResult = Apollo.QueryResult<GetPropertyMediaCategoriesQuery, GetPropertyMediaCategoriesQueryVariables>;
export const GetPropertyOptionsDocument = gql`
    query GetPropertyOptions {
  getPropertyOptions {
    propertyOption
    id
  }
}
    `;

/**
 * __useGetPropertyOptionsQuery__
 *
 * To run a query within a React component, call `useGetPropertyOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPropertyOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPropertyOptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPropertyOptionsQuery(baseOptions?: Apollo.QueryHookOptions<GetPropertyOptionsQuery, GetPropertyOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPropertyOptionsQuery, GetPropertyOptionsQueryVariables>(GetPropertyOptionsDocument, options);
      }
export function useGetPropertyOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPropertyOptionsQuery, GetPropertyOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPropertyOptionsQuery, GetPropertyOptionsQueryVariables>(GetPropertyOptionsDocument, options);
        }
export function useGetPropertyOptionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPropertyOptionsQuery, GetPropertyOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPropertyOptionsQuery, GetPropertyOptionsQueryVariables>(GetPropertyOptionsDocument, options);
        }
export type GetPropertyOptionsQueryHookResult = ReturnType<typeof useGetPropertyOptionsQuery>;
export type GetPropertyOptionsLazyQueryHookResult = ReturnType<typeof useGetPropertyOptionsLazyQuery>;
export type GetPropertyOptionsSuspenseQueryHookResult = ReturnType<typeof useGetPropertyOptionsSuspenseQuery>;
export type GetPropertyOptionsQueryResult = Apollo.QueryResult<GetPropertyOptionsQuery, GetPropertyOptionsQueryVariables>;
export const GetPropertyStatusesDocument = gql`
    query getPropertyStatuses {
  getPropertyStatuses {
    propertyStatus
    id
  }
}
    `;

/**
 * __useGetPropertyStatusesQuery__
 *
 * To run a query within a React component, call `useGetPropertyStatusesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPropertyStatusesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPropertyStatusesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPropertyStatusesQuery(baseOptions?: Apollo.QueryHookOptions<GetPropertyStatusesQuery, GetPropertyStatusesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPropertyStatusesQuery, GetPropertyStatusesQueryVariables>(GetPropertyStatusesDocument, options);
      }
export function useGetPropertyStatusesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPropertyStatusesQuery, GetPropertyStatusesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPropertyStatusesQuery, GetPropertyStatusesQueryVariables>(GetPropertyStatusesDocument, options);
        }
export function useGetPropertyStatusesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPropertyStatusesQuery, GetPropertyStatusesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPropertyStatusesQuery, GetPropertyStatusesQueryVariables>(GetPropertyStatusesDocument, options);
        }
export type GetPropertyStatusesQueryHookResult = ReturnType<typeof useGetPropertyStatusesQuery>;
export type GetPropertyStatusesLazyQueryHookResult = ReturnType<typeof useGetPropertyStatusesLazyQuery>;
export type GetPropertyStatusesSuspenseQueryHookResult = ReturnType<typeof useGetPropertyStatusesSuspenseQuery>;
export type GetPropertyStatusesQueryResult = Apollo.QueryResult<GetPropertyStatusesQuery, GetPropertyStatusesQueryVariables>;
export const GetPrototypeByProjectDocument = gql`
    query GetPrototypeByProject($projectId: String!) {
  getPrototypesByProject(projectId: $projectId) {
    id
    prototypeName
    description
    createdAt
    prototypesMedia {
      mediaUrl
      propertyMediaCategory {
        mediaCategory
      }
      propertyMediaCategoryId
    }
  }
}
    `;

/**
 * __useGetPrototypeByProjectQuery__
 *
 * To run a query within a React component, call `useGetPrototypeByProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPrototypeByProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPrototypeByProjectQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetPrototypeByProjectQuery(baseOptions: Apollo.QueryHookOptions<GetPrototypeByProjectQuery, GetPrototypeByProjectQueryVariables> & ({ variables: GetPrototypeByProjectQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPrototypeByProjectQuery, GetPrototypeByProjectQueryVariables>(GetPrototypeByProjectDocument, options);
      }
export function useGetPrototypeByProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPrototypeByProjectQuery, GetPrototypeByProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPrototypeByProjectQuery, GetPrototypeByProjectQueryVariables>(GetPrototypeByProjectDocument, options);
        }
export function useGetPrototypeByProjectSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPrototypeByProjectQuery, GetPrototypeByProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPrototypeByProjectQuery, GetPrototypeByProjectQueryVariables>(GetPrototypeByProjectDocument, options);
        }
export type GetPrototypeByProjectQueryHookResult = ReturnType<typeof useGetPrototypeByProjectQuery>;
export type GetPrototypeByProjectLazyQueryHookResult = ReturnType<typeof useGetPrototypeByProjectLazyQuery>;
export type GetPrototypeByProjectSuspenseQueryHookResult = ReturnType<typeof useGetPrototypeByProjectSuspenseQuery>;
export type GetPrototypeByProjectQueryResult = Apollo.QueryResult<GetPrototypeByProjectQuery, GetPrototypeByProjectQueryVariables>;
export const GetStatesDocument = gql`
    query GetStates {
  getStates {
    stateName
    id
  }
}
    `;

/**
 * __useGetStatesQuery__
 *
 * To run a query within a React component, call `useGetStatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStatesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetStatesQuery(baseOptions?: Apollo.QueryHookOptions<GetStatesQuery, GetStatesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStatesQuery, GetStatesQueryVariables>(GetStatesDocument, options);
      }
export function useGetStatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStatesQuery, GetStatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStatesQuery, GetStatesQueryVariables>(GetStatesDocument, options);
        }
export function useGetStatesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetStatesQuery, GetStatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetStatesQuery, GetStatesQueryVariables>(GetStatesDocument, options);
        }
export type GetStatesQueryHookResult = ReturnType<typeof useGetStatesQuery>;
export type GetStatesLazyQueryHookResult = ReturnType<typeof useGetStatesLazyQuery>;
export type GetStatesSuspenseQueryHookResult = ReturnType<typeof useGetStatesSuspenseQuery>;
export type GetStatesQueryResult = Apollo.QueryResult<GetStatesQuery, GetStatesQueryVariables>;
export const GetUserByIdDocument = gql`
    query GetUserById {
  getUserById {
    id
    fullname
    email
    mobile
    vetted
    isDeveloper
    hasCompany
    role {
      roleName
      roleDescription
      id
    }
    roleId
    createdAt
  }
}
    `;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions?: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export function useGetUserByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdSuspenseQueryHookResult = ReturnType<typeof useGetUserByIdSuspenseQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const LogOutDocument = gql`
    mutation LogOut {
  logOut
}
    `;
export type LogOutMutationFn = Apollo.MutationFunction<LogOutMutation, LogOutMutationVariables>;

/**
 * __useLogOutMutation__
 *
 * To run a mutation, you first call `useLogOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logOutMutation, { data, loading, error }] = useLogOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogOutMutation(baseOptions?: Apollo.MutationHookOptions<LogOutMutation, LogOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogOutMutation, LogOutMutationVariables>(LogOutDocument, options);
      }
export type LogOutMutationHookResult = ReturnType<typeof useLogOutMutation>;
export type LogOutMutationResult = Apollo.MutationResult<LogOutMutation>;
export type LogOutMutationOptions = Apollo.BaseMutationOptions<LogOutMutation, LogOutMutationVariables>;
export const SignInDocument = gql`
    mutation SignIn($email: String!, $password: String!) {
  signIn(input: {email: $email, password: $password}) {
    verified
    vetted
    hasDeveloperCompany
    token {
      access_token
      refresh_token
    }
    user {
      fullname
      id
      email
      mobile
      hasCompany
    }
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($email: String!, $fullname: String!, $mobile: String!, $password: String!, $isDeveloper: Boolean, $hasCompany: Boolean) {
  signUp(
    input: {email: $email, fullname: $fullname, mobile: $mobile, password: $password, isDeveloper: $isDeveloper, hasCompany: $hasCompany}
  ) {
    token {
      access_token
      refresh_token
    }
    user {
      fullname
      id
      email
      mobile
    }
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      email: // value for 'email'
 *      fullname: // value for 'fullname'
 *      mobile: // value for 'mobile'
 *      password: // value for 'password'
 *      isDeveloper: // value for 'isDeveloper'
 *      hasCompany: // value for 'hasCompany'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;