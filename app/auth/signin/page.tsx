"use client";
import GoogleIcon from "@/components/logos/GoogleIcon";
import Homecrescentlogo from "@/components/logos/Homecrescentlogo";
import { clearToken, saveToken } from "@/lib/auth";
import {
  GetUserByIdDocument,
  useSignInMutation,
} from "@/src/generated/graphql";
import { useApolloClient } from "@apollo/client";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  email: string;
  password: string;
}

const Signin = () => {
  const { register, reset, handleSubmit } = useForm<FormData>();
  const [signInMutation, { loading }] = useSignInMutation();
  const client = useApolloClient();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleInputChange = () => {
    setError(null);
  };

  const handleSignin = async (data: FormData) => {
    try {
      const response = await signInMutation({
        variables: {
          ...data,
        },
      });
      clearToken();
      if (response) {
        saveToken(response?.data?.signIn?.token?.access_token!);
        client.writeQuery({
          query: GetUserByIdDocument,
          data: {
            getUserById: response?.data?.signIn?.user,
          },
        });
        const hasCompany = response?.data?.signIn?.user?.hasCompany;
        if (hasCompany) {
          router.push("/dashboard");
        } else {
          router.push("/auth/businesssetup");
        }
      }
    } catch (error) {
      console.error(error);
      setError("Incorrect email or password");
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
            <h2 className="mt-8 text-[26px] font-semibold leading-9 tracking-tight ">
              Sign in to your account
            </h2>
            <p className="mt-2 text-[15px] leading-6 text-gray-500">
              Dont have an account?
              <Link
                href="/auth/signup"
                className="font-medium ml-1 text-primary-orange"
              >
                Sign up
              </Link>
            </p>
          </div>
          <div className="mt-6">
            <div>
              <form onSubmit={handleSubmit(handleSignin)} className="space-y-6">
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
                      className={` block w-full rounded-md border  py-2.5 px-4  placeholder:text-gray-400 sm:leading-6 ${
                        error ? " border-red-500" : " border-gray-300"
                      }`}
                      {...register("email", { onChange: handleInputChange })}
                    />
                  </div>
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
                      className={`block w-full rounded-md border  py-2.5 px-4  placeholder:text-gray-400 sm:leading-6 ${
                        error ? "border-red-500" : "border-gray-300"
                      }`}
                      {...register("password", { onChange: handleInputChange })}
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
                  {error && (
                    <p className="text-red-500 text-sm pl-1 mt-2">{error}</p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary-orange"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-3 block text-[15px] leading-6"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm leading-6">
                    <a
                      href="#"
                      className="font-medium text-[15px] text-primary-orange "
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div>
                  <button
                    disabled={loading}
                    type="submit"
                    className={` flex w-full justify-center rounded-md bg-primary-orange px-3 py-2.5 text-[15px] font-medium leading-6 text-white ${
                      loading ? " opacity-50" : ""
                    }`}
                  >
                    {loading ? "Loading..." : "Sign  in"}
                  </button>
                </div>
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
                  <GoogleIcon />
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

export default Signin;
