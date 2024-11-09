import { NextRequest } from "next/server";

import middleware from "@/middleware";
import cookieManager from "@/modules/domain/shared/cookieManager";
import { decrypt } from "@/modules/domain/utils/encryptionUtils";
import { Route } from "@/router/appRouter";

vi.mock("@/modules/domain/utils/encryptionUtils");
vi.mock("@/modules/domain/shared/cookieManager");

const BASE_URL = "http://localhost:3000";
const { LOGIN, TODOS } = Route;

describe("middleware", () => {
  const userId = 1;

  it("redirects to login page when there is no auth session cookie", async () => {
    const request = new NextRequest(`${BASE_URL}${TODOS}`);
    vi.mocked(cookieManager).mockImplementation(() => ({ getCookie: vi.fn(), setCookie: vi.fn() }));

    const response = await middleware(request);

    expect(response.headers.get("location")).toBe(`${BASE_URL}${LOGIN}`);
  });

  it("redirects to login page when the decrypted auth session cookie does not contain a valid user id", async () => {
    const request = new NextRequest(`${BASE_URL}${TODOS}`);
    vi.mocked(cookieManager).mockImplementation(() => ({ getCookie: vi.fn(), setCookie: vi.fn() }));
    vi.mocked(decrypt).mockResolvedValueOnce(undefined);

    const response = await middleware(request);

    expect(response.headers.get("location")).toBe(`${BASE_URL}${LOGIN}`);
  });

  it("redirects to login page when the cookie is undefined", async () => {
    const request = new NextRequest(`${BASE_URL}${TODOS}`);
    vi.mocked(cookieManager).mockImplementation(() => ({
      getCookie: () => Promise.resolve(undefined),
      setCookie: vi.fn(),
    }));

    vi.mocked(decrypt).mockResolvedValueOnce({ userId });

    const response = await middleware(request);

    expect(response.headers.get("location")).toBe(`${BASE_URL}${LOGIN}`);
  });

  it("does not redirect user when the auth session cookie is valid", async () => {
    const request = new NextRequest(`${BASE_URL}${TODOS}`);
    vi.mocked(cookieManager).mockImplementation(() => ({
      getCookie: () => Promise.resolve("cookie"),
      setCookie: vi.fn(),
    }));

    vi.mocked(decrypt).mockResolvedValueOnce({ userId });

    const response = await middleware(request);

    expect(response.headers.get("location")).toBeNull();
  });
});
