import {
  LoginLink,
  LogoutLink,
  RegisterLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import React from "react";

function Header() {
  const { isAuthenticated } = useKindeBrowserClient();
  return (
    <header className="bg-black absolute w-full top-0">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Image src="/logo.png" alt="logo" width={50} height={50} />

        <div className="flex flex-1 items-center justify-end">
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <LogoutLink>
                <div className="block rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-black transition hover:text-slate-800 sm:block">
                  Logout
                </div>
              </LogoutLink>
            ) : (
              <div className="flex gap-4">
                <LoginLink>
                  <div className="block rounded-md  px-5 py-2.5 text-sm font-medium text-white transition ">
                    Login
                  </div>
                </LoginLink>

                <RegisterLink>
                  <div className="block rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-black transition hover:text-slate-800 sm:block">
                    Register
                  </div>
                </RegisterLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
