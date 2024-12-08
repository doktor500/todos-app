import { isMobile } from "react-device-detect";

import { useAppRouter } from "@/hooks/common/useAppRouter";
import { useIsServer } from "@/hooks/common/useIsServer";

export const usePWAReload = () => {
  const isServer = useIsServer();
  const router = useAppRouter();

  if (!isServer && isMobile) {
    window.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") router.refresh();
    });
  }
};
