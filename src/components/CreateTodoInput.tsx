"use client";

import { useFormStatus } from "react-dom";

import { useInput } from "@/hooks/common/useInput";
import { MAX_LENGTH } from "@/modules/domain/stringUtils";

export const CreateTodoInput = ({ disabled }: { disabled: boolean }) => {
  const { pending } = useFormStatus();
  const { inputRef } = useInput({ focus: !disabled && !pending });

  return (
    <input
      ref={inputRef}
      type="text"
      name="content"
      aria-label="New todo"
      placeholder="Add a to-do..."
      className="w-[225px] border-none bg-transparent pl-1 text-sm outline-none disabled:cursor-wait md:w-[525px]"
      disabled={disabled || pending}
      maxLength={MAX_LENGTH}
      required={true}
      autoFocus={true}
    />
  );
};
