import { expect, test } from "@playwright/test";

const userId = 1;

test("Can create and delete a todo", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/users/${userId}/todos`);

  await page.getByLabel("New todo").fill("Todo 1");
  await page.getByLabel("New todo").press("Enter");
  await page.getByLabel("Loading spinner").waitFor({ state: "hidden" });

  await expect(page.getByRole("textbox", { name: "Todo 1" })).toBeVisible();

  await page.getByLabel("Delete todo").click();
  await page.getByLabel("Loading spinner").waitFor({ state: "hidden" });

  await expect(page.getByRole("textbox", { name: "Todo 1" })).not.toBeVisible();
});
