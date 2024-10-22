/* eslint-disable-next-line no-restricted-imports */
import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { VercelToolbar } from "@vercel/toolbar/next";
import type { Metadata } from "next";
import localFont from "next/font/local";

import { cn } from "@/lib/utils";
import { isLocalEnvironment } from "@/modules/infrastructure/systemUtils";

export const metadata: Metadata = {
  title: "X Todo",
  description: "X Todo application",
};

const sfProDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/sf-pro-display-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/sf-pro-display-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sf-pro-display",
});

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={cn("h-screen bg-slate-900 antialiased", sfProDisplay.variable)}>
        {children}
        {isLocalEnvironment() && <VercelToolbar />}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
