import React from 'react';
import EditRoadmapView from '@/app/dashboard/roadmaps/edit/[id]/_componets/edit-roadmap-view';

export const metadata = {
  title: 'Dashboard : Edit Course'
};

export default function Page({ params }: { params: { id: string } }) {
  const userId = 1;

  return (
    // <PageContainer>
    <EditRoadmapView roadmapId={params.id} userId={userId} />
    // <RoadmapView roadmapItems={roadmap} />
    // </PageContainer>
  );
}
