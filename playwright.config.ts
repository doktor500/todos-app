import { defineConfig, devices, type PlaywrightTestConfig, PlaywrightTestProject } from "@playwright/test";

const { CI, PORT, LOGS_ENABLED, PLAYWRIGHT_WORKERS } = process.env;

const port = PORT;
const timeout = 30000;
const baseURL = `http://localhost:${port}`;
const nextDev = `next dev --turbo -p ${port}`;
const testDir = "test/browser";
const command = LOGS_ENABLED ? nextDev : `${nextDev} &>/dev/null`;

const browserTestSetupProjectName = "browser-test-setup";

const browserTestSetup: PlaywrightTestProject = {
  name: browserTestSetupProjectName,
  testMatch: /browser-test-setup\.ts/,
};

const browserTests: PlaywrightTestProject = {
  name: "browser tests",
  dependencies: [browserTestSetupProjectName],
  use: {
    ...devices["Desktop Chrome"],
    viewport: { height: 844, width: 390 },
  },
  testDir,
};

const localWebServer: PlaywrightTestConfig = {
  webServer: {
    timeout,
    command,
    reuseExistingServer: !CI,
    stdout: LOGS_ENABLED ? "pipe" : "ignore",
  },
};

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir,
  timeout,
  expect: { timeout: 15000 },
  fullyParallel: true,
  forbidOnly: !!CI,
  retries: CI ? 2 : 1,
  workers: PLAYWRIGHT_WORKERS ?? 4,
  reporter: "html",
  use: { baseURL, trace: "on-first-retry" },
  projects: [browserTestSetup, browserTests],
  ...localWebServer,
});

// eslint-disable-next-line no-console
console.log(`Running playwright tests against: ${baseURL}`);
