'use client';

import PageContainer from '@/components/layout/page-container';
import RoadmapsList from '@/app/dashboard/roadmaps/_components/roadmaps-list';
import React, { useState, useEffect } from 'react';
import { RoadmapModel } from '@/app/api/client';
import { getAllRoadmaps, updateQuizStatus } from '@/services/roadmapsService';
import { Icons } from '@/components/icons';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PagePadding from '@/components/containers/pagePadding';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import RoadmapCard from '@/app/dashboard/roadmaps/_components/roadmap-card';
import PlayListCarousel from '@/components/carousels/play-list-carousel';

function ExploreViewPage() {
  const [courses, setCourses] = useState<RoadmapModel[]>([]);
  const [loadingLibrary, setLoadingLibrary] = useState(true);

  useEffect(() => {
    getAllRoadmaps().then((result) => {
      setCourses(result.data ?? []);
      setLoadingLibrary(false);
    });
  }, []);

  return (
    <div className="space-y-10">
      {/*<div className="mt-20" />*/}
      <PlayListCarousel title="Playlist Title" roadmaps={courses} />
      <PlayListCarousel title="Playlist Title" roadmaps={courses} />
      <PlayListCarousel title="Playlist Title" roadmaps={courses} />
      <PlayListCarousel title="Playlist Title" roadmaps={courses} />
    </div>
  );
}

export default ExploreViewPage;
