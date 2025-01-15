'use client';

import React, { useContext } from 'react';
import { AuthContext } from '@/context/auth-context';
import ProtectedRoute from '@/components/ProtectedRoute';
import LogoutButton from '@/components/logout-button';
import { useRouter } from 'next/navigation';

export default function DashboardView() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  // router.push('/dashboard/roadmaps/create');

  return (
    <>
      {/*<ProtectedRoute>*/}
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <div className="w-full max-w-2xl rounded bg-white p-8 shadow">
          <h1 className="mb-4 text-3xl font-bold">Welcome, {user?.name}!</h1>
          <p className="mb-6">This is your dashboard.</p>
          {/*<LogoutButton />*/}
        </div>
      </div>
      {/*</ProtectedRoute>*/}
    </>
  );
}
