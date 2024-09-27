import { useRef } from "react";

export const useForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const resetForm = (): void => formRef.current?.reset();

  return { formRef, resetForm };
};
