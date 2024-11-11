import * as path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

const baseDir = path.resolve(__dirname);

export const rootConfig = {
  plugins: [tsconfigPaths({ root: baseDir })],
  test: {
    globals: true,
    hookTimeout: 120000,
    teardownTimeout: 120000,
    testTimeout: 120000,
    reporters: ["default", "hanging-process"],
    sequence: {
      concurrent: true,
    },
  },
};

export default defineConfig(rootConfig);
