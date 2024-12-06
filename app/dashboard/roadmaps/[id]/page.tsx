'use client';

import PageContainer from '@/components/layout/page-container';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { RoadmapProps, Roadmap } from '@/components/roadmaps/Roadmap';
import { getRoadmapById, updateLessonStatus } from '@/services/roadmapsService';

interface RoadmapPageProps {
  params: {
    id: string;
  };
}

export default function RoadmapPage({ params }: RoadmapPageProps) {
  const [roadmap, setRoadmap] = useState<RoadmapProps['roadmap'] | null>(null);
  const [updatingLesson, setUpdatingLesson] = useState(false);

  useEffect(() => {
    async function fetchRoadmap() {
      try {
        const apiData = await getRoadmapById(params.id);

        // Transform API data to RoadmapProps structure
        const transformedRoadmap: RoadmapProps['roadmap'] = {
          id: apiData.id!,
          title: apiData.title!,
          modules: apiData.modules!.map((module) => ({
            id: module.id!,
            title: module.title!,
            order: module.order!,
            lessons: module.lessons!.map((lesson) => ({
              id: lesson.id!,
              title: lesson.title!,
              order: lesson.order!,
              completed: lesson.completed!
            }))
          }))
        };

        setRoadmap(transformedRoadmap);
      } catch (error) {
        console.error('Failed to fetch roadmap:', error);
      }
    }

    fetchRoadmap();
  }, [params.id]);

  const handleLessonToggle = async (
    roadmapId: string,
    moduleId: string,
    lessonId: string,
    completed: boolean
  ) => {
    setUpdatingLesson(true);
    try {
      console.log(
        'Updating lesson status:',
        roadmapId,
        moduleId,
        lessonId,
        completed
      );

      await updateLessonStatus(roadmapId, lessonId, completed);

      // Update the local state after toggling
      setRoadmap((prev) =>
        prev
          ? {
              ...prev,
              modules: prev.modules.map((module) =>
                module.id === moduleId
                  ? {
                      ...module,
                      lessons: module.lessons.map((lesson) =>
                        lesson.id === lessonId
                          ? { ...lesson, completed }
                          : lesson
                      )
                    }
                  : module
              )
            }
          : null
      );
    } catch (error) {
      console.error('Failed to update lesson status:', error);
    } finally {
      setUpdatingLesson(false);
    }
  };

  return (
    <PageContainer scrollable>
      <div className="min-h-screen bg-gray-50 p-6">
        {roadmap ? (
          <Roadmap roadmap={roadmap} onLessonToggle={handleLessonToggle} />
        ) : (
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-6 w-full" />
          </div>
        )}
      </div>
    </PageContainer>
  );
}
