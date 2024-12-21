'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from '../lib/axios';
import { UserModel } from '@/app/api/client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: UserModel | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {}
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

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

  // // Send Magic Link
  // const loginWithMagicLink = async (email: string) => {
  //   try {
  //     await axios.post('v1/auth/magic-link', { email });
  //     // Optionally, show a success message
  //   } catch (error) {
  //     // Handle error (e.g., show error message)
  //     throw error;
  //   }
  // };

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out successfully!');
    router.push('/signin');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
