"use client";

import { Spinner } from "@/components/ui/Spinner";
import { useIsServer } from "@/hooks/common/useIsServer";
import { useTodos } from "@/hooks/useTodos";

export const TodosSpinner = () => {
  const isServer = useIsServer();
  const { pendingTransaction } = useTodos();

  return <Spinner display={isServer || pendingTransaction} />;
};
