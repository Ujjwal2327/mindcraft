import React, { useContext, useEffect, useState } from "react";
import SideNavTopSection, { TEAM } from "./SideNavTopSection";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideNavBottomSection from "./SideNavBottomSection";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { FileListContext } from "@/app/_context/FilesListContext";

function SideNav() {
  const { user }: any = useKindeBrowserClient();
  const convex = useConvex();
  const createFile = useMutation(api.files.createFile);
  const [activeTeam, setActiveTeam] = useState<TEAM | any>();
  const [totalFiles, setTotalFiles] = useState<Number>();
  const { setFileList_ } = useContext(FileListContext);

  const getFiles = async () => {
    const result = await convex.query(api.files.getFiles, {
      teamId: activeTeam?._id,
    });
    setFileList_(result);
    setTotalFiles(result?.length);
  };

  useEffect(() => {
    if (activeTeam) getFiles();
  }, [activeTeam]);

  const onFileCreate = async (fileName: string) => {
    try {
      await createFile({
        fileName: fileName,
        teamId: activeTeam?._id,
        createdBy: user?.email,
        archive: false,
        document: "",
        whiteboard: "",
      });
      getFiles();
      toast("File created successfully!");
    } catch (error) {
      toast("Error while creating file");
    }
  };

  return (
    <div className=" h-screen fixed w-72 borde-r border-[1px] p-6 flex flex-col ">
      <div className="flex-1">
        <SideNavTopSection
          user={user}
          setActiveTeamInfo={(activeTeam: TEAM) => setActiveTeam(activeTeam)}
        />
      </div>

      <div>
        <SideNavBottomSection
          totalFiles={totalFiles}
          onFileCreate={onFileCreate}
        />
      </div>
    </div>
  );
}

export default SideNav;
