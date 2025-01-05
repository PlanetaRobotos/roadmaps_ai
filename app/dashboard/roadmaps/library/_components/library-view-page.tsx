'use client';

import PageContainer from '@/components/layout/page-container';
import RoadmapsList from '@/app/dashboard/roadmaps/_components/roadmaps-list';
import React, { useState, useEffect } from 'react';
import { RoadmapModel } from '@/app/api/client';
import { getAllRoadmaps } from '@/services/roadmapsService';
import { Icons } from '@/components/icons';
import { Separator } from '@/components/ui/separator';

function LibraryViewPage() {
  const [libraryRoadmaps, setLibraryRoadmaps] = useState<RoadmapModel[]>([]);
  const [loadingLibrary, setLoadingLibrary] = useState(true);

  useEffect(() => {
    getAllRoadmaps().then((result) => {
      setLibraryRoadmaps(result.data ?? []);
      setLoadingLibrary(false);
    });
  }, []);

  return (
    <PageContainer scrollable>
      <div className="space-y-5">
        <div className="mt-[-10] flex w-full justify-center">
          <h1 className="hover:border-gradient-to-r flex items-center border-b-4 border-transparent text-4xl font-extrabold text-gray-800">
            <Icons.book className="mr-2 text-blue-500" />
            Library
          </h1>
        </div>

        <Separator className="mx-auto h-1 w-5/6" />

        <RoadmapsList roadmaps={libraryRoadmaps} loading={loadingLibrary} />
      </div>
    </PageContainer>
  );
}

export default LibraryViewPage;
