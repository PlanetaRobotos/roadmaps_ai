'use client';

import PageContainer from '@/components/layout/page-container';
import RoadmapsList from '@/app/dashboard/roadmaps/_components/roadmaps-list';
import React, { useState, useEffect, useContext } from 'react';
import { RoadmapModel } from '@/app/api/client';
import { getUserRoadmaps } from '@/services/roadmapsService';
import { AuthContext } from '@/context/auth-context';
import { Icons } from '@/components/icons';
import { Separator } from '@/components/ui/separator';

function LibraryViewPage() {
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
      <div className="space-y-5">
        <div className="mt-[-10] flex w-full justify-center">
          <h1 className="hover:border-gradient-to-r flex items-center border-b-4 border-transparent text-4xl font-extrabold text-gray-800">
            <Icons.chart className="mr-2 text-blue-500" />
            My Progress
          </h1>
        </div>

        <Separator className="mx-auto h-1 w-5/6" />

        <RoadmapsList roadmaps={progressRoadmaps} loading={loadingProgress} />
      </div>
    </PageContainer>
  );
}

export default LibraryViewPage;
