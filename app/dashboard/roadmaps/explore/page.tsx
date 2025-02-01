import ExploreViewPage from './_components/explore-view-page';
import ScrollablePage from '@/components/ScrollablePage';
import React from 'react';

export const metadata = {
  title: 'Dashboard : Explore'
};

export default async function Page() {
  return (
    <ScrollablePage>
      <ExploreViewPage />
    </ScrollablePage>
  );
}
