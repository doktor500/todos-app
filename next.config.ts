/* eslint-disable no-restricted-imports */
import { NextConfig } from "next";

import { localMappings } from "./scripts/generate-mappings";
import { isLocalEnvironment } from "./src/modules/infrastructure/systemUtils";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    turbo: {
      resolveAlias: isLocalEnvironment() ? localMappings : {},
      resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
    },
  },
};

export default nextConfig;
