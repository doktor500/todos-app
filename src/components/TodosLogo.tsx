"use client";

import Image from "next/image";

import { useIsServer } from "@/hooks/common/useIsServer";
import { useTodos } from "@/hooks/useTodos";

export const TodosAppLogo = () => {
  const isServer = useIsServer();
  const { pendingTransaction } = useTodos();
  const display = !isServer && !pendingTransaction;

  return <>{display && <Image src="/images/logo.png" alt="logo" width="24" height="24" />}</>;
};
