import { useRouter } from "next/navigation.js";

export const useRedirect = () => {
  const router = useRouter();
  const redirectTo = (path: string) => router.push(path);

  return { redirectTo };
};
