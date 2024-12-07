import { useRef, useState } from "react";
import { isMobile } from "react-device-detect";

export const useForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, setPending] = useState(false);

  const resetForm = (): void => {
    if (!isMobile) formRef.current?.reset();
  };

  return { formRef, pending, setPending, resetForm };
};
