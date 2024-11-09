import { cookies as nextCookies } from "next/headers.js";

import { Optional } from "@/modules/domain/utils/optionalUtils";

type CookieOptions = {
  httpOnly: boolean;
  secure: boolean;
  samesite: string;
  path: string;
  expires: Date;
};

const cookieManager = (cookies = nextCookies) => {
  const getCookie = async (name: string): Promise<Optional<string>> => {
    return (await cookies()).get(name)?.value;
  };

  const setCookie = async (name: string, value: string, options: CookieOptions): Promise<void> => {
    (await cookies()).set(name, value, options);
  };

  return { getCookie, setCookie };
};

export default cookieManager;
