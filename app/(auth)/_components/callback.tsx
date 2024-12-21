'use client';

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { AuthContext } from '@/context/auth-context';

const AuthCallback: React.FC = () => {
  const { login } = useContext(AuthContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      // Store the token securely
      console.log('Token:', token);
      login(token);
      toast.success('Successfully logged in!');
      router.push('/dashboard');
    } else {
      toast.error('Authentication failed. No token found.');
      router.push('/signin');
    }
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">Loading...</div>
  );
};

export default AuthCallback;
