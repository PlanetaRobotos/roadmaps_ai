'use client';

import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import RoadmapsList from '@/app/dashboard/roadmaps/_components/roadmaps-list';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import React from 'react';
import { SignOut } from '@/components/signout-button';

export default function OverViewPage() {
  const { data: session } = useSession();

  return (
    <PageContainer scrollable>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
          <Link
            href={'/dashboard/roadmaps/create'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        {/* Roadmaps List Component */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsContent value="overview" className="space-y-4">
            {/*<RoadmapsList roadmaps={libraryRoadmaps} loading={loadingLibrary} />*/}
            <SignOut />
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
