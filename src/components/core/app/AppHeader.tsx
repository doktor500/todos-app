import { AppLogo } from "@/components/core/app/appLogo";
import { AppSpinner } from "@/components/core/app/appSpinner";
import { AppTitle } from "@/components/core/app/appTitle";

export const AppHeader = ({ title, isPending }: { title?: string; isPending?: boolean }) => {
  return (
    <div className="flex items-center justify-center pb-6 pt-4">
      <div className="h-8">
        <AppSpinner isPending={isPending ?? false} />
        <AppLogo />
      </div>
      <AppTitle title={title} />
    </div>
  );
};
