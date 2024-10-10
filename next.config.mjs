/* eslint-disable no-restricted-imports */
import { localMappings } from "./scripts/generate-mappings.mjs";
import { isLocalEnvironment } from "./src/modules/infrastructure/systemUtils.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    instrumentationHook: true,
    turbo: {
      resolveAlias: isLocalEnvironment() ? localMappings : {},
      resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
    },
  },
  typescript: {
    tsconfigPath: isLocalEnvironment() === "local" ? "tsconfig.local.json" : "tsconfig.json",
  },
};

export default nextConfig;
