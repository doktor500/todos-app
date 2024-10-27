import { NextRequest } from "next/server";

import { decrypt } from "@/authentication";
import middleware from "@/middleware";
import cookieManager from "@/modules/domain/shared/cookieManager";
import { Route } from "@/router/appRouter";

vi.mock("@/authentication");
vi.mock("@/modules/domain/shared/cookieManager");

const BASE_URL = "http://localhost:3000";
const { LOGIN, TODOS } = Route;

describe("middleware", () => {
  it("redirects to login page when there is no auth session cookie", async () => {
    const request = new NextRequest(`${BASE_URL}${TODOS}`);
    vi.mocked(cookieManager.getCookie).mockResolvedValueOnce(undefined);

    const response = await middleware(request);

    expect(response.headers.get("location")).toBe(`${BASE_URL}${LOGIN}`);
  });

  it("redirects to login page when the decrypted auth session cookie does not contain a valid user id", async () => {
    const request = new NextRequest(`${BASE_URL}${TODOS}`);
    vi.mocked(cookieManager.getCookie).mockResolvedValueOnce("cookie");
    vi.mocked(decrypt).mockResolvedValueOnce(undefined);

    const response = await middleware(request);

    expect(response.headers.get("location")).toBe(`${BASE_URL}${LOGIN}`);
  });

  it("does not redirect user when the auth session cookie is valid", async () => {
    const request = new NextRequest(`${BASE_URL}${TODOS}`);
    vi.mocked(cookieManager.getCookie).mockResolvedValueOnce("cookie");
    vi.mocked(decrypt).mockResolvedValueOnce({ userId: 1 });

    const response = await middleware(request);

    expect(response.headers.get("location")).toBeNull();
  });
});
