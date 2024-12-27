'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from '../lib/axios';
import { UserModel } from '@/app/api/client';
import { toast } from 'sonner';
import { usePathname, useRouter } from 'next/navigation';

interface AuthContextType {
  user: UserModel | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
  isAuthDialogOpen: boolean;
  openAuthDialog: () => void;
  closeAuthDialog: () => void;
  handleLogin: () => void;
  handleSignUp: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
  isAuthDialogOpen: false,
  openAuthDialog: () => {},
  closeAuthDialog: () => {},
  handleLogin: () => {},
  handleSignUp: () => {}
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const pathname = usePathname();

  const [user, setUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState<boolean>(false);

  const router = useRouter();

  const openAuthDialog = () => setIsAuthDialogOpen(true);
  const closeAuthDialog = () => setIsAuthDialogOpen(false);

  const fetchUser = async () => {
    try {
      const response = await axios.get('v1/users/me');
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
      console.log('User fetched');
    } else {
      setLoading(false);
      console.log('No token found');
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    fetchUser();
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out successfully!');
    router.push('/signin');
  };

  const handleLogin = () => {
    closeAuthDialog();
    router.push(`/signin?redirect=${pathname}`);
  };

  const handleSignUp = () => {
    closeAuthDialog();
    router.push(`/signin?redirect=${pathname}`);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthDialogOpen,
        openAuthDialog,
        closeAuthDialog,
        handleLogin,
        handleSignUp
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
