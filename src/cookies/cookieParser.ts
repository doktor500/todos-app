import { cookies } from "next/headers";

import { Optional } from "@/modules/domain/utils/optionalUtils";

export const getCookie = async (name: string): Promise<Optional<string>> => {
  return (await cookies()).get(name)?.value;
};
