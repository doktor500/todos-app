import { Dispatch, SetStateAction, useEffect } from "react";
import { useFormStatus } from "react-dom";

import { useInput } from "@/hooks/common/useInput";
import { useIsServer } from "@/hooks/common/useIsServer";

export const CreateTodoInput = ({ onSubmit: setSubmitStatus }: { onSubmit: Dispatch<SetStateAction<boolean>> }) => {
  const isServer = useIsServer();
  const { pending } = useFormStatus();
  const disabled = isServer || pending;
  const { inputRef } = useInput({ focus: !disabled });

  useEffect(() => setSubmitStatus(pending), [setSubmitStatus, pending]);

  return (
    <input
      ref={inputRef}
      type="text"
      name="content"
      aria-label="New todo"
      placeholder="Add a to-do..."
      className="border-none bg-transparent pl-1 text-sm outline-none disabled:cursor-wait"
      disabled={disabled}
      required={true}
      autoFocus={true}
    />
  );
};
