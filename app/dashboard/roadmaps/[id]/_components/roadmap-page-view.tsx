'use client';

import React, { useEffect, useState } from 'react';
import { RoadmapModel } from '@/app/api/client';
import { getRoadmapById } from '@/services/roadmapsService';
import { transformRoadmapToItems } from '@/utils/transformRoadmap';
import RoadmapView from '@/components/roadmaps/roadmap-view';
import { ClientRoadmap } from '@/types/roadmap-types';

interface RoadmapViewPageProps {
  roadmapId: string;
}

export default function RoadmapViewPage({ roadmapId }: RoadmapViewPageProps) {
  const [roadmap, setRoadmap] = useState<ClientRoadmap>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLesson() {
      try {
        const data = await getRoadmapById(roadmapId);
        const cards = transformRoadmapToItems(data);
        setRoadmap(cards);
      } catch (error) {
        console.error('Failed to fetch lesson:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchLesson();
  }, [roadmapId]);

  if (loading) return <div>Loading...</div>;
  if (!roadmap) return <div>Course not found. {roadmapId}</div>;

  return (
    <div className="container mx-auto px-4">
      <RoadmapView roadmapItems={roadmap} />
    </div>
  );
}
