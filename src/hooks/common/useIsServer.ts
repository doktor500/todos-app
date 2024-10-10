import { useIsClient } from "@uidotdev/usehooks";

export const useIsServer = () => {
  const isClient = useIsClient();

  return !isClient;
};
