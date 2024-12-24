import { useAutoAnimate } from "@formkit/auto-animate/react";
import { RefCallback } from "react";

export const useAtomicAnimations = (): [RefCallback<Element>, (enabled: boolean) => void] => {
  return useAutoAnimate({ disrespectUserMotionPreference: true });
};
