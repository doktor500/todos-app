import { expect, Page, test } from "@playwright/test";

import { isNotEmpty } from "@/modules/domain/utils/stringUtils";
import { dragAndDrop } from "@/test/browser/utils/dragAndDropUtils";

test.describe.configure({ mode: "serial" });

test("a user can create and delete a todo", async ({ browser, baseURL }) => {
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

test("a user can sort todos", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ storageState: "playwright-storage.json" });
  const page = await context.newPage();
  const todos = ["0", "1", "2", "3", "4"];

  await page.goto(`${baseURL}/todos`);
  await createAllTodos(page, todos);
  expect(await getAllTodos(page)).toEqual(todos.reverse());

  await dragAndDrop(page, "svg[aria-label='Drag todo 0']", "svg[aria-label='Drag todo 4']");
  expect(await getAllTodos(page)).toEqual(["0", "4", "3", "2", "1"]);
});

test("when a user edits a todo the search filter reflects changes in the todo list", async ({ browser, baseURL }) => {
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

test("when a user presses 'Enter' editing a todo, the input field looses its focus", async ({ browser, baseURL }) => {
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

const createAllTodos = async (page: Page, todos: string[]) => {
  for (const todo in todos) {
    await createTodo(page, todo);
  }
};

const createTodo = async (page: Page, content: string) => {
  await page.getByLabel("New todo").fill(content);
  await page.getByLabel("New todo").press("Enter");
  await page.getByLabel("Loading spinner").waitFor({ state: "hidden" });
};

const getAllTodos = async (page: Page) => {
  return (await page.getByLabel("todo").allTextContents()).map((todo) => todo.toString()).filter(isNotEmpty);
};
