"use client";

import { LogOut } from "lucide-react";
import Image from "next/image";

import { logoutUser } from "@/actions/user/logoutUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const AccountDropdown = () => {
  return (
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
        <DropdownMenuItem className="cursor-pointer" onClick={logoutUser} aria-label="Log out">
          <LogOut />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
