'use client';

import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import RoadmapsList from '../../roadmaps/_components/roadmaps-list';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function OverViewPage() {
  return (
    <PageContainer scrollable>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
          <Button
            onClick={() =>
              (window.location.href = '/dashboard/roadmaps/create')
            }
          >
            + New Roadmap
          </Button>
        </div>
        {/* Roadmaps List Component */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsContent value="overview" className="space-y-4">
            {/*<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">*/}
            <RoadmapsList />
            {/*</div>*/}
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
