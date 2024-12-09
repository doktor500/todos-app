import { useRef, useState } from "react";

export const useForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, setPending] = useState(false);

  const resetForm = (): void => {
    formRef.current?.reset();
    Array.from(formRef.current?.elements ?? [])
      .filter((element: Element) => element instanceof HTMLInputElement)
      .forEach((element: HTMLInputElement) => element.blur());
  };

  return { formRef, pending, setPending, resetForm };
};
