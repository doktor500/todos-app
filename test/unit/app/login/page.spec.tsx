import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { loginUser } from "@/actions/user/loginUser";
import Page from "@/app/login/page";
import { useRedirect } from "@/hooks/common/useRedirect";
import { Route } from "@/router/appRouter";

vi.mock("@/actions/user/loginUser");
vi.mock("@/hooks/common/useRedirect");

const { HOME } = Route;

describe("User log in page", () => {
  beforeEach(() => {
    vi.mocked(useRedirect).mockImplementation(() => ({ redirectTo: vi.fn() }));
  });

  it("displays validation errors when the form is submitted with invalid values", async () => {
    render(<Page />);

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByText("Please enter a valid email address")).toBeVisible();
      expect(screen.getByText("Password must be at least 8 characters long")).toBeVisible();
    });
  });

  it("calls login user action when a valid form is submitted", async () => {
    const email = "david@email.com";
    const password = "password";

    render(<Page />);

    const emailField = screen.getByLabelText("Email");
    await userEvent.type(emailField, email);

    const passwordField = screen.getByLabelText("Password");
    await userEvent.type(passwordField, password);

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith({ email, password });
      expect(loginUser).toHaveBeenCalledOnce();
    });
  });

  it("redirects to home page when a valid form is submitted", async () => {
    const email = "david@email.com";
    const password = "password";

    const redirectTo = vi.fn();
    vi.mocked(useRedirect).mockImplementation(() => ({ redirectTo }));

    render(<Page />);

    const emailField = screen.getByLabelText("Email");
    await userEvent.type(emailField, email);

    const passwordField = screen.getByLabelText("Password");
    await userEvent.type(passwordField, password);

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(redirectTo).toHaveBeenCalledWith(HOME);
    });
  });
});
