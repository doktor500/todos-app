import { AccountDropdown } from "@/components/core/app/accountDropdown";
import { AppLogo } from "@/components/core/app/appLogo";
import { AppSpinner } from "@/components/core/app/appSpinner";
import { AppTitle } from "@/components/core/app/appTitle";
import { cn } from "@/lib/utils";

type Props = {
  title?: string;
  isPending?: boolean;
  showAccountMenu?: boolean;
};

export const AppHeader = ({ title, isPending, showAccountMenu }: Props) => {
  return (
    <div className={cn("flex pb-6 pt-4", { "pl-12": showAccountMenu, "pt-7": !showAccountMenu })}>
      <div className="flex w-full items-center justify-center">
        <div className="h-8">
          <AppSpinner isPending={isPending ?? false} />
          <AppLogo />
        </div>
        <AppTitle title={title} />
      </div>
      <div className="pt-2">{showAccountMenu && <AccountDropdown />}</div>
    </div>
  );
};
