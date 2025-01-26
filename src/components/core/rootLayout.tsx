import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { VercelToolbar } from "@vercel/toolbar/next";
import localFont from "next/font/local";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { isLocalEnvironment } from "@/modules/infrastructure/systemUtils";

const sfProDisplay = localFont({
  src: [
    {
      path: "../../../public/fonts/sf-pro-display-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/sf-pro-display-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sf-pro-display",
});

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={cn("h-screen bg-gradient-to-b from-slate-900/80 to-slate-900 antialiased", sfProDisplay.variable)}
      >
        <main role="main" className="container mx-auto max-w-2xl items-center justify-center px-4">
          <div className="sticky top-0 z-50 pb-6">{children}</div>
        </main>
        {isLocalEnvironment() && <VercelToolbar />}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
