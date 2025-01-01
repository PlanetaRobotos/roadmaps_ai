'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import KBar from '@/components/kbar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import React, { useContext } from 'react';
import { AuthContext } from '@/context/auth-context';
import AuthBanner from '@/components/auth-banner';
import AuthDialog from '@/components/auth-dialog';

export function LayoutPage({
  children,
  defaultOpen
}: {
  children: React.ReactNode;
  defaultOpen: boolean;
}) {
  const { user, loading } = useContext(AuthContext);

  return (
    <ProtectedRoute>
      <KBar>
        <SidebarProvider defaultOpen={user ? defaultOpen : false}>
          {user && <AppSidebar />}
          <SidebarInset>
            <Header />
            {children}
            <AuthBanner />
            <AuthDialog />
          </SidebarInset>
        </SidebarProvider>
      </KBar>
    </ProtectedRoute>
  );
}
