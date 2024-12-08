import { useRouter } from "next/navigation.js";

export const useAppRouter = () => {
  const router = useRouter();
  const redirectTo = (path: string) => router.push(path);
  const refresh = () => router.refresh();

  return { redirectTo, refresh };
};
