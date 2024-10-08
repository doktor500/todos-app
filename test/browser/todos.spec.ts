import { expect, test } from "@playwright/test";

const userId = 1;

test.describe.configure({ mode: "serial" });

test("Can create and delete a todo", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/users/${userId}/todos`);

  await page.getByLabel("New todo").fill("Buy coffee");
  await page.getByLabel("New todo").press("Enter");
  await page.getByLabel("Loading spinner").waitFor({ state: "hidden" });

  await expect(page.getByRole("textbox", { name: "Buy coffee" })).toBeVisible();
  await expect(page.getByLabel("New todo")).toHaveAttribute("autofocus");

  await page.getByLabel("Delete todo").click();
  await page.getByLabel("Loading spinner").waitFor({ state: "hidden" });

  await expect(page.getByRole("textbox", { name: "Buy coffee" })).not.toBeVisible();
});

test("Filter is taken into account when a todo is edited", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/users/${userId}/todos`);

  await page.getByLabel("New todo").fill("Buy pizza");
  await page.getByLabel("New todo").press("Enter");
  await page.getByLabel("Loading spinner").waitFor({ state: "hidden" });

  await expect(page.getByRole("textbox", { name: "Buy pizza" })).toBeVisible();
  await page.getByRole("searchbox").fill("pizza");

  await page.getByRole("textbox", { name: "Buy pizza" }).fill("Buy wine");
  await page.getByRole("searchbox").click();

  await expect(page.getByRole("textbox", { name: "Buy wine" })).not.toBeVisible();

  await page.getByRole("searchbox").fill("");
  await expect(page.getByRole("textbox", { name: "Buy wine" })).toBeVisible();
});
