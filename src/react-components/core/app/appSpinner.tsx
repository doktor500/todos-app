"use client";

import { useIsServer } from "@/hooks/common/useIsServer";
import { Spinner } from "@/react-components/ui/spinner";

export const AppSpinner = ({ isPending }: { isPending: boolean }) => {
  const isServer = useIsServer();

  return <Spinner display={isServer || isPending} />;
};
