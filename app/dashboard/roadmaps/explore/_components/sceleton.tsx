import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const ExploreViewSkeleton = () => {
  return (
    <div className="min-h-screen bg-white pb-12">
      {/* Hero Section Skeleton */}
      <div className="bg-gradient-to-b from-neutral-100 to-white">
        <div className="container mx-auto max-w-6xl px-4 pt-8 md:px-8">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="mt-2 h-6 w-64" />
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="container mx-auto max-w-6xl px-4 md:px-8">
        {/* Categories Section Skeleton */}
        <div className="mt-12 space-y-6">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="mt-1 h-5 w-64" />
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="aspect-[4/3] rounded-2xl" />
            ))}
          </div>
        </div>

        {/* Course Sections Skeleton */}
        {[...Array(3)].map((_, sectionIndex) => (
          <div key={sectionIndex} className="mt-16 space-y-6">
            <div>
              <Skeleton className="h-8 w-48" />
              <Skeleton className="mt-1 h-5 w-64" />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-48 rounded-xl" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
