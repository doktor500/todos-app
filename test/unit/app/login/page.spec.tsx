import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { loginUser } from "@/actions/user/loginUser";
import Page from "@/app/login/page";
import { formData } from "@/test/unit/utils/formDataUtils";

vi.mock("@/actions/user/loginUser");
vi.mock("@/actions/user/logoutUser");

describe("User log in page", () => {
  const initialState = undefined;

  it("displays validation errors when the form is submitted with invalid values", async () => {
    const errors = {
      email: ["Please enter a valid email address"],
      password: ["Password must be at least 8 characters long"],
    };

    vi.mocked(loginUser).mockResolvedValueOnce({ errors });

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
      expect(loginUser).toHaveBeenCalledWith(initialState, formData({ email, password }));
      expect(loginUser).toHaveBeenCalledOnce();
    });
  });
});
