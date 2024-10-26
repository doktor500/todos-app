"use client";

import { Spinner } from "@/components/ui/Spinner";
import { useIsServer } from "@/hooks/common/useIsServer";

export const AppSpinner = ({ isPending }: { isPending: boolean }) => {
  const isServer = useIsServer();

  return <Spinner display={isServer || isPending} />;
};
