/* eslint-disable camelcase */
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pulse",
    short_name: "Pulse",
    description: "Pulse todos app",
    start_url: "/",
    display: "standalone",
    background_color: "#0D1527",
    theme_color: "#0D1527",
    icons: [
      {
        src: "/images/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/images/app-icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
