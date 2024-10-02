/* eslint-disable no-undef, no-restricted-imports */
import { localMappings } from "./scripts/generate-mappings.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
    turbo: {
      resolveAlias: process.env.ENVIRONMENT === "local" ? localMappings : {},
      resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
    },
  },
  typescript: {
    tsconfigPath: process.env.ENVIRONMENT === "local" ? "tsconfig.local.json" : "tsconfig.json",
  },
};

export default nextConfig;
