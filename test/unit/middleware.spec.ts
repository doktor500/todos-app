import { NextRequest } from "next/server";

import middleware from "@/middleware";
import { authCookie } from "@/modules/domain/shared/authService";
import { decrypt } from "@/modules/domain/utils/encryptionUtils";
import { Route } from "@/router/appRouter";

vi.mock("@/modules/domain/utils/encryptionUtils");

const BASE_URL = "http://localhost:3000";
const { LOGIN, TODOS } = Route;

describe("middleware", () => {
  const userId = 1;

  it("redirects to login page when there is no auth session cookie", async () => {
    const request = new NextRequest(`${BASE_URL}${TODOS}`);

    const response = await middleware(request);

    expect(response.headers.get("location")).toBe(`${BASE_URL}${LOGIN}`);
  });

  it("redirects to login page when the decrypted auth session cookie does not contain a valid user id", async () => {
    const request = new NextRequest(`${BASE_URL}${TODOS}`);
    vi.mocked(decrypt).mockResolvedValueOnce(undefined);

    const response = await middleware(request);

    expect(response.headers.get("location")).toBe(`${BASE_URL}${LOGIN}`);
  });

  it("redirects to login page when the cookie is undefined", async () => {
    const request = new NextRequest(`${BASE_URL}${TODOS}`);

    vi.mocked(decrypt).mockResolvedValueOnce({ userId });

    const response = await middleware(request);

    expect(response.headers.get("location")).toBe(`${BASE_URL}${LOGIN}`);
  });

  it("does not redirect user when the auth session cookie is valid", async () => {
    const request = new NextRequest(`${BASE_URL}${TODOS}`);
    request.cookies.set(authCookie.name, "cookie");

    vi.mocked(decrypt).mockResolvedValueOnce({ userId });

    const response = await middleware(request);

    expect(response.headers.get("location")).toBeNull();
  });
});
