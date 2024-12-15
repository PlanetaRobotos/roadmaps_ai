import React from 'react';
import { LessonCard } from '@/types/roadmap-types';
import { useRoadmapStore } from '@/store/useRoadmapStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LessonCardProps {
  lesson: LessonCard;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => {
  /*  const toggleLessonCompletion = useRoadmapStore((state) => state.toggleLessonCompletion);
    const handleCheckboxChange = () => {
      toggleLessonCompletion(lesson.roadmapId, lesson.id, !lesson.completed); // Assuming moduleId is not needed here
    };*/

  return (
    <Card className="h-full w-full max-w-md rounded-lg bg-white shadow-lg">
      <CardHeader className="p-6">
        <CardTitle
          className={`text-xl font-semibold ${
            lesson.completed ? 'text-gray-500 line-through' : ''
          }`}
        >
          {lesson.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-gray-700">{lesson.description}</p>
        <div
          className="prose mt-4 max-w-none"
          dangerouslySetInnerHTML={{ __html: lesson.content }}
        ></div>
      </CardContent>
    </Card>
  );
};

export default LessonCard;
