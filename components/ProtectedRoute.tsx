'use client';

import React, { useContext, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AuthContext } from '@/context/auth-context';
import Loading from '@/app/dashboard/_components/loading';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const pathname = usePathname();

  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  const isPublicRoadmap = pathname.startsWith('/dashboard/roadmaps/');

  useEffect(() => {
    if (!loading && !user && !isPublicRoadmap) {
      router.push('/signin');
      console.log('User not found. Redirecting to /signin');
    }
  }, [user, loading, router, isPublicRoadmap]);

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
