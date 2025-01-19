import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/landing.css';
import { cn } from '@/lib/utils';
import { LandingNavbar } from '@/components/landing/layout/landing-navbar';
import { company } from '@/constants/data';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `${company.name}`
};

export default function LandingLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="landing" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background', inter.className)}>
        <LandingNavbar />
        {children}
      </body>
    </html>
  );
}
