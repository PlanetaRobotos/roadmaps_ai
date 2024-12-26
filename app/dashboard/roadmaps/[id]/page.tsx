import PageContainer from '@/components/layout/page-container';
// import { useSession } from 'next-auth/react';
import React from 'react';
import RoadmapViewPage from '@/app/dashboard/roadmaps/[id]/_components/roadmap-page-view';

export const metadata = {
  title: 'Dashboard : Course'
};

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="h-full p-2 md:px-4">
      <RoadmapViewPage roadmapId={params.id} />
    </div>
  );
}
