/* eslint-disable no-restricted-imports */
import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todo App",
  description: "Simple todos application",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
