'use client';

import React, { useContext, useEffect } from 'react';
import { AuthContext } from '@/context/auth-context';
import Loading from '@/app/dashboard/_components/loading';
import AuthCallback from '@/app/(auth)/_components/callback';

export default function DefaultPageView() {
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        window.location.href = '/signin';
        console.log('User not found. Redirecting to /signin default page');
      } else {
        window.location.href = '/dashboard';
      }
    }
  }, [user, loading]);

  if (loading) {
    return <Loading />;
  }

  return <AuthCallback />;
}
