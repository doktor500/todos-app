import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import { expect } from "vitest";

import { createTodo } from "@/actions/createTodo";
import { deleteTodo } from "@/actions/deleteTodo";
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
vi.mock("@/actions/deleteTodo", () => ({ deleteTodo: vi.fn() }));

describe("todos page", () => {
  it("renders user todos successfully", async () => {
    const todo = aTodo();
    const user = aUser({ todos: [todo] });
    vi.mocked(usersRepository).findById.mockResolvedValueOnce(user);

    await renderAsync(Page, { params: { id: user.id } });

    expect(screen.getByLabelText(todo.content)).toBeVisible();
  });

  it.each`
    completed
    ${true}
    ${false}
  `(
    "marks completed todos as checked when the list of todos is rendered",
    async ({ completed }) => {
      const todo = aTodo({ completed });
      const user = aUser({ todos: [todo] });
      vi.mocked(usersRepository).findById.mockResolvedValueOnce(user);

      await renderAsync(Page, { params: { id: user.id } });

      expect(screen.getByRole("checkbox")).toHaveAttribute(
        "aria-checked",
        `${completed}`,
      );
    },
  );

  it("calls create todo action when the form is submitted", async () => {
    const user = aUser();
    const newTodo = "New todo";
    vi.mocked(usersRepository).findById.mockResolvedValueOnce(user);

    await renderAsync(Page, { params: { id: user.id } });

    fireEvent.change(screen.getByLabelText("New todo"), {
      target: { value: newTodo },
    });

    await act(() => fireEvent.submit(screen.getByLabelText("Create todo")));
    expect(createTodo).toHaveBeenCalledWith(
      expect.objectContaining(formData({ todo: newTodo, userId: user.id })),
    );
  });

  it("clears the input field to create a todo when the form is submitted", async () => {
    const user = aUser();
    const newTodo = "New todo";
    vi.mocked(usersRepository).findById.mockResolvedValueOnce(user);

    await renderAsync(Page, { params: { id: user.id } });

    const newTodoInputField = screen.getByLabelText("New todo");
    fireEvent.change(newTodoInputField, { target: { value: newTodo } });

    await act(() => fireEvent.submit(screen.getByLabelText("Create todo")));
    expect(newTodoInputField).toHaveTextContent("");
  });

  it("adds the new todo to the list when the form is submitted", async () => {
    const user = aUser({ todos: [] });
    const newTodo = "New todo";
    vi.mocked(usersRepository).findById.mockResolvedValueOnce(user);

    await renderAsync(Page, { params: { id: user.id } });

    const newTodoInputField = screen.getByLabelText("New todo");
    fireEvent.change(newTodoInputField, { target: { value: newTodo } });

    await act(() => fireEvent.submit(screen.getByLabelText("Create todo")));
    waitFor(() =>
      expect(screen.getByLabelText("Todo description")).toHaveTextContent(
        newTodo,
      ),
    );
  });

  it("calls toggle todo action when the todo checkbox is clicked", async () => {
    const todo = aTodo();
    const user = aUser({ todos: [todo] });

    vi.mocked(usersRepository).findById.mockResolvedValueOnce(user);

    await renderAsync(Page, { params: { id: user.id } });

    fireEvent.click(screen.getByRole("checkbox"));
    expect(toggleTodo).toHaveBeenCalledWith({
      userId: user.id,
      todoId: todo.id,
      completed: true,
    });
  });

  it.each`
    completed
    ${true}
    ${false}
  `(
    "toggles todo completed state when the checkbox is clicked",
    async ({ completed }) => {
      const todo = aTodo({ completed });
      const user = aUser({ todos: [todo] });

      vi.mocked(usersRepository).findById.mockResolvedValueOnce(user);

      await renderAsync(Page, { params: { id: user.id } });

      fireEvent.click(screen.getByRole("checkbox"));

      waitFor(() =>
        expect(screen.getByRole("checkbox")).toHaveAttribute(
          "aria-checked",
          `${completed}`,
        ),
      );
    },
  );

  it("calls delete todo action when the trash icon is clicked", async () => {
    const todo = aTodo();
    const user = aUser({ todos: [todo] });

    vi.mocked(usersRepository).findById.mockResolvedValueOnce(user);

    await renderAsync(Page, { params: { id: user.id } });

    fireEvent.click(screen.getByLabelText("Delete todo"));
    expect(deleteTodo).toHaveBeenCalledWith({
      userId: user.id,
      todoId: todo.id,
    });
  });

  it("deletes todo from the list of todos when the trash icon is clicked", async () => {
    const todo = aTodo();
    const user = aUser({ todos: [todo] });

    vi.mocked(usersRepository).findById.mockResolvedValueOnce(user);

    await renderAsync(Page, { params: { id: user.id } });

    fireEvent.click(screen.getByLabelText("Delete todo"));
    waitFor(() =>
      expect(screen.getByLabelText("Todo description")).not.toBeInTheDocument(),
    );
  });
});
