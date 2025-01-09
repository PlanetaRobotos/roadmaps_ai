'use client';

import React, { createContext, ReactNode, useEffect, useState } from 'react';
import axios from '../lib/axios';
import { UserModel } from '@/app/api/client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ORDER_REF_STORAGE_TITLE } from '@/constants/data';

interface AuthContextType {
  user: UserModel | null;
  loading: boolean;
  logout: () => void;
  isAuthDialogOpen: boolean;
  openAuthDialog: () => void;
  closeAuthDialog: () => void;
  handleLogin: () => void;
  handleSignUp: () => void;
  isPaidRole: boolean;
  isStandardRole: boolean;
  isEnterpriseRole: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: () => {},
  isAuthDialogOpen: false,
  openAuthDialog: () => {},
  closeAuthDialog: () => {},
  handleLogin: () => {},
  handleSignUp: () => {},
  isPaidRole: false,
  isStandardRole: false,
  isEnterpriseRole: false
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [user, setUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState<boolean>(false);

  const [isPaidRole, setIsPaidRole] = useState<boolean>(false);
  const [isStandardRole, setStandardRole] = useState<boolean>(false);
  const [isEnterpriseRole, setIsEnterpriseRole] = useState<boolean>(false);

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

  const fetchRoles = async () => {
    try {
      const response = await axios.get('v1/users/roles');
      const roles = response.data.roles;
      console.log('Roles:', response.data.roles);

      setIsPaidRole(roles?.includes('standard' || 'enterprise'));
      setStandardRole(!!roles?.includes('standard'));
      setIsEnterpriseRole(!!roles?.includes('enterprise'));
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  useEffect(() => {
    const loginByPaymentDetails = async (orderReference: string) => {
      try {
        const response = await axios.post(
          `/v1/purchase/login-by-payment-details`,
          {
            orderReference: orderReference
          }
        );

        console.log('Login by payment details response:', response.data);

        const token = response.data.token;
        if (token) {
          login(token);
          localStorage.removeItem(ORDER_REF_STORAGE_TITLE);
        }
      } catch (error) {
        console.error('Error logging in by payment details:', error);
      }
    };

    const queryLogin = (token: string) => {
      login(token);
      console.log('Query logging in with token:', token);
      const params = new URLSearchParams(window.location.search);
      params.delete('token');
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, '', newUrl);
    };

    const login = (token: string) => {
      console.log('Logging in with token:', token);
      localStorage.setItem('token', token);
      fetchUser();
      fetchRoles();
      console.log('User fetched');
    };

    const storageToken = localStorage.getItem('token');
    const queryToken = searchParams.get('token');
    console.log('Query token:', queryToken);

    if (queryToken) {
      queryLogin(queryToken);
    }

    const orderReference = localStorage.getItem(ORDER_REF_STORAGE_TITLE);
    if (orderReference) {
      console.log('Order reference:', orderReference);
      loginByPaymentDetails(orderReference);
    }

    if (storageToken) {
      fetchUser();
      fetchRoles();
      console.log('User fetched');
    } else {
      setLoading(false);
      console.log('No token found');
    }
  }, [searchParams]);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    // toast.success('Logged out successfully!');
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
        logout,
        isAuthDialogOpen,
        openAuthDialog,
        closeAuthDialog,
        handleLogin,
        handleSignUp,
        isPaidRole,
        isStandardRole,
        isEnterpriseRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
