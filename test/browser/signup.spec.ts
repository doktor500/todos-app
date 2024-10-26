import { expect, test } from "@playwright/test";

test("a user can sign up successfully", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/signup`);

  await page.getByLabel("User name").fill("sarah");
  await page.getByLabel("Email").fill("sarah@email.com");
  await page.getByLabel("Password").fill("12345678");
  await page.getByRole("button", { name: "Sign Up" }).click();

  await page.waitForURL(/todos$/);
  await expect(page.getByLabel("New todo")).toBeVisible();
});
