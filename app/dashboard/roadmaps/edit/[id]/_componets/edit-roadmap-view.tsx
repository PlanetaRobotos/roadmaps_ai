'use client';

import React, { useEffect, useState } from 'react';
import { ClientRoadmap } from '@/types/roadmap-types';
import { getRoadmapById, getUserQuizzes } from '@/services/roadmapsService';
import { transformRoadmapToItems } from '@/utils/transformRoadmap';
import RoadmapView from '@/components/roadmaps/roadmap-view';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface EditRoadmapViewProps {
  roadmapId: string;
  userId: number;
}

export default function EditRoadmapView({
  roadmapId,
  userId
}: EditRoadmapViewProps) {
  const [roadmap, setRoadmap] = useState<ClientRoadmap>();
  const [loading, setLoading] = useState(true);

  const saveRoadmap = () => {
    // Implement your save logic here
    alert('Roadmap saved successfully!');
  };

  const shareRoadmap = () => {
    // Implement your share logic here (e.g., copy to clipboard, share via social media)
    alert('Roadmap shared successfully!');
  };

  const reset = () => {
    // Implement your reset logic here
    alert('Resetting roadmap...');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRoadmapById(roadmapId);
        const cards = transformRoadmapToItems(data);

        console.log('userId:', userId);
        if (userId) {
          const userQuizzes = await getUserQuizzes(userId);
          console.log('User quizzes:', userQuizzes);
        }

        setRoadmap(cards);
      } catch (error) {
        console.error('Failed to fetch lesson or additional data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [roadmapId, userId]);

  if (loading) return <div>Loading...</div>;
  if (!roadmap) return <div>Course not found. {roadmapId}</div>;

  // return <RoadmapView roadmapItems={roadmap} />;

  return (
    <div className="mx-auto flex h-[85vh] max-h-[700px] w-[95vw] max-w-xl flex-col space-y-5">
      <h3 className="mr-2 text-center text-xl font-semibold">Edit Roadmap</h3>
      <div className="relative w-full flex-1">
        <RoadmapView roadmapItems={roadmap} />
      </div>
      <div className="w-full">
        <div className="flex justify-center space-x-4">
          <Button
            type="button"
            variant="secondary"
            onClick={saveRoadmap}
            className="w-1/3 px-6 py-3"
          >
            Copy Link
          </Button>
          <Button
            type="button"
            variant="default"
            onClick={shareRoadmap}
            className="w-1/3 px-6 py-3"
          >
            Share
          </Button>
        </div>
      </div>
      {/*<div className="mt-4 flex justify-center">*/}
      {/*  <Button*/}
      {/*    type="button"*/}
      {/*    variant="secondary"*/}
      {/*    onClick={() => {*/}
      {/*      reset();*/}
      {/*    }}*/}
      {/*    className="px-6 py-3"*/}
      {/*  >*/}
      {/*    Create Another Roadmap*/}
      {/*  </Button>*/}
      {/*</div>*/}
    </div>
  );
}
