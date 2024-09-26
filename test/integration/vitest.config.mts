/* eslint-disable no-restricted-imports */
import path from "path";
import { defineConfig } from "vitest/config";

import { rootConfig } from "../../vitest.config.mjs";

export default defineConfig({
  ...rootConfig,
  root: "./test/integration",
  test: {
    ...rootConfig.test,
    setupFiles: [...rootConfig.test.setupFiles],
    globalSetup: [path.resolve(__dirname, "vitest-integration-tests-setup.ts")],
  },
});
