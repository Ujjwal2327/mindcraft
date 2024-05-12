"use client";
import React, { useEffect, useState } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import Editor from "../_components/Editor";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FILE } from "../../dashboard/_components/FileList";
import Canvas from "../_components/Canvas";

function Workspace({ params }: any) {
  const convex = useConvex();
  const [triggerSave, setTriggerSave] = useState(false);
  const { fileId } = params;
  const [fileData, setFileData] = useState<FILE | any>();

  const getFileData = async () => {
    const result = await convex.query(api.files.getFileById, { _id: fileId });
    setFileData(result);
  };

  useEffect(() => {
    if (fileId) getFileData();
  }, []);

  return (
    <div className="h-screen">
      <WorkspaceHeader
        filename={fileData?.fileName || "File Name"}
        onSave={() => setTriggerSave(!triggerSave)}
      />

      {/* Workspace Layout  */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Document  */}
        <div>
          <h2 className="text-center font-extrabold">Notion</h2>
          <div className=" h-[85vh]">
            <Editor
              onSaveTrigger={triggerSave}
              fileId={fileId}
              fileData={fileData}
            />
          </div>
        </div>
        {/* Whiteboard/canvas  */}
        <div>
          <h2 className="text-center font-extrabold">Excalidraw</h2>
          <div className=" h-[85vh] border-l border-black bottom-2 mr-10">
            <Canvas
              onSaveTrigger={triggerSave}
              fileId={fileId}
              fileData={fileData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Workspace;
