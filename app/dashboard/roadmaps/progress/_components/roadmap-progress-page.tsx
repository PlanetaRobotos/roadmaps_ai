'use client';

import PageContainer from '@/components/layout/page-container';
import RoadmapsList from '@/app/dashboard/roadmaps/_components/roadmaps-list';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState, useEffect } from 'react';
import { RoadmapModel } from '@/app/api/client';
import { getUserRoadmaps } from '@/services/roadmapsService';

function ProgressViewPage() {
  const userId = 1; // Assume we have this userId
  const [progressRoadmaps, setProgressRoadmaps] = useState<RoadmapModel[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(true);

  useEffect(() => {
    getUserRoadmaps(userId).then((result) => {
      console.log('User progress roadmaps:', result);
      setProgressRoadmaps(result ?? []);
      setLoadingProgress(false);
    });
  }, [userId]);

  return (
    <PageContainer scrollable>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">My Progress</h2>
        </div>

        <RoadmapsList roadmaps={progressRoadmaps} loading={loadingProgress} />
      </div>
    </PageContainer>
  );
}

export default ProgressViewPage;
