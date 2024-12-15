import PageContainer from '@/components/layout/page-container';
import { useSession } from 'next-auth/react';
import React from 'react';
import RoadmapViewPage from '@/app/dashboard/roadmaps/[id]/_components/roadmap-page-view';

export const metadata = {
  title: 'Dashboard : Roadmap'
};

export default function Page({ params }: { params: { id: string } }) {
  return (
    <PageContainer scrollable>
      <div className="space-y-2">
        <RoadmapViewPage roadmapId={params.id} />
      </div>
    </PageContainer>
  );
}
