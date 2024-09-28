/* eslint-disable no-restricted-imports */
import "./globals.css";

import type { Metadata } from "next";
import { Barlow_Condensed as BarlowCondensed } from "next/font/google";
import { ThemeProvider } from "next-themes";

const barlowCondensed = BarlowCondensed({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "Simple todos application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${barlowCondensed.variable} antialiased dark:bg-gray-900`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
