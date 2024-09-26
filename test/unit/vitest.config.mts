/* eslint-disable no-restricted-imports */
import { defineConfig } from "vitest/config";

import { rootConfig } from "../../vitest.config.mjs";

export default defineConfig({
  ...rootConfig,
  root: "./test/unit",
  test: {
    ...rootConfig.test,
    sequence: { concurrent: false },
    setupFiles: [...rootConfig.test.setupFiles],
  },
});
