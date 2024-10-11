import { useEffect, useRef } from "react";

export const useInput = ({ focus }: { focus?: boolean } = { focus: false }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const blur = () => {
    inputRef?.current?.blur();
  };

  useEffect(() => {
    if (focus) inputRef?.current?.focus();
  }, [focus]);

  return { inputRef, blur };
};
