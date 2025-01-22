'use client';

import React, { useContext, useEffect, useState } from 'react';
import { RoadmapModel } from '@/app/api/client';
import { getUserRoadmaps } from '@/services/roadmapsService';
import { AuthContext } from '@/context/auth-context';
import CourseCarousel from '@/components/carousels/course-carousel';
import ScrollablePage from '@/components/ScrollablePage';
import { debounce } from 'lodash';
import { ExploreViewSkeleton } from '@/app/dashboard/roadmaps/explore/_components/sceleton';

function LibraryViewPage() {
  const { user } = useContext(AuthContext);
  const [progressRoadmaps, setProgressRoadmaps] = useState<RoadmapModel[]>([]);
  const [userRoadmaps, setUserRoadmaps] = useState<RoadmapModel[]>([]);
  // const [loadingProgress, setLoadingProgress] = useState(false);

  useEffect(() => {
    if (!user) return;

    const debouncedFetch = debounce(async () => {
      try {
        const result = await getUserRoadmaps(user.id!);
        const uRoadmaps = result.filter(
          (roadmap: RoadmapModel) => roadmap.authorId === user.id
        );
        const pRoadmaps = result.filter(
          (roadmap: RoadmapModel) => roadmap.authorId !== user.id
        );

        // console.log('userRoadmaps', uRoadmaps);
        console.log('progressRoadmaps', pRoadmaps);

        setUserRoadmaps(uRoadmaps ?? []);
        setProgressRoadmaps(pRoadmaps ?? []);
        // setLoadingProgress(false);
      } catch (error) {
        console.error('Error fetching explore data:', error);
      }
    }, 300);

    debouncedFetch();
    return () => debouncedFetch.cancel();
  }, [user]);

  if (!userRoadmaps || !progressRoadmaps) {
    return <ExploreViewSkeleton />;
  }

  console.log('userRoadmaps', userRoadmaps);

  return (
    <ScrollablePage maxHeight="h-screen pb-24" direction="vertical">
      <div className="min-h-screen space-y-8">
        {/* Hero Section */}
        <div className="mb-5 bg-gradient-to-b from-neutral-100 to-background">
          <div className="container mx-auto px-4 pt-8 md:px-8">
            <h1 className="text-4xl font-extrabold text-gray-800">Library</h1>
          </div>
        </div>

        {/*My*/}
        <div className="container mx-auto px-4 md:px-8">
          {userRoadmaps.length > 0 && (
            <section className="">
              <CourseCarousel roadmaps={userRoadmaps} title="My courses" />
            </section>
          )}
        </div>

        {/*Saved*/}
        <div className="container mx-auto px-4 md:px-8">
          {progressRoadmaps.length > 0 && (
            <section className="">
              <CourseCarousel
                roadmaps={progressRoadmaps}
                title="Saved courses"
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
