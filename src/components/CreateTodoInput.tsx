import { Dispatch, SetStateAction, useEffect } from "react";
import { useFormStatus } from "react-dom";

import { useFormInput } from "@/hooks/common/useFormInput";

export const CreateTodoInput = ({ onSubmit: setSubmitStatus }: { onSubmit: Dispatch<SetStateAction<boolean>> }) => {
  const { pending } = useFormStatus();
  const { inputRef } = useFormInput({ focus: !pending });

  useEffect(() => setSubmitStatus(pending), [setSubmitStatus, pending]);

  return (
    <input
      ref={inputRef}
      type="text"
      name="content"
      aria-label="New todo"
      placeholder="Add a to-do..."
      className="w-64 border-none bg-transparent pl-1 text-sm outline-none md:w-80"
      disabled={pending}
      required={true}
      autoFocus={true}
    />
  );
};
