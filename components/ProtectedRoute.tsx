'use client';

import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/auth-context';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return <>{children}</>;
};

export default ProtectedRoute;
