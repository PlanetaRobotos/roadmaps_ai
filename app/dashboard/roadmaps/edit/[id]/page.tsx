import React from 'react';
import EditRoadmapView from '@/app/dashboard/roadmaps/edit/[id]/_componets/edit-roadmap-view';

export const metadata = {
  title: 'Dashboard : Edit Course'
};

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="h-full p-2 md:px-4">
      <EditRoadmapView roadmapId={params.id} />
    </div>
  );
}
