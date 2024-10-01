import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import { expect } from "vitest";

import { createTodo } from "@/actions/createTodo";
import { deleteTodo } from "@/actions/deleteTodo";
import { editTodo } from "@/actions/editTodo";
import { toggleTodo } from "@/actions/toggleTodo";
import Page from "@/app/users/[id]/todos/page";
import { usersRepository } from "@/modules/infrastructure/repositories/usersDBRepository";
import { aTodo } from "@/test/fixtures/todo.fixture";
import { aUser } from "@/test/fixtures/user.fixture";
import { formData } from "@/test/unit/utils/formDataUtils";
import { renderAsync } from "@/test/unit/utils/reactTestUtils";

vi.mock("@/modules/infrastructure/repositories/usersDBRepository");
vi.mock("@/actions/createTodo", () => ({ createTodo: vi.fn() }));
vi.mock("@/actions/toggleTodo", () => ({ toggleTodo: vi.fn() }));
vi.mock("@/actions/editTodo", () => ({ editTodo: vi.fn() }));
vi.mock("@/actions/deleteTodo", () => ({ deleteTodo: vi.fn() }));

describe("todos page", () => {
  it("renders user todos successfully", async () => {
    const todo = aTodo();
    const user = aUser({ todos: [todo] });
    vi.mocked(usersRepository).findById.mockResolvedValueOnce(user);

    await renderAsync(Page, { params: { id: user.id } });

    expect(screen.getByRole("textbox", { name: todo.content })).toBeInTheDocument();
  });

  it.each`
    completed
    ${true}
    ${false}
  `("marks completed todos as checked when the list of todos is rendered", async ({ completed }) => {
    const todo = aTodo({ completed });
    const user = aUser({ todos: [todo] });
    vi.mocked(usersRepository).findById.mockResolvedValueOnce(user);

    await renderAsync(Page, { params: { id: user.id } });

    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", `${completed}`);
  });

  it("calls create todo action when the form is submitted", async () => {
    const user = aUser();
    const newTodo = "New todo content";
    vi.mocked(usersRepository).findById.mockResolvedValueOnce(user);

    await renderAsync(Page, { params: { id: user.id } });

    const newTodoInputField = screen.getByLabelText("New todo");
    fireEvent.change(newTodoInputField, { target: { value: newTodo } });

    await act(() => fireEvent.submit(screen.getByLabelText("Create todo")));
    expect(createTodo).toHaveBeenCalledWith(expect.objectContaining(formData({ todo: newTodo, userId: user.id })));
  });

  it("clears the input field to create a todo when the form is submitted", async () => {
    const user = aUser();
    const newTodo = "New todo content";
    vi.mocked(usersRepository).findById.mockResolvedValueOnce(user);

    await renderAsync(Page, { params: { id: user.id } });

    const newTodoInputField = screen.getByLabelText("New todo");
    fireEvent.change(newTodoInputField, { target: { value: newTodo } });

    await act(() => fireEvent.submit(screen.getByLabelText("Create todo")));
    expect(newTodoInputField).toHaveTextContent("");
  });

  it("calls toggle todo action when the todo checkbox is clicked", async () => {
    const todo = aTodo();
    const user = aUser({ todos: [todo] });

    vi.mocked(usersRepository).findById.mockResolvedValueOnce(user);

    await renderAsync(Page, { params: { id: user.id } });

    fireEvent.click(screen.getByRole("checkbox"));
    expect(toggleTodo).toHaveBeenCalledWith({ userId: user.id, todoId: todo.id, completed: true });
  });

  it.each`
    completed
    ${true}
    ${false}
  `("toggles todo completed state when the checkbox is clicked", async ({ completed }) => {
    const todo = aTodo({ completed });
    const user = aUser({ todos: [todo] });

    vi.mocked(usersRepository).findById.mockResolvedValueOnce(user);

    await renderAsync(Page, { params: { id: user.id } });

    fireEvent.click(screen.getByRole("checkbox"));

    await waitFor(() => expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", `${completed}`));
  });

  it("calls edit todo action when the todo input looses focus", async () => {
    const todo = aTodo({ content: "original content" });
    const newTodoContent = "new content";
    const user = aUser({ todos: [todo] });

    vi.mocked(usersRepository).findById.mockResolvedValueOnce(user);

    await renderAsync(Page, { params: { id: user.id } });

    const todoInputField = screen.getByRole("textbox", { name: todo.content });
    fireEvent.change(todoInputField, { target: { value: newTodoContent } });
    fireEvent.blur(todoInputField);

    expect(editTodo).toHaveBeenCalledWith({ userId: user.id, todoId: todo.id, content: newTodoContent });
  });

  it("calls delete todo action when the trash icon is clicked", async () => {
    const todo = aTodo();
    const user = aUser({ todos: [todo] });

    vi.mocked(usersRepository).findById.mockResolvedValueOnce(user);

    await renderAsync(Page, { params: { id: user.id } });

    fireEvent.click(screen.getByLabelText("Delete todo"));
    expect(deleteTodo).toHaveBeenCalledWith({ userId: user.id, todoId: todo.id });
  });

  it("filters list of todos based on the text available in the search input", async () => {
    const todo1 = aTodo({ content: "Buy milk" });
    const todo2 = aTodo({ content: "Pay rent" });
    const user = aUser({ todos: [todo1, todo2] });

    vi.mocked(usersRepository).findById.mockResolvedValueOnce(user);

    await renderAsync(Page, { params: { id: user.id } });

    expect(screen.getByRole("textbox", { name: todo1.content })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: todo2.content })).toBeInTheDocument();

    const searchInput = screen.getByRole("searchbox");
    fireEvent.change(searchInput, { target: { value: "Milk" } });

    await waitFor(() => {
      expect(screen.queryByRole("textbox", { name: todo1.content })).toBeInTheDocument();
      expect(screen.queryByRole("textbox", { name: todo2.content })).not.toBeInTheDocument();
    });
  });
});
