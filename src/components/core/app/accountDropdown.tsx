import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Route } from "@/router/appRouter";

const { LOGOUT } = Route;

export const AccountDropdown = () => {
  return (
    <div className="pt-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Image
            aria-label="Account"
            src="/images/user-account-icon.png"
            alt="account"
            width="64"
            height="64"
            className="cursor-pointer opacity-80 hover:opacity-100"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-28 dark:bg-slate-900">
          <Link href={LOGOUT}>
            <DropdownMenuItem className="cursor-pointer" aria-label="Log out">
              <LogOut />
              <span>Log out</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
