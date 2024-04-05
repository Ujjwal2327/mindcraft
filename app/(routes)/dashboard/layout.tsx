"use client";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SideNav from "./_components/SideNav";
import { FileListContext } from "@/app/_context/FilesListContext";
import { AlignJustify } from "lucide-react";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const convex = useConvex();
  const { user }: any = useKindeBrowserClient();
  const [fileList_, setFileList_] = useState();
  const router = useRouter();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const checkTeam = async () => {
      const result = await convex.query(api.teams.getTeams, {
        email: user?.email,
      });

      if (!result?.length) router.push("/teams/create");
    };
    if (user) checkTeam();
  }, [user]);

  return (
    <div>
      <FileListContext.Provider value={{ fileList_, setFileList_ }}>
        <div className="grid grid-cols-4">
          <div className="h-screen w-72 fixed">
            <AlignJustify
              size={30}
              onClick={() => setShow(!show)}
              className={`cursor-pointer fixed top-10 z-50 ${
                show ? "left-72" : "left-12"
              }`}
            />
            <div className={`${!show && "w-0 hidden" }`}>
              <SideNav />
            </div>
          </div>
          <div className={`col-span-4 grid-cols-3 ${show && "ml-72"}`}>
            {children}
          </div>
        </div>
      </FileListContext.Provider>
    </div>
  );
}

export default DashboardLayout;
