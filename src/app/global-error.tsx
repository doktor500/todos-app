"use client";

import { AppHeader } from "@/components/core/app/appHeader";
import RootLayout from "@/components/core/rootLayout";

const GlobalError = () => (
  <RootLayout>
    <AppHeader title="Pulse" />
    <ErrorMessage />
  </RootLayout>
);

const ErrorMessage = () => (
  <div className="mx-auto w-full max-w-md space-y-6 pt-5">
    <div className="space-y-2 text-center">
      <h1 className="text-xl font-extrabold tracking-tighter">Oops!</h1>
      <p className="pt-2 text-gray-500 dark:text-gray-400 md:text-xl/relaxed">
        Something went wrong! Please try again later
      </p>
    </div>
  </div>
);

export default GlobalError;
