"use client";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { Toaster } from "@/components/ui/toaster";

export default function Dashboard2Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="min-h-screen flex flex-col">
        <Sidebar />
        <div className="lg:pl-72">
          <Topbar />
          <main>{children}</main>
          <Toaster />
        </div>
      </div>
    </div>
  );
}
