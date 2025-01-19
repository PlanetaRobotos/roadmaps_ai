import React from 'react';
import EditRoadmapView from '@/app/dashboard/roadmaps/edit/[id]/_componets/edit-roadmap-view';
import PageContainer from '@/components/layout/page-container';

export const metadata = {
  title: 'Dashboard : Edit Course'
};

export default function Page({ params }: { params: { id: string } }) {
  return (
    // <PageContainer>
    <EditRoadmapView roadmapId={params.id} />
    // </PageContainer>
  );
}
