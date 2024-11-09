import { expect, test } from "@playwright/test";

test.describe.configure({ mode: "serial" });

test("user can create and delete a todo", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ storageState: "playwright-storage.json" });
  const page = await context.newPage();

  await page.goto(`${baseURL}/todos`);

  await page.getByLabel("New todo").fill("Buy coffee");
  await page.getByLabel("New todo").press("Enter");
  await page.getByLabel("Loading spinner").waitFor({ state: "hidden" });

  await expect(page.getByRole("textbox", { name: "Buy coffee" })).toBeVisible();
  await expect(page.getByLabel("New todo")).toHaveAttribute("autofocus");

  await page.getByLabel("Delete todo").click();
  await page.getByLabel("Loading spinner").waitFor({ state: "hidden" });

  await expect(page.getByRole("textbox", { name: "Buy coffee" })).toBeHidden();
});

test("the search filter reflects changes in the todo list when a user edits a todo", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ storageState: "playwright-storage.json" });
  const page = await context.newPage();

  await page.goto(`${baseURL}/todos`);

  await page.getByLabel("New todo").fill("Buy pizza");
  await page.getByLabel("New todo").press("Enter");
  await page.getByLabel("Loading spinner").waitFor({ state: "hidden" });

  await expect(page.getByRole("textbox", { name: "Buy pizza" })).toBeVisible();
  await page.getByRole("searchbox").fill("pizza");

  await page.getByRole("textbox", { name: "Buy pizza" }).fill("Buy wine");
  await page.getByRole("searchbox").click();

  await expect(page.getByRole("textbox", { name: "Buy wine" })).toBeHidden();

  await page.getByRole("searchbox").fill("");
  await expect(page.getByRole("textbox", { name: "Buy wine" })).toBeVisible();
});

test("the input field to edit a todo looses focus when the 'Enter' key is pressed", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ storageState: "playwright-storage.json" });
  const page = await context.newPage();

  await page.goto(`${baseURL}/todos`);

  await page.getByLabel("New todo").fill("Buy milk");
  await page.getByLabel("New todo").press("Enter");
  await page.getByLabel("Loading spinner").waitFor({ state: "hidden" });

  await expect(page.getByRole("textbox", { name: "Buy milk" })).toBeVisible();

  await page.getByRole("textbox", { name: "Buy milk" }).press("Enter");

  await expect(page.getByRole("textbox", { name: "Buy milk" })).not.toBeFocused();
});
