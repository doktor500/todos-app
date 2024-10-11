import { useEffect, useRef } from "react";

export const useFormInput = ({ focus }: { focus: boolean }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (focus) inputRef?.current?.focus();
  }, [focus]);

  return { inputRef };
};
