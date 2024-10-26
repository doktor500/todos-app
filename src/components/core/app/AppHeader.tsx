import { AppLogo } from "@/components/core/app/AppLogo";
import { AppSpinner } from "@/components/core/app/AppSpinner";
import { AppTitle } from "@/components/core/app/AppTitle";

export const AppHeader = ({ isPending }: { isPending?: boolean }) => {
  return (
    <div className="flex items-center justify-center pb-6 pt-4">
      <div className="h-8">
        <AppSpinner isPending={isPending ?? false} />
        <AppLogo />
      </div>
      <AppTitle />
    </div>
  );
};
