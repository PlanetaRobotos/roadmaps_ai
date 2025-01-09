import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/landing.css';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Shadcn - Landing template',
  description: 'Landing template from Shadcn'
};

export default function LandingLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="landing" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background', inter.className)}>
        {children}
      </body>
    </html>
  );
}
