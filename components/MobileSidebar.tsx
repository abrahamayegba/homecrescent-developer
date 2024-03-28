import React from "react";
import { BarChart, Calendar, Folder, Settings, X } from "lucide-react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BsHouses } from "react-icons/bs";
import { IoWalletOutline } from "react-icons/io5";
import Image from "next/image";

interface Props {
  openSidebar: boolean;
  CloseSidebar: () => void;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const navigation = [
  { name: "My Properties", href: "#", icon: BsHouses, current: true },
  { name: "Wallet", href: "#", icon: IoWalletOutline, current: false },
  { name: "Teams", href: "#", icon: Folder, current: false },
  { name: "Calendar", href: "#", icon: Calendar, current: false },
  { name: "Documents", href: "#", icon: Folder, current: false },
  { name: "Reports", href: "#", icon: BarChart, current: false },
];

const MobileSidebar: React.FC<Props> = ({ openSidebar, CloseSidebar }) => {
  return (
    <Transition.Root show={openSidebar} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50 lg:hidden"
        onClose={CloseSidebar}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80" />
        </Transition.Child>
        <div className="fixed inset-0 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5"
                    onClick={CloseSidebar}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <X className="h-6 w-6 text-black" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">
                  <Image
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=white"
                    width={32}
                    height={32}
                    alt="Your Company"
                  />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? "bg-indigo-700 text-white"
                                  : "text-indigo-200 hover:text-white hover:bg-indigo-700",
                                "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                              )}
                            >
                              <item.icon
                                className={classNames(
                                  item.current
                                    ? "text-white"
                                    : "text-indigo-200 group-hover:text-white",
                                  "h-6 w-6 shrink-0"
                                )}
                                aria-hidden="true"
                              />
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>

                    <li className="mt-auto">
                      <a
                        href="#"
                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
                      >
                        <Settings
                          className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
                          aria-hidden="true"
                        />
                        Settings
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default MobileSidebar;
