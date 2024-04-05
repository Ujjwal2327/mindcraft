"use client";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex, useMutation } from "convex/react";
import React, { useEffect } from "react";
import Header from "./_components/Header";
import FileList from "./_components/FileList";
import AdBanner from "./../../_components/AdBanner";

function Dashboard() {
  const convex = useConvex();
  const { user }: any = useKindeBrowserClient();
  const createUser = useMutation(api.users.createUser);

  useEffect(() => {
    const checkUser = async () => {
      const result = await convex.query(api.users.getUser, {
        email: user?.email,
      });
      if (!result?.length) {
        await createUser({
          name: user.given_name,
          email: user.email,
          image: user.picture,
        });
      }
    };
    if (user) checkUser();
  }, [user]);

  return (
    <div className="p-8">
      <Header />
      <FileList />
      <AdBanner
        data-ad-slot="4796371341"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

export default Dashboard;
