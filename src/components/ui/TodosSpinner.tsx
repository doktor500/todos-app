"use client";

import { Spinner } from "@/components/ui/Spinner";
import { useTodos } from "@/hooks/useTodos";

export const TodosSpinner = () => {
  const { pendingTransaction } = useTodos();

  return <Spinner display={pendingTransaction} />;
};
