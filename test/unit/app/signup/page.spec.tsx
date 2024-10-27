import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { createUser } from "@/actions/user/createUser";
import Page from "@/app/signup/page";
import { useRedirect } from "@/hooks/common/useRedirect";
import { Route } from "@/router/appRouter";

vi.mock("@/hooks/common/useRedirect");
vi.mock("@/actions/user/createUser");

const { TODOS } = Route;

describe("User sign up page", () => {
  beforeEach(() => {
    vi.mocked(useRedirect).mockImplementation(() => ({ redirectTo: vi.fn() }));
  });

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
      expect(createUser).toHaveBeenCalledOnce();
    });
  });

  it("redirects to user's todo list page when a valid form is submitted", async () => {
    const username = "david";
    const email = "david@email.com";
    const password = "password";

    const redirectTo = vi.fn();
    vi.mocked(useRedirect).mockImplementation(() => ({ redirectTo }));

    render(<Page />);

    const usernameField = screen.getByLabelText("User name");
    await userEvent.type(usernameField, username);

    const emailField = screen.getByLabelText("Email");
    await userEvent.type(emailField, email);

    const passwordField = screen.getByLabelText("Password");
    await userEvent.type(passwordField, password);

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(redirectTo).toHaveBeenCalledWith(TODOS);
    });
  });
});
