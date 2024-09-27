import { fireEvent, screen } from "@testing-library/react";
import { expect } from "vitest";

import { createTodo } from "@/actions/createTodo";
import Page from "@/app/users/[id]/todos/page";
import { usersRepository } from "@/modules/infrastructure/repositories/usersDBRepository";
import { aTodo } from "@/test/fixtures/todo.fixture";
import { aUser } from "@/test/fixtures/user.fixture";
import { formData } from "@/test/unit/utils/formDataUtils";
import { renderAsync } from "@/test/unit/utils/reactTestUtils";

vi.mock("@/modules/infrastructure/repositories/usersDBRepository");
vi.mock("@/actions/createTodo", () => ({ createTodo: vi.fn() }));

describe("todos page", () => {
  it("renders user todos successfully", async () => {
    const todo = aTodo();
    const user = aUser({ todos: [todo] });
    vi.mocked(usersRepository).findById.mockResolvedValueOnce(user);

    await renderAsync(Page, { params: { id: user.id } });

    expect(screen.getByLabelText(todo.content)).toBeVisible();
  });

  it("calls create todo action when the form is submitted", async () => {
    const user = aUser();
    const newTodo = "New todo";
    vi.mocked(usersRepository).findById.mockResolvedValueOnce(user);

    await renderAsync(Page, { params: { id: user.id } });

    fireEvent.change(screen.getByLabelText("new-todo"), {
      target: { value: newTodo },
    });

    fireEvent.submit(screen.getByTestId("new-todo-form"));
    expect(createTodo).toHaveBeenCalledWith(
      expect.objectContaining(formData({ todo: newTodo, userId: user.id })),
    );
  });
});
