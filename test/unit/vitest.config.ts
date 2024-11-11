/* eslint-disable no-restricted-imports */
import react from "@vitejs/plugin-react";
import * as path from "path";
import { defineConfig } from "vitest/config";

import { rootConfig } from "../../vitest.config";

export default defineConfig({
  ...rootConfig,
  root: "./test/unit",
  plugins: [...rootConfig.plugins, react()],
  test: {
    ...rootConfig.test,
    environment: "jsdom",
    mockReset: true,
    sequence: { concurrent: false },
    setupFiles: [path.resolve(__dirname, "vitest-unit-tests-setup.ts")],
  },
});
