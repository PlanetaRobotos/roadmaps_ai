﻿'use client';

import PageContainer from '@/components/layout/page-container';
import RoadmapsList from '@/app/dashboard/roadmaps/_components/roadmaps-list';
import { useState, useEffect } from 'react';
import { RoadmapModel } from '@/app/api/client';
import { getAllRoadmaps } from '@/services/roadmapsService';

function ProgressViewPage() {
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
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Library</h2>
        </div>

        <RoadmapsList roadmaps={libraryRoadmaps} loading={loadingLibrary} />
      </div>
    </PageContainer>
  );
}

export default ProgressViewPage;
