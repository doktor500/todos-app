import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { expect } from "vitest";

import { createTodo } from "@/actions/todos/createTodo";
import { deleteTodo } from "@/actions/todos/deleteTodo";
import { editTodo } from "@/actions/todos/editTodo";
import { toggleTodo } from "@/actions/todos/toggleTodo";
import { getUser } from "@/actions/user/getUser";
import Page from "@/app/todos/page";
import { aTodo } from "@/test/fixtures/todo.fixture";
import { aUser } from "@/test/fixtures/user.fixture";
import { formData } from "@/test/unit/utils/formDataUtils";
import { renderAsync } from "@/test/unit/utils/reactTestUtils";

vi.mock("@/actions/user/getUser");
vi.mock("@/actions/todos/createTodo");
vi.mock("@/actions/todos/toggleTodo");
vi.mock("@/actions/todos/editTodo");
vi.mock("@/actions/todos/deleteTodo");

describe("todos page", () => {
  it("renders user todos successfully", async () => {
    const todo = aTodo();
    const user = aUser({ id: 1, todos: [todo] });
    vi.mocked(getUser).mockResolvedValueOnce(user);

    await renderAsync(Page);

    expect(screen.getByLabelText(`Edit todo ${todo.content}`)).toBeInTheDocument();
  });

  it.each`
    completed
    ${true}
    ${false}
  `("marks completed todos as checked '$completed' when the list of todos is rendered", async ({ completed }) => {
    const todo = aTodo({ completed });
    const user = aUser({ id: 1, todos: [todo] });
    vi.mocked(getUser).mockResolvedValueOnce(user);

    await renderAsync(Page);

    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByRole("option", { name: "All" }));

    await waitFor(() => expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", `${completed}`));
  });

  it("calls create todo action when the form is submitted", async () => {
    const user = aUser();
    const newTodo = "New todo content";
    vi.mocked(getUser).mockResolvedValueOnce(user);

    await renderAsync(Page);

    const newTodoInputField = screen.getByLabelText("New todo");
    await userEvent.type(newTodoInputField, newTodo);

    await act(() => fireEvent.submit(screen.getByLabelText("Create todo")));

    expect(createTodo).toHaveBeenCalledWith(expect.objectContaining(formData({ todo: newTodo })));
  });

  it("clears the input field to create a todo when the form is submitted", async () => {
    const user = aUser();
    const newTodo = "New todo content";
    vi.mocked(getUser).mockResolvedValueOnce(user);

    await renderAsync(Page);

    const newTodoInputField = screen.getByLabelText("New todo");
    await userEvent.type(newTodoInputField, newTodo);

    await act(() => fireEvent.submit(screen.getByLabelText("Create todo")));
    expect(newTodoInputField).toHaveTextContent("");
  });

  it("disables the todo entry while the form is being submitted", async () => {
    const user = aUser({ id: 1, todos: [] });
    const newTodo = "New todo content";
    const { promise, resolve } = Promise.withResolvers<void>();

    vi.mocked(getUser).mockResolvedValueOnce(user);
    vi.mocked(createTodo).mockImplementationOnce(() => promise);

    await renderAsync(Page);

    const newTodoInputField = screen.getByLabelText("New todo");
    await userEvent.type(newTodoInputField, newTodo);

    await act(() => fireEvent.submit(screen.getByLabelText("Create todo")));
    await waitFor(() => {
      expect(screen.getByLabelText(`Edit todo ${newTodo}`)).toHaveAttribute("disabled");
      expect(screen.getByRole("checkbox")).toHaveAttribute("disabled");
      expect(screen.getByLabelText("Delete todo")).toHaveAttribute("disabled");
    });
    await act(() => resolve());
  });

  it("calls toggle todo action when the todo checkbox is clicked", async () => {
    const todo = aTodo();
    const user = aUser({ id: 1, todos: [todo] });
    vi.mocked(getUser).mockResolvedValueOnce(user);

    await renderAsync(Page);

    fireEvent.click(screen.getByRole("checkbox"));
    expect(toggleTodo).toHaveBeenCalledWith({ todoId: todo.id, completed: true });
  });

  it.each`
    completed
    ${true}
    ${false}
  `("toggles todo completed state to checked '$completed' when the checkbox is clicked", async ({ completed }) => {
    const todo = aTodo({ completed });
    const user = aUser({ id: 1, todos: [todo] });
    vi.mocked(getUser).mockResolvedValueOnce(user);

    await renderAsync(Page);

    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByRole("option", { name: "All" }));
    fireEvent.click(screen.getByRole("checkbox"));

    await waitFor(() => expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", `${completed}`));
  });

  it("calls edit todo action when the todo input looses focus and todo content has been changed", async () => {
    const todo = aTodo({ content: "original content" });
    const newTodoContent = "new content";
    const user = aUser({ id: 1, todos: [todo] });
    vi.mocked(getUser).mockResolvedValueOnce(user);

    await renderAsync(Page);

    const todoInputField = screen.getByLabelText(`Edit todo ${todo.content}`);
    fireEvent.change(todoInputField, { target: { value: newTodoContent } });
    fireEvent.blur(todoInputField);

    expect(editTodo).toHaveBeenCalledWith({ todoId: todo.id, content: newTodoContent });
  });

  it("does not call edit todo action when the todo input looses focus and todo content has not changed", async () => {
    const todo = aTodo({ content: "original content" });
    const user = aUser({ id: 1, todos: [todo] });

    vi.mocked(getUser).mockResolvedValueOnce(user);

    await renderAsync(Page);

    const todoInputField = screen.getByLabelText(`Edit todo ${todo.content}`);
    fireEvent.change(todoInputField, { target: { value: todo.content } });
    fireEvent.blur(todoInputField);

    expect(editTodo).not.toHaveBeenCalled();
  });

  it("calls delete todo action when the trash icon is clicked", async () => {
    const todo = aTodo();
    const user = aUser({ id: 1, todos: [todo] });
    vi.mocked(getUser).mockResolvedValueOnce(user);

    await renderAsync(Page);

    fireEvent.click(screen.getByLabelText("Delete todo"));
    expect(deleteTodo).toHaveBeenCalledWith({ todoId: todo.id });
  });

  it("filters list of todos based on the text available in the search input", async () => {
    const todo1 = aTodo({ content: "Buy milk" });
    const todo2 = aTodo({ content: "Pay rent" });
    const user = aUser({ id: 1, todos: [todo1, todo2] });
    vi.mocked(getUser).mockResolvedValueOnce(user);

    await renderAsync(Page);

    expect(screen.queryByLabelText(`Edit todo ${todo1.content}`)).toBeInTheDocument();
    expect(screen.queryByLabelText(`Edit todo ${todo2.content}`)).toBeInTheDocument();

    const searchInput = screen.getByRole("searchbox");
    fireEvent.change(searchInput, { target: { value: "Milk" } });

    await waitFor(() => {
      expect(screen.queryByLabelText(`Edit todo ${todo1.content}`)).toBeInTheDocument();
      expect(screen.queryByLabelText(`Edit todo ${todo2.content}`)).not.toBeInTheDocument();
    });
  });

  it("filters list of todos based on the status", async () => {
    const todo1 = aTodo({ content: "Buy milk", completed: true });
    const todo2 = aTodo({ content: "Pay rent", completed: false });
    const user = aUser({ id: 1, todos: [todo1, todo2] });
    vi.mocked(getUser).mockResolvedValueOnce(user);

    await renderAsync(Page);

    expect(screen.queryByLabelText(`Edit todo ${todo1.content}`)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(`Edit todo ${todo2.content}`)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByRole("option", { name: "Done" }));

    await waitFor(() => {
      expect(screen.queryByLabelText(`Edit todo ${todo1.content}`)).toBeInTheDocument();
      expect(screen.queryByLabelText(`Edit todo ${todo2.content}`)).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByRole("option", { name: "All" }));

    await waitFor(() => {
      expect(screen.queryByLabelText(`Edit todo ${todo1.content}`)).toBeInTheDocument();
      expect(screen.queryByLabelText(`Edit todo ${todo2.content}`)).toBeInTheDocument();
    });
  });
});