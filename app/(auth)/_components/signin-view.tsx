'use client';

import React from 'react';
import MagicLinkLogin from './magic-link';
import { Metadata } from 'next';
import Link from 'next/link';
import UserAuthForm from './user-auth-form';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import GoogleSignInButton from '@/app/(auth)/_components/google-auth-button';
import { useSearchParams } from 'next/navigation';
import { company } from '@/components/layout/app-sidebar';
import { CLIENT_URL } from '@/config/apiConfig';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function SignInViewPage() {
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect');
  console.log('redirectPath:', redirectPath);
  console.log(`${CLIENT_URL}/images/logo-bg-transparent.png`);

  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/examples/authentication"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 hidden md:right-8 md:top-8'
        )}
      >
        Login
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <img
            src={`${CLIENT_URL}/images/logo-bg-transparent.png`}
            alt={company.name}
            className="h-16 w-16"
          />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Free indie tool that empowers anyone to create engaging
              AI-generated courses in minutes. Perfect for learners, creators,
              and solopreneurs — save time and stay inspired! 🚀 &rdquo;
            </p>
            <footer className="text-sm">Marta Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <UserAuthForm redirectPath={redirectPath} />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{' '}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
