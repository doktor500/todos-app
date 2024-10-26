import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { createUser } from "@/actions/user/createUser";
import Page from "@/app/users/signup/page";

vi.mock("@/hooks/common/useRedirect", () => ({ useRedirect: () => ({ redirectTo: vi.fn() }) }));
vi.mock("@/actions/user/createUser", () => ({ createUser: vi.fn() }));

describe("User sign up page", () => {
  it("displays validation errors when the form is submitted with invalid values", async () => {
    render(<Page />);

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByText("Username must be at least 3 characters long")).toBeVisible();
      expect(screen.getByText("Please enter a valid email address")).toBeVisible();
      expect(screen.getByText("Password must be at least 8 characters long")).toBeVisible();
    });
  });

  it("calls create user action when a valid form is submitted", async () => {
    const username = "david";
    const email = "david@email.com";
    const password = "password";

    render(<Page />);

    const usernameField = screen.getByLabelText("User name");
    await userEvent.type(usernameField, username);

    const emailField = screen.getByLabelText("Email");
    await userEvent.type(emailField, email);

    const passwordField = screen.getByLabelText("Password");
    await userEvent.type(passwordField, password);

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(createUser).toHaveBeenCalledWith({ username, email, password });
      expect(createUser).toHaveBeenCalledTimes(1);
    });
  });
});
