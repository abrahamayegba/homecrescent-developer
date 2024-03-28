"use client";
import React, { useState } from "react";
import Image from "next/image";
import Homecrescentlogo from "@/components/logos/Homecrescentlogo";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  GetUserByIdDocument,
  useSignUpMutation,
} from "@/src/generated/graphql";
import { useApolloClient } from "@apollo/client";
import { saveToken } from "@/lib/auth";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  fullname: string;
  password: string;
  mobile: string;
}
const Signup = () => {
  const { register, reset, handleSubmit } = useForm<FormData>();
  const [signUpMutation, { loading }] = useSignUpMutation();
  const router = useRouter();
  const client = useApolloClient();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSignUp = async (data: FormData) => {
    try {
      const response = await signUpMutation({
        variables: {
          ...data,
          isDeveloper: true,
          hasCompany: true,
        },
      });
      router.push("/auth/businesssetup");
      if (response) {
        saveToken(response?.data?.signUp?.token?.access_token!);
        client.writeQuery({
          query: GetUserByIdDocument,
          data: {
            getUserById: response?.data?.signUp?.user,
          },
        });
      }
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
      <div className="flex flex-1 flex-col text-primary-blue overflow-y-auto justify-center w-1/2 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96 overflow-y-auto">
          <div>
            <Homecrescentlogo />
            <h2 className="mt-4 text-[26px] font-semibold leading-9 tracking-tight ">
              Create your account
            </h2>
            <p className="mt-2 text-[15px] leading-6 text-gray-500">
              Already have an account?
              <Link
                href="/auth/signin"
                className="font-medium ml-1 text-primary-orange"
              >
                Sign in
              </Link>
            </p>
          </div>
          <div className="mt-4">
            <div>
              <form
                onSubmit={handleSubmit(handleSignUp)}
                className=" flex gap-y-3 flex-col"
              >
                <div>
                  <label
                    htmlFor="fullname"
                    className="block text-[15px] leading-6 "
                  >
                    Fullname
                  </label>
                  <div className="mt-2">
                    <input
                      id="fullname"
                      type="text"
                      autoComplete="fullname"
                      required
                      className="block w-full rounded-md border border-gray-300 py-2.5 px-4  placeholder:text-gray-400 sm:leading-6"
                      {...register("fullname")}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[15px] leading-6 "
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border border-gray-300 py-2.5 px-4  placeholder:text-gray-400 sm:leading-6"
                      {...register("email")}
                    />
                  </div>
                </div>
                <div className=" flex flex-col gap-y-[5px]">
                  <label
                    className=" text-primary-black text-[15px] font-medium text-start"
                    htmlFor="mobile"
                  >
                    Phone number
                  </label>
                  <input
                    type="tel"
                    required
                    className={` w-full px-3 py-[10px] border rounded focus:border-blue-500 hover:border-blue-500 `}
                    {...register("mobile")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-[15px] leading-6 "
                  >
                    Password
                  </label>
                  <div className="mt-2 relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border border-gray-300 py-2.5 px-4  placeholder:text-gray-400 sm:leading-6"
                      {...register("password")}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center px-3 border-l focus:outline-none"
                    >
                      {showPassword ? (
                        <Eye className=" text-primary-blue w-5 h-5 opacity-75" />
                      ) : (
                        <EyeOff className=" text-primary-blue w-5 h-5 opacity-75" />
                      )}
                    </button>
                  </div>
                </div>
                <button
                  disabled={loading}
                  type="submit"
                  className={` flex w-full justify-center mt-4 rounded-md bg-primary-orange px-3 py-2.5 text-[15px] font-medium leading-6 text-white ${
                    loading ? " opacity-50" : ""
                  }`}
                >
                  {loading ? "Loading..." : "Sign up"}
                </button>
              </form>
            </div>
            <div className="mt-5">
              <div className="relative">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-white px-6 text-gray-900">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="mt-5 gap-4">
                <a
                  href="#"
                  className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2.5  font-medium border border-gray-300"
                >
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                      fill="#EA4335"
                    />
                    <path
                      d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                      fill="#34A853"
                    />
                  </svg>
                  <span className="text-[15px] font-medium leading-6">
                    Google
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
