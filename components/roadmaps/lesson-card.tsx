import React from 'react';
import { LessonCard } from '@/types/roadmap-types';
import { useRoadmapStore } from '@/store/useRoadmapStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LessonCardProps {
  lesson: LessonCard;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => {
  return (
    <Card className="flex h-full w-full flex-col rounded-lg border bg-white shadow-lg">
      <CardHeader className="border-b bg-gray-50 p-4">
        <CardTitle className="truncate text-center text-2xl font-bold text-gray-800">
          {lesson.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col justify-between p-4">
        <ScrollArea className="h-full">
          <div className="prose prose-gray mt-2 h-[40vh] max-w-none p-2 leading-relaxed md:px-6">
            {/*<p>{lesson.description}</p>*/}
            <div
              dangerouslySetInnerHTML={{ __html: lesson.content }}
              className="mt-4"
            ></div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default LessonCard;
