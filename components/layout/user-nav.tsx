'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { capitalize } from '@/utils/shared';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useContext } from 'react';
import { AuthContext } from '@/context/auth-context';
import { CreditCard, LogOut, SettingsIcon } from 'lucide-react';
import * as React from 'react';
import { useRouter } from 'next/navigation';

export function UserNav() {
  const { user } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  const router = useRouter();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative">
          <Avatar className="h-8 w-8 rounded-full">
            <AvatarImage
              // src={session.user?.image ?? ''}
              src={''}
              // alt={''}
              alt={''}
            />
            <AvatarFallback>
              {user?.firstName?.slice(0, 2)?.toUpperCase() || 'CN'}
            </AvatarFallback>
          </Avatar>
          <p className="text-sm font-medium leading-none">
            {capitalize(user?.firstName)}
          </p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            {/*<p className="text-sm font-medium leading-none">*/}
            {/*  {user?.firstName}*/}
            {/*</p>*/}
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <SettingsIcon className="mr-1" />
            Profile
            {/*<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>*/}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/pricing')}>
            <CreditCard className="mr-1" />
            Pricing
            {/*<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>*/}
          </DropdownMenuItem>
          {/*<DropdownMenuItem>*/}
          {/*  Settings*/}
          {/*  /!*<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>*!/*/}
          {/*</DropdownMenuItem>*/}
          {/*<DropdownMenuItem>New Team</DropdownMenuItem>*/}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut />
          Log out
          {/*<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>*/}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
  // }
}
