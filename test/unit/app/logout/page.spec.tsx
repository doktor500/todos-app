import { render, waitFor } from "@testing-library/react";

import { logoutUser } from "@/actions/user/logoutUser";
import Page from "@/app/logout/page";
import { useRedirect } from "@/hooks/common/useRedirect";
import { Route } from "@/router/appRouter";

vi.mock("@/actions/user/logoutUser");
vi.mock("@/hooks/common/useRedirect");

const { LOGIN } = Route;

describe("User log out page", () => {
  it("calls log out user action and redirects user to log in page", async () => {
    const redirectTo = vi.fn();
    vi.mocked(logoutUser).mockResolvedValueOnce();
    vi.mocked(useRedirect).mockImplementationOnce(() => ({ redirectTo }));

    render(<Page />);

    await waitFor(() => {
      expect(logoutUser).toHaveBeenCalledOnce();
      expect(redirectTo).toHaveBeenLastCalledWith(LOGIN);
      expect(redirectTo).toHaveBeenCalledOnce();
    });
  });
});
