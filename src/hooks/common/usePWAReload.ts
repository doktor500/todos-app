import { isMobile } from "react-device-detect";

import { useIsServer } from "@/hooks/common/useIsServer";

export const usePWAReload = () => {
  const isServer = useIsServer();

  if (!isServer && isMobile) {
    window.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") window.location.reload();
    });
  }
};
