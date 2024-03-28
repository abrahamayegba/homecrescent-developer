"use client";
import { Bell, ChevronDown, MenuIcon } from "lucide-react";
import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import MobileSidebar from "./MobileSidebar";
import { useGetUserByIdQuery } from "@/src/generated/graphql";

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Log out", href: "#" },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Topbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const { data } = useGetUserByIdQuery();
  const user = data?.getUserById;
  const userFirstLetter = user?.fullname?.charAt(0);

  return (
    <>
      <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 sm:gap-x-6 sm:px-6 lg:px-8">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <MenuIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />
        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          {/* <form className="relative flex flex-1" action="#" method="GET">
              <label htmlFor="search-field" className="sr-only">
                Search
              </label>
              <Search
                className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                aria-hidden="true"
              />
              <input
                id="search-field"
                className="block h-full w-full focus:outline-none border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                placeholder="Search..."
                type="search"
                name="search"
              />
            </form> */}
          <div className="flex items-center gap-x-4 lg:gap-x-6 ml-auto">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" aria-hidden="true" />
            </button>
            <div
              className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
              aria-hidden="true"
            />
            <Menu as="div" className="relative">
              <Menu.Button className="-m-1.5 flex items-center p-1.5">
                <span className="sr-only">Open user menu</span>
                <span className=" w-8 h-8 rounded-full border bg-primary-orange flex items-center justify-center text-white">
                  {userFirstLetter}
                </span>
                <span className="hidden lg:flex lg:items-center">
                  <span
                    className="ml-4 text-[15px] font-medium leading-6 text-primary-blue"
                    aria-hidden="true"
                  >
                    {user?.fullname}
                  </span>
                  <ChevronDown
                    className="ml-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  {userNavigation.map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <a
                          href={item.href}
                          className={classNames(
                            active ? "bg-gray-50" : "",
                            "block px-3 py-1 text-sm leading-6 text-gray-900"
                          )}
                        >
                          {item.name}
                        </a>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
      <MobileSidebar
        openSidebar={sidebarOpen}
        CloseSidebar={handleCloseSidebar}
      />
    </>
  );
};

export default Topbar;
