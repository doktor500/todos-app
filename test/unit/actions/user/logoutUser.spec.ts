import { logoutUser } from "@/actions/user/logoutUser";
import authService from "@/modules/domain/shared/authService";

vi.mock("@/modules/domain/shared/authService");

describe("logout user action", () => {
  it("deletes a user session", async () => {
    vi.mocked(authService.createSession).mockResolvedValue();

    await logoutUser();

    expect(authService.deleteSession).toHaveBeenCalledOnce();
  });
});
