"use client";

import { CreditCard, LogOut, PlusCircle, Settings, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full border border-white/10 hover:border-white/20 transition-all">
          <Avatar className="h-full w-full">
            <AvatarFallback className="bg-blue-600 text-white font-bold">JD</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-zinc-950 border-white/10 text-white rounded-2xl p-2 shadow-2xl" align="end" forceMount>
        <DropdownMenuLabel className="font-normal p-2">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-bold leading-none">John Doe</p>
            <p className="text-xs leading-none text-zinc-500 mt-1">
              john.doe@entrestate.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/5" />
        <DropdownMenuGroup className="space-y-1">
          <Link href="/profile">
            <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-white/5">
                <UserIcon className="mr-2 h-4 w-4 text-zinc-500" />
                <span>Profile</span>
                <DropdownMenuShortcut className="text-zinc-600">⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/billing">
            <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-white/5">
                <CreditCard className="mr-2 h-4 w-4 text-zinc-500" />
                <span>Billing</span>
                <DropdownMenuShortcut className="text-zinc-600">⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/settings">
            <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-white/5">
                <Settings className="mr-2 h-4 w-4 text-zinc-500" />
                <span>Settings</span>
                <DropdownMenuShortcut className="text-zinc-600">⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-white/5" />
        <DropdownMenuItem className="rounded-lg cursor-pointer text-red-500 hover:bg-red-500/10 focus:bg-red-500/10">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut className="text-red-900">⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
