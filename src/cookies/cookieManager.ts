import { cookies } from "next/headers";

import { Optional } from "@/modules/domain/utils/optionalUtils";

type Options = {
  httpOnly: boolean;
  secure: boolean;
  samesite: string;
  path: string;
  expires: Date;
};

const getCookie = async (name: string): Promise<Optional<string>> => {
  return (await cookies()).get(name)?.value;
};

const setCookie = async (name: string, value: string, options: Options): Promise<void> => {
  (await cookies()).set(name, value, options);
};

const cookieManager = { getCookie, setCookie };

export default cookieManager;
