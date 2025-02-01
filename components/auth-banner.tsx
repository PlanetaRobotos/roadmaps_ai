'use client';

import React, { useContext } from 'react';
import { Button } from '@/components/ui/button';
import { AuthContext } from '@/context/auth-context';

const AuthBanner: React.FC = () => {
  const { user, handleLogin, handleSignUp } = useContext(AuthContext);

  if (user) return null;

  console.log('AuthBanner');

  return (
    <div className="fixed bottom-0 left-0 z-50 flex w-full justify-center bg-secondary p-4 shadow-md">
      <div className="flex items-center space-x-4">
        <Button variant="default" onClick={handleLogin}>
          Login
        </Button>
        <Button variant="outline" onClick={handleSignUp}>
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default AuthBanner;
