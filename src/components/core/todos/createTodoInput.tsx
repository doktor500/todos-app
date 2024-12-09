"use client";

import { isMobile } from "react-device-detect";
import { useFormStatus } from "react-dom";

import { useInput } from "@/hooks/common/useInput";
import { MAX_LENGTH } from "@/modules/domain/utils/stringUtils";

export const CreateTodoInput = ({ disabled }: { disabled: boolean }) => {
  const { pending } = useFormStatus();
  const { inputRef } = useInput({ focus: !disabled && !pending && !isMobile });

  return (
    <input
      ref={inputRef}
      type="text"
      name="content"
      aria-label="New todo"
      placeholder="Add a to-do..."
      className="w-full border-none bg-transparent pl-2.5 text-sm outline-none placeholder:text-white/80 disabled:cursor-wait"
      disabled={disabled}
      maxLength={MAX_LENGTH}
      required
    />
  );
};
