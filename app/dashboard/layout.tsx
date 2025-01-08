import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { LayoutPage } from '@/app/dashboard/layoutPage';
import React from 'react';
import { TokenProvider } from '@/context/token-context';

export const metadata: Metadata = {
  title: 'Next Shadcn Dashboard Starter',
  description: 'Basic dashboard with Next.js and Shadcn'
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';

  return (
    <TokenProvider>
      <LayoutPage defaultOpen={defaultOpen}>{children}</LayoutPage>
    </TokenProvider>
  );
}
