'use client';

import React from 'react';
import { LoginCard } from '@/types/roadmap-types';
import { LockKeyhole } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { sendGAEvent } from '@next/third-parties/google';
import { AnalyticsEvents } from '@/constants/analytics';

interface LoginCardProps {
  props: LoginCard;
}

const LoginCard: React.FC<LoginCardProps> = ({ props }) => {
  const router = useRouter();
  const { title, thumbnail: thumbnailUrl } = props;

  const onLoginClick = () => {
    console.log('Login clicked in LoginCard');
    router.push(`/signin?redirect=/dashboard/roadmaps/${props.id}`);

    sendGAEvent('event', AnalyticsEvents.AUTH.SIGN_IN_FROM_LOGIN_CARD, {
      value: props.id
    });
  };

  return (
    <div className="h-full rounded-xl bg-blue-100 p-1">
      <Card className="relative flex h-full w-full flex-col overflow-hidden bg-white">
        {/* Blurred Lesson Background */}
        <div className="absolute inset-0 opacity-[0.2] blur-sm filter">
          <CardHeader className="p-5">
            <CardTitle className="w-full text-center">
              Understanding Git Basics
            </CardTitle>
          </CardHeader>
          <Separator className="h-1 bg-blue-100" />
          <ScrollArea className="w-full flex-1 overflow-auto">
            <CardContent className="flex h-full flex-grow flex-col justify-between px-0">
              <div className="prose prose-sm h-full max-w-none p-2 px-2 leading-relaxed sm:prose-base lg:prose-lg xs:px-6">
                <div className="prose prose-sm mt-4 sm:prose-base lg:prose-lg">
                  Git is a powerful version control system used by developers to
                  track changes in their codebase. Setting up Git on your
                  machine is the first step towards efficient collaboration and
                  code management.
                  <br />
                  <br />
                  To install Git, visit the official Git website and download
                  the appropriate version for your operating system. Follow the
                  installation instructions provided on the website to complete
                  the setup.
                  <br />
                  <br />
                  Once Git is installed, the next step is to configure your
                  identity. Use the following commands in your terminal to set
                  your name and email address:
                  <br />
                  <br />
                  Git is a powerful version control system used by developers to
                  track changes in their codebase. Setting up Git on your
                  machine is the first step towards efficient collaboration and
                  code management.
                  <br />
                  <br />
                  To install Git, visit the official Git website and download
                  the appropriate version for your operating system. Follow the
                  installation instructions provided on the website to complete
                  the
                </div>
              </div>
            </CardContent>
          </ScrollArea>
        </div>

        {/* Login Overlay Content */}
        <div className="relative flex h-full flex-col items-center justify-center px-6 py-8">
          <div className="relative aspect-square w-44 overflow-hidden rounded-2xl bg-blue-50 ring-2 ring-black/5 sm:w-56 md:w-64 lg:w-72">
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={thumbnailUrl || '/images/roadmaps/roadmap-thumbnail-1.png'}
                alt={title}
                fill
                className="object-cover opacity-[0.2]"
                sizes="(max-width: 640px) 176px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 288px"
              />
              <LockKeyhole className="h-24 w-24 text-blue-400 opacity-80" />
            </div>
          </div>

          <h2 className="mt-8 text-center text-xl font-semibold tracking-tight">
            Unlock Full Access
          </h2>
          <p className="mt-3 text-center text-sm text-muted-foreground">
            Sign in to explore all courses and create your own
          </p>
          <Button onClick={onLoginClick} className="mt-6 w-full max-w-[200px]">
            Sign in to continue
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LoginCard;
