import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { createUser } from "@/actions/user/createUser";
import Page from "@/app/signup/page";
import { formData } from "@/test/unit/utils/formDataUtils";

vi.mock("@/actions/user/createUser");

describe("User sign up page", () => {
  const initialState = undefined;

  it("displays validation errors when the form is submitted with invalid values", async () => {
    const data = { username: "-", email: "email", password: "invalid" };
    const errors = {
      username: ["Username must be at least 3 characters long"],
      email: ["Please enter a valid email address"],
      password: ["Password must be at least 8 characters long"],
    };

    vi.mocked(createUser).mockResolvedValueOnce({ data, errors });

    render(<Page />);

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByText(errors.username[0])).toBeVisible();
      expect(screen.getByText(errors.email[0])).toBeVisible();
      expect(screen.getByText(errors.password[0])).toBeVisible();
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
      expect(createUser).toHaveBeenCalledWith(initialState, formData({ username, email, password }));
      expect(createUser).toHaveBeenCalledOnce();
    });
  });
});
