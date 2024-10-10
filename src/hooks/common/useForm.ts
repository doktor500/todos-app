import { useRef, useState } from "react";

export const useForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, setPending] = useState(false);

  const resetForm = (): void => formRef.current?.reset();

  return { formRef, pending, setPending, resetForm };
};
