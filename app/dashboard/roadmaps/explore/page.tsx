import ExploreViewPage from './_components/explore-view-page';
import PageContainer from '@/components/layout/page-container';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

export const metadata = {
  title: 'Dashboard : Explore'
};

export default async function Page() {
  return (
    <div className="h-full p-4 md:px-6">
      <ExploreViewPage />
    </div>
  );
}
