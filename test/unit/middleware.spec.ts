import { NextRequest } from "next/server";

import { decrypt } from "@/authentication";
import cookieManager from "@/cookies/cookieManager";
import middleware from "@/middleware";
import { LOGIN_ROUTE, TODOS_ROUTE } from "@/routes";

vi.mock("@/authentication");
vi.mock("@/cookies/cookieManager");

const BASE_URL = "http://localhost:3000";

describe("middleware", () => {
  it("redirects to login page when there is no auth session cookie", async () => {
    const request = new NextRequest(`${BASE_URL}${TODOS_ROUTE}`);
    vi.mocked(cookieManager.getCookie).mockResolvedValueOnce(undefined);

    const response = await middleware(request);

    expect(response.headers.get("location")).toBe(`${BASE_URL}${LOGIN_ROUTE}`);
  });

  it("redirects to login page when the decrypted auth session cookie does not contain a valid user id", async () => {
    const request = new NextRequest(`${BASE_URL}${TODOS_ROUTE}`);
    vi.mocked(cookieManager.getCookie).mockResolvedValueOnce("cookie");
    vi.mocked(decrypt).mockResolvedValueOnce(undefined);

    const response = await middleware(request);

    expect(response.headers.get("location")).toBe(`${BASE_URL}${LOGIN_ROUTE}`);
  });

  it("does not redirect user when the auth session cookie is valid", async () => {
    const request = new NextRequest(`${BASE_URL}${TODOS_ROUTE}`);
    vi.mocked(cookieManager.getCookie).mockResolvedValueOnce("cookie");
    vi.mocked(decrypt).mockResolvedValueOnce({ userId: 1 });

    const response = await middleware(request);

    expect(response.headers.get("location")).toBeNull();
  });
});
