import { Button } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Search, Send } from "lucide-react";
import Image from "next/image";
import React from "react";

function Header() {
  const { user }: any = useKindeBrowserClient();

  return (
    <div className="flex justify-end w-full gap-2 items-center">
      <div>
        <div className="mt-2 flex gap-2 items-center">
          <Image
            src={user?.picture || "/default_avatar.png"}
            alt="user"
            width={30}
            height={30}
            className="rounded-full"
          />
          <div>
            <h2 className="text-[14px] font-bold">
              {user?.given_name} {user?.family_name}
            </h2>
            <h2 className="text-[12px] text-gray-500">{user?.email}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
