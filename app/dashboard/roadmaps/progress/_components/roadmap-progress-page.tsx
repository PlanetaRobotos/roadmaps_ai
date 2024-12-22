'use client';

import PageContainer from '@/components/layout/page-container';
import RoadmapsList from '@/app/dashboard/roadmaps/_components/roadmaps-list';
import { useState, useEffect, useContext } from 'react';
import { RoadmapModel } from '@/app/api/client';
import { getUserRoadmaps } from '@/services/roadmapsService';
import { AuthContext } from '@/context/auth-context';

function ProgressViewPage() {
  const { user } = useContext(AuthContext);
  const [progressRoadmaps, setProgressRoadmaps] = useState<RoadmapModel[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(true);

  useEffect(() => {
    if (!user) return;

    getUserRoadmaps(user.id!).then((result) => {
      console.log('User progress roadmaps:', result);
      setProgressRoadmaps(result ?? []);
      setLoadingProgress(false);
    });
  }, [user]);

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
