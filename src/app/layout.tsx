/* eslint-disable-next-line no-restricted-imports */
import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todo App",
  description: "Simple todos application",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased dark:bg-gray-900">{children}</body>
    </html>
  );
};

export default RootLayout;
