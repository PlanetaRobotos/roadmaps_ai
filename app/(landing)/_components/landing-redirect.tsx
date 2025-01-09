'use client';

import React, { useContext, useEffect } from 'react';
import { AuthContext } from '@/context/auth-context';
import { useRouter } from 'next/navigation';

export const LandingRedirect: React.FC = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      if (user.emailConfirmed) {
        console.log('User is logged in');
        router.push('/dashboard');
      } else {
        console.log('User is logged in but email is not confirmed');
        router.push('/dashboard/profile');
      }
    } else {
      console.log('User is not logged in');
      // router.push('/login');
    }
  }, [router, user]);

  return null;
};
