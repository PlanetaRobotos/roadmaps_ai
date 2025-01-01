'use client';

import React, { useContext } from 'react';
import { Button } from '@/components/ui/button';
import { AuthContext } from '@/context/auth-context';

const AuthBanner: React.FC = () => {
  const { user, handleLogin, handleSignUp } = useContext(AuthContext);

  console.log('AuthBanner user:', user);
  if (user) return null; // Do not render the banner if the user is authenticated

  return (
    <div className="bottom-0 left-0 flex w-full justify-center bg-secondary p-4 shadow-md">
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
