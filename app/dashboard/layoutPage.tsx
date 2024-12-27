'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import KBar from '@/components/kbar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import { useContext } from 'react';
import { AuthContext } from '@/context/auth-context';

export function LayoutPage({
  children,
  defaultOpen
}: {
  children: React.ReactNode;
  defaultOpen: boolean;
}) {
  const { user, loading } = useContext(AuthContext);

  if (!user) {
    return (
      <ProtectedRoute>
        <div>{children}</div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <KBar>
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar />
          <SidebarInset>
            <Header />
            {children}
          </SidebarInset>
        </SidebarProvider>
      </KBar>
    </ProtectedRoute>
  );
}
