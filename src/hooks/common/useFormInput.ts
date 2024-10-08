import { useEffect, useRef } from "react";

export const useFormInput = ({ focusOn: condition }: { focusOn: boolean }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (condition) inputRef?.current?.focus();
  }, [condition]);

  return { inputRef };
};
