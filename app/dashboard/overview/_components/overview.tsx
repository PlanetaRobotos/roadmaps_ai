'use client';

import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
// import { useSession } from 'next-auth/react';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function OverViewPage() {
  const router = useRouter();

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
            onClick={() => {
              console.log('Clicked');
              router.push('/dashboard/roadmaps/create');
            }}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        {/* Roadmaps List Component */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsContent value="overview" className="space-y-4">
            {/*<RoadmapsList roadmaps={libraryRoadmaps} loading={loadingLibrary} />*/}
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
