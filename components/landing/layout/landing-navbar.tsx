'use client';
import { ChevronsDown, Github, Menu } from 'lucide-react';
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

// import { ToggleTheme } from "./toogle-theme";

interface RouteProps {
  href: string;
  label: string;
}

interface FeatureProps {
  title: string;
  description: string;
}

const routeList: RouteProps[] = [
  {
    href: '#features',
    label: 'Features'
  },
  {
    href: '#testimonials',
    label: 'Testimonials'
  },
  {
    href: '#pricing',
    label: 'Pricing'
  },
  {
    href: '#faq',
    label: 'FAQ'
  }
];

const featureList: FeatureProps[] = [
  {
    title: 'Showcase Your Value ',
    description: 'Highlight how your product solves user problems.'
  },
  {
    title: 'Build Trust',
    description:
      'Leverages social proof elements to establish trust and credibility.'
  },
  {
    title: 'Capture Leads',
    description:
      'Make your lead capture form visually appealing and strategically.'
  }
];

export const LandingNavbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <header className="sticky top-5 z-40 mx-auto flex w-[90%] items-center justify-between rounded-2xl border border-secondary bg-card bg-opacity-15 p-2 shadow-inner md:w-[70%] lg:w-[75%] lg:max-w-screen-xl">
      <Link href="/" className="flex items-center text-lg font-bold">
        <Image
          className="mr-2 h-9 w-9 rounded-lg border border-secondary"
          src="/images/logo.png"
          alt="Logo"
          width={28}
          height={28}
        />
        Levenue MiniCourses
      </Link>
      {/* <!-- Mobile --> */}
      <div className="flex items-center lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer lg:hidden"
            />
          </SheetTrigger>

          <SheetContent
            side="left"
            className="flex flex-col justify-between rounded-br-2xl rounded-tr-2xl border-secondary bg-card"
          >
            <div>
              <SheetHeader className="mb-4 ml-4">
                <SheetTitle className="flex items-center">
                  <Link href="/" className="flex items-center">
                    <ChevronsDown className="mr-2 h-9 w-9 rounded-lg border border-secondary bg-gradient-to-tr from-primary via-primary/70 to-primary text-white" />
                    Shadcn
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2">
                {routeList.map(({ href, label }) => (
                  <Button
                    key={href}
                    onClick={() => setIsOpen(false)}
                    asChild
                    variant="ghost"
                    className="justify-start text-base"
                  >
                    <Link href={href}>{label}</Link>
                  </Button>
                ))}
              </div>
            </div>

            <SheetFooter className="flex-col items-start justify-start sm:flex-col">
              <Separator className="mb-2" />

              {/*<ToggleTheme />*/}
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* <!-- Desktop --> */}
      <NavigationMenu className="mx-auto hidden lg:block">
        <NavigationMenuList>
          <NavigationMenuItem>
            {routeList.map(({ href, label }) => (
              <NavigationMenuLink key={href} asChild>
                <Link href={href} className="px-2 text-base">
                  {label}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/*<div className="hidden lg:flex">*/}
      {/*<ToggleTheme />*/}

      {/*<Button asChild size="sm" variant="ghost" aria-label="View on GitHub">*/}
      {/*  <Link*/}
      {/*    aria-label="View on GitHub"*/}
      {/*    href="https://github.com/nobruf/shadcn-landing-page.git"*/}
      {/*    target="_blank"*/}
      {/*  >*/}
      {/*    <Github className="size-5" />*/}
      {/*  </Link>*/}
      {/*</Button>*/}
      {/*</div>*/}
    </header>
  );
};
