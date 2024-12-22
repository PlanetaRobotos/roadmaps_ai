import React from 'react';
import { LessonCard } from '@/types/roadmap-types';
import { useRoadmapStore } from '@/store/useRoadmapStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface LessonCardProps {
  lesson: LessonCard;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => {
  return (
    <div className="h-full rounded-xl bg-blue-100 p-1">
      <Card className="flex h-full w-full flex-col">
        <CardHeader className="p-5">
          <CardTitle className="w-full text-center">{lesson.title}</CardTitle>
        </CardHeader>
        <Separator className="h-1 bg-blue-100" />
        <ScrollArea className="w-full flex-1 overflow-auto">
          <CardContent className="flex flex-grow flex-col justify-between p-4">
            <div className="prose max-w-none p-2 leading-relaxed lg:prose-xl md:px-6">
              <div
                dangerouslySetInnerHTML={{ __html: lesson.content }}
                className="mt-4"
              ></div>
            </div>
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default LessonCard;
