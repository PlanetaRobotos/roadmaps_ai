'use client';

import React, { useContext } from 'react';
import { AuthContext } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashboardView() {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      logout();
      // Optionally redirect or show a message
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <div className="w-full max-w-2xl rounded bg-white p-8 shadow">
          <h1 className="mb-4 text-3xl font-bold">
            Welcome, {user?.userName}!
          </h1>
          <p className="mb-6">This is your dashboard.</p>
          <Button onClick={handleLogout} variant="destructive">
            Logout
          </Button>
        </div>
      </div>
    </ProtectedRoute>
  );
}
