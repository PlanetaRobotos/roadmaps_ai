'use client';

import React, { useEffect, useState } from 'react';
import CourseCarousel from '@/components/carousels/course-carousel';
import axios from '@/lib/axios';
import { ExplorePageModel } from '@/app/api/client';
import { ExploreViewSkeleton } from '@/app/dashboard/roadmaps/explore/_components/sceleton';
import { debounce } from 'lodash';
import DashboardFooter from '@/app/dashboard/_components/dashboard-footer';
import CategoryCarousel from '@/components/carousels/category-carousel';

const ExploreViewPage = () => {
  const [exploreData, setExploreData] = useState<ExplorePageModel>();

  useEffect(() => {
    const debouncedFetch = debounce(async () => {
      try {
        const response = await axios.get<ExplorePageModel>('v1/explore/page');
        setExploreData(response.data);

        console.log('Explore Data ntl:', response.data?.newToLevenueCourses);
      } catch (error) {
        console.error('Error fetching explore data:', error);
      }
    }, 300);

    debouncedFetch();
    return () => debouncedFetch.cancel();
  }, []);

  if (!exploreData) {
    return <ExploreViewSkeleton />;
  }

  return (
    <>
      <div className="min-h-screen pb-12">
        {/* Hero Section */}
        <div className="mb-5 bg-gradient-to-b from-neutral-100 to-background">
          <div className="container mx-auto px-4 pt-8 md:px-8">
            <h1 className="text-4xl font-extrabold text-gray-800">Browse</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 md:px-8">
          {/* New & Noteworthy Section */}
          {exploreData.newCourses && exploreData.newCourses.length > 0 && (
            <section className="">
              <CourseCarousel
                roadmaps={exploreData.newCourses}
                title="New & Noteworthy"
                subTitle="Fresh content to explore"
              />
            </section>
          )}

          {/* Top Charts */}
          {exploreData.topCourses && exploreData.topCourses.length > 0 && (
            <section className="mt-16">
              <CourseCarousel
                roadmaps={exploreData.topCourses}
                title="Top Charts"
                subTitle="Most popular courses"
              />
            </section>
          )}

          {/* New To Levenue */}
          {exploreData.newToLevenueCourses &&
            exploreData.newToLevenueCourses.length > 0 && (
              <section className="mt-16">
                <CourseCarousel
                  roadmaps={exploreData.newToLevenueCourses}
                  title="New to Levenue?"
                  // subTitle=""
                />
              </section>
            )}

          {/* Better You 2025 */}
          {exploreData.betterYouCourses &&
            exploreData.betterYouCourses.length > 0 && (
              <section className="mt-16">
                {/*<div className="mb-6 flex items-center gap-2">*/}
                {/*  /!*<Rocket className="h-6 w-6 text-purple-500" />*!/*/}
                {/*  <div>*/}
                {/*    <h2 className="text-2xl font-bold text-neutral-900">*/}
                {/*      Better You 2025*/}
                {/*    </h2>*/}
                {/*    <p className="mt-1 text-neutral-600">*/}
                {/*      Start your year with new skills*/}
                {/*    </p>*/}
                {/*  </div>*/}
                {/*</div>*/}
                <CourseCarousel
                  roadmaps={exploreData.betterYouCourses}
                  title="Better You 2025"
                  subTitle="Curated paths for self-improvement"
                />
              </section>
            )}

          {/* Browse by Category */}
          {exploreData.categories && exploreData.categories.length > 0 && (
            <div className="py-8 md:py-12">
              <CategoryCarousel
                title="Browse by Category"
                categories={exploreData.categories}
              />
            </div>
          )}
        </div>
      </div>
      <DashboardFooter />
    </>
  );
};

export default ExploreViewPage;
