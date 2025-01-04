'use client';

import * as z from 'zod';
import GoogleSignInButton from './google-auth-button';
import MagicLinkLogin from '@/app/(auth)/_components/magic-link';

export default function UserAuthForm({
  redirectPath
}: {
  redirectPath?: string | null;
}) {
  return (
    <>
      <MagicLinkLogin />

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

      <GoogleSignInButton redirectPath={redirectPath} />
    </>
  );
}
