/* eslint-disable no-restricted-imports */
import { withVercelToolbar } from "@vercel/toolbar/plugins/next";
import { NextConfig } from "next";

import { localMappings } from "./scripts/generate-mappings";
import { isLocalEnvironment } from "./src/modules/infrastructure/systemUtils";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    resolveAlias: isLocalEnvironment() ? localMappings : {},
    resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
  },
  typescript: {
    tsconfigPath: isLocalEnvironment() ? "tsconfig.local.json" : "tsconfig.json",
  },
};

export default withVercelToolbar()(nextConfig);
