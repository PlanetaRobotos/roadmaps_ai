import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import { RoadmapsClientProvider } from '@/services/RoadmapsClientProvider';
import { AuthProvider } from '@/context/auth-context';
import { GoogleAnalytics } from '@next/third-parties/google';
import React, { Suspense } from 'react';
import SupportDialog from '@/components/support-dialog';

export const metadata: Metadata = {
  title: 'Next Shadcn',
  description: 'Basic dashboard with Next.js and Shadcn'
};

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap'
});

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${lato.className}`}
      suppressHydrationWarning={true}
    >
      <body className={'overflow-hidden'}>
        <NextTopLoader showSpinner={false} />
        <Suspense fallback={null}>
          <AuthProvider>
            <Toaster />
            <RoadmapsClientProvider>{children}</RoadmapsClientProvider>
          </AuthProvider>
          <SupportDialog />
        </Suspense>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
    </html>
  );
}
