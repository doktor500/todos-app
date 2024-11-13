"use client";

import { useEffect } from "react";

import { logoutUser } from "@/actions/user/logoutUser";
import { AppHeader } from "@/components/core/app/appHeader";
import { useRedirect } from "@/hooks/common/useRedirect";
import { Route } from "@/router/appRouter";

const { LOGIN } = Route;

const Page = () => {
  const { redirectTo } = useRedirect();
  useEffect(() => void logoutUser().then(() => redirectTo(LOGIN)), [redirectTo]);

  return <AppHeader isPending={true} />;
};

export default Page;
