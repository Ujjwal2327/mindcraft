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
    <div>
      <WorkspaceHeader
        filename={fileData?.fileName || "File Name"}
        onSave={() => setTriggerSave(!triggerSave)}
      />

      {/* Workspace Layout  */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Document  */}
        <div className=" h-4/5">
          <h2 className="text-center font-extrabold">Notion</h2>
          <Editor
            onSaveTrigger={triggerSave}
            fileId={fileId}
            fileData={fileData}
          />
        </div>
        {/* Whiteboard/canvas  */}
        <div className=" h-4/5 border-l border-black mr-10">
          <h2 className="text-center font-extrabold">Excalidraw</h2>
          <Canvas
            onSaveTrigger={triggerSave}
            fileId={fileId}
            fileData={fileData}
          />
        </div>
      </div>
    </div>
  );
}

export default Workspace;
