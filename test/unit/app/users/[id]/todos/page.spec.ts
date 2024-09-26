import { screen } from "@testing-library/dom";
import { expect } from "vitest";

import Page from "@/app/users/[id]/todos/page";
import { usersRepository } from "@/modules/infrastructure/repositories/usersDBRepository";
import { aTodo } from "@/test/fixtures/todo.fixture";
import { aUser } from "@/test/fixtures/user.fixture";
import { renderAsync } from "@/test/unit/utils/reactTestUtils";

vi.mock("@/modules/infrastructure/repositories/usersDBRepository");

describe("todos page", () => {
  it("renders user todos successfully", async () => {
    const todo = aTodo();
    const user = aUser({ todos: [todo] });
    vi.mocked(usersRepository).findById.mockResolvedValueOnce(user);

    await renderAsync(Page, { params: { id: user.id } });

    expect(screen.getByText(todo.content)).toBeVisible();
  });
});
