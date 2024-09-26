import type { Metadata } from "next";
import { Barlow_Condensed } from "next/font/google";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
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
      <body className="font-[family-name:var(--font-barlow-condensed)] antialiased" >
        {children}
      </body>
    </html>
  );
}