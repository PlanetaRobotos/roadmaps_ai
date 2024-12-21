'use client';

import React, { useEffect, useState } from 'react';
import { ClientRoadmap } from '@/types/roadmap-types';
import { getRoadmapById, getUserQuizzes } from '@/services/roadmapsService';
import { transformRoadmapToItems } from '@/utils/transformRoadmap';
import RoadmapView from '@/components/roadmaps/roadmap-view';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { roadmapTest } from '@/app/dashboard/roadmaps/edit/[id]/roadmapTest';

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

  return <RoadmapView roadmapItems={roadmap} />;

  // return (
  //   <motion.div
  //     className=""
  //     initial={{ opacity: 0, y: 50 }}
  //     animate={{ opacity: 1, y: 0 }}
  //     exit={{ opacity: 0, y: -50 }}
  //     transition={{ duration: 0.5 }}
  //   >
  //     <h3 className="text-center text-xl font-semibold">Edit Roadmap</h3>
  //     <RoadmapView roadmapItems={roadmap} />
  //     <div className="flex justify-center space-x-4">
  //       <Button
  //         type="button"
  //         variant="default"
  //         onClick={saveRoadmap}
  //         className="px-6 py-3"
  //       >
  //         Save
  //       </Button>
  //       <Button
  //         type="button"
  //         variant="secondary"
  //         onClick={shareRoadmap}
  //         className="px-6 py-3"
  //       >
  //         Share
  //       </Button>
  //     </div>
  //     <div className="mt-4 flex justify-center">
  //       <Button
  //         type="button"
  //         variant="secondary"
  //         onClick={() => {
  //           reset();
  //         }}
  //         className="px-6 py-3"
  //       >
  //         Create Another Roadmap
  //       </Button>
  //     </div>
  //   </motion.div>
  // );
}
