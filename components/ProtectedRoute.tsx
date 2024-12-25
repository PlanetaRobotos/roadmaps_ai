'use client';

import React, { useContext, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AuthContext } from '@/context/auth-context';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const pathname = usePathname();

  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  const isPublicRoadmap = pathname.startsWith('/dashboard/roadmaps/');

  useEffect(() => {
    if (!loading && !user && !isPublicRoadmap) {
      // router.push('/signin');
      console.log('User not found. Redirecting to /signin');
    }
  }, [user, loading, router, isPublicRoadmap]);

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return <>{children}</>;
};

export default ProtectedRoute;
