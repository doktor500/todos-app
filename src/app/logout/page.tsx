"use client";

import { useEffect } from "react";

import { logoutUser } from "@/actions/user/logoutUser";
import { AppHeader } from "@/components/core/app/appHeader";
import { useAppRouter } from "@/hooks/common/useAppRouter";
import { Route } from "@/router/appRouter";

const { LOGIN } = Route;

const Page = () => {
  const { redirectTo } = useAppRouter();
  useEffect(() => void logoutUser().then(() => redirectTo(LOGIN)), [redirectTo]);

  return <AppHeader isPending={true} />;
};

export default Page;
