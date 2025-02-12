'use client';

import GoogleSignInButton from './google-auth-button';
import MagicLinkLogin from '@/app/(auth)/_components/magic-link';
import { useSearchParams } from 'next/navigation';
import PasswordLogin from './password-login';
import React from 'react';

export default function UserAuthForm() {
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect');
  const appSumoKey = searchParams.get('key');

  console.log('redirectPath:', redirectPath);
  console.log('appSumoKey:', appSumoKey);

  return (
    <>
      {appSumoKey ? (
        <>
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Log in to your account
            </h1>
            <p className="text-sm text-muted-foreground">
              Welcome back! Please enter your details.
            </p>
          </div>
          <PasswordLogin appSumoKey={appSumoKey} />
        </>
      ) : (
        <>
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <GoogleSignInButton
            redirectPath={redirectPath}
            appSumoKey={appSumoKey}
          />

          {/*Separator*/}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <MagicLinkLogin appSumoKey={appSumoKey} />
        </>
      )}
    </>
  );
}
