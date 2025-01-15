'use client';

import React, { useContext, useEffect, useState } from 'react';
import { RoadmapModel } from '@/app/api/client';
import { getUserRoadmaps } from '@/services/roadmapsService';
import { AuthContext } from '@/context/auth-context';
import CourseCarousel from '@/components/carousels/course-carousel';
import ScrollablePage from '@/components/ScrollablePage';
import DashboardFooter from '@/app/dashboard/_components/dashboard-footer';
import { Separator } from '@/components/ui/separator';

function LibraryViewPage() {
  const { user } = useContext(AuthContext);
  const [progressRoadmaps, setProgressRoadmaps] = useState<RoadmapModel[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(false);

  useEffect(() => {
    if (!user) return;

    getUserRoadmaps(user.id!).then((result) => {
      console.log('User progress roadmaps:', result);
      setProgressRoadmaps(result ?? []);
      setLoadingProgress(false);
    });
  }, [user]);

  return (
    <ScrollablePage maxHeight="h-screen" direction="vertical">
      <div className="min-h-screen pb-12">
        {/* Hero Section */}
        <div className="mb-5 bg-gradient-to-b from-neutral-100 to-background">
          <div className="container mx-auto px-4 pt-8 md:px-8">
            <h1 className="text-4xl font-extrabold text-gray-800">Library</h1>
          </div>
        </div>

        {/*My Progress*/}
        <div className="container mx-auto px-4 md:px-8">
          {progressRoadmaps.length > 0 && (
            <section className="">
              <CourseCarousel
                roadmaps={progressRoadmaps}
                title="My Progress"
                subTitle="Recently added"
              />
            </section>
          )}
        </div>
      </div>
      {/*<DashboardFooter />*/}
    </ScrollablePage>
  );
}

export default LibraryViewPage;
