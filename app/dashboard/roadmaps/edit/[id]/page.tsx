import React from 'react';
import EditRoadmapView from '@/app/dashboard/roadmaps/edit/[id]/_componets/edit-roadmap-view';

export const metadata = {
  title: 'Dashboard : Edit Course'
};

export default function Page({ params }: { params: { id: string } }) {
  return <EditRoadmapView roadmapId={params.id} />;

  return (
    <div className="flex h-[calc(100vh-300px)] max-w-2xl flex-col bg-blue-500 p-2 md:px-4">
      <header className="h-16 bg-gray-200">Header</header>
      <main className="flex-1 overflow-auto bg-gray-100">Main Content</main>
      <footer className="h-12 bg-gray-800">Footer</footer>
    </div>
  );
}
