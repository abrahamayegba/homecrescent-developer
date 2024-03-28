import { BarChart, Calendar, Folder, Settings, X } from "lucide-react";
import React from "react";
import { BsHouses } from "react-icons/bs";
import Homecrescentlogowhite from "./logos/Homecrescentlogowhite";
import { RiHome3Line } from "react-icons/ri";
import { BsBuildingAdd } from "react-icons/bs";
import { usePathname } from "next/navigation";
import Link from "next/link";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Sidebar = () => {
  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: RiHome3Line,
      current: false,
    },
    {
      name: "Single Properties",
      href: "/dashboard/singleproperties",
      icon: BsHouses,
      current: false,
    },
    {
      name: "Projects",
      href: "/dashboard/projects",
      icon: BsBuildingAdd,
      current: false,
    },
    { name: "Teams", href: "#", icon: Folder, current: false },
    { name: "Calendar", href: "#", icon: Calendar, current: false },
    { name: "Documents", href: "#", icon: Folder, current: false },
    { name: "Reports", href: "#", icon: BarChart, current: false },
  ];
  const path = usePathname();
  navigation.forEach((item) => {
    item.current = item.href === path;
  });

  return (
    <>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow pt-4 flex-col gap-y-5 overflow-y-auto bg-primary-blue px-6 pb-4">
          <Link href="/dashboard">
            <button className="flex h-16 shrink-0 items-center">
              <Homecrescentlogowhite />
            </button>
          </Link>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 flex flex-col gap-y-4">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-[#8BA0BC] bg-opacity-60"
                            : " hover:bg-[#8BA0BC] hover:bg-opacity-30",
                          "group flex gap-x-3 text-white rounded-md p-2 px-3 text-[15px] leading-6 "
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
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="mt-auto">
                <Link
                  href="#"
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
                >
                  <Settings
                    className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
                    aria-hidden="true"
                  />
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
