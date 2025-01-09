'use client';

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { AuthContext } from '@/context/auth-context';

interface AuthCallbackProps {
  redirectPath?: string;
}

const AuthCallback: React.FC<AuthCallbackProps> = ({ redirectPath }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  // useEffect(() => {
  //   console.log('searchParams:', searchParams);
  //   const token = localStorage.getItem('token');
  //
  //   if (token) {
  //     console.log('Token:', token);
  //     login(token);
  //
  //     const params = new URLSearchParams(window.location.search);
  //     params.delete('token');
  //     const newUrl = `${window.location.pathname}?${params.toString()}`;
  //     window.history.replaceState({}, '', newUrl);
  //
  //     toast.success('Successfully logged in!');
  //     if (redirectPath != null) {
  //       router.push(redirectPath);
  //     }
  //   }
  //   //else {
  //   //   toast.error('Authentication failed. No token found.');
  //   //   router.push('/signin');
  //   // }
  // }, [router, redirectPath]);

  return null;
};

export default AuthCallback;
