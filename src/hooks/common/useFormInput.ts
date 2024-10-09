import { useEffect, useRef } from "react";

export const useFormInput = ({ focusWhen: condition }: { focusWhen: boolean }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (condition) inputRef?.current?.focus();
  }, [condition]);

  return { inputRef };
};
