/* eslint-disable-next-line no-restricted-imports */
import "./globals.css";

import type { Metadata, Viewport } from "next";

import RootLayout from "@/components/core/rootLayout";

export const metadata: Metadata = {
  title: "Pulse",
  description: "Pulse Todo Application",
};

export const viewport: Viewport = {
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  height: "device-height",
  width: "device-width",
};

export default RootLayout;
