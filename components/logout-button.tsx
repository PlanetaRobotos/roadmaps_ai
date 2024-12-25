'use client';

import React, { useContext } from 'react';
import { AuthContext } from '@/context/auth-context';
import { Button } from '@/components/ui/button';

const LogoutButton: React.FC = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      logout();
      // Optionally redirect or show a message
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Button onClick={handleLogout} variant="destructive">
      Logout
    </Button>
  );
};

export default LogoutButton;
