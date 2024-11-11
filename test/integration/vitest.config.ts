/* eslint-disable no-restricted-imports */
import path from "path";
import { defineConfig } from "vitest/config";

import { rootConfig } from "../../vitest.config";

export default defineConfig({
  ...rootConfig,
  root: "./test/integration",
  test: {
    ...rootConfig.test,
    setupFiles: [path.resolve(__dirname, "vitest-integration-tests-setup.ts")],
    globalSetup: [path.resolve(__dirname, "vitest-integration-global-tests-setup.ts")],
  },
});
