import { Button } from "@/components/ui/button";
import { Link, LogOut, Save } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function WorkspaceHeader({ onSave, filename }: any) {
  const router = useRouter();
  return (
    <div className="p-3 border-b flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Image src="/logo.png" alt="logo" height={40} width={40} />
        <h2>{filename}</h2>
      </div>
      <div className="flex items-center gap-4">
        <Button
          className="h-8 text-[12px] gap-2 bg-yellow-500 hover:bg-yellow-600"
          onClick={onSave}
        >
          <Save className="h-4 w-4" /> Save
        </Button>
        <Button
          className="h-8 text-[12px] gap-2 bg-blue-500 hover:bg-blue-600"
          onClick={() => router.push("/dashboard")}
        >
          <LogOut className="h-4 w-4" />
          Dashboard
        </Button>
      </div>
    </div>
  );
}

export default WorkspaceHeader;
