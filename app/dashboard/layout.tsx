// 'use client';

import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { LayoutPage } from '@/app/dashboard/layoutPage';

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

  return <LayoutPage defaultOpen={defaultOpen}>{children}</LayoutPage>;
  // return <div>{children}</div>;
}
