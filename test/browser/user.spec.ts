import { expect, test } from "@playwright/test";

test.describe.configure({ mode: "serial" });

test("a user can sign up successfully", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/signup`);

  await page.getByLabel("User name").fill("sarah");
  await page.getByLabel("Email").fill("sarah@email.com");
  await page.getByLabel("Password").fill("12345678");
  await page.getByRole("button", { name: "Sign Up" }).click();

  await page.waitForURL(/todos$/);
  await expect(page.getByLabel("Account")).toBeVisible();
});

test("a user can log in and log out successfully", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/login`);

  await page.getByLabel("Email").fill("sarah@email.com");
  await page.getByLabel("Password").fill("12345678");
  await page.getByRole("button", { name: "Log in" }).click();

  await page.waitForURL(/todos$/);
  await expect(page.getByLabel("Account")).toBeVisible();

  await page.getByLabel("Account").click();
  await page.getByLabel("Log out").click();

  await page.waitForURL(/login$/);
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Password")).toBeVisible();

  await page.goto(`${baseURL}/todos`);
  await page.waitForURL(/login$/);
});
