import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import Lesson from './Lesson';

interface ModuleProps {
  module: {
    id: string;
    title: string;
    order: number;
    lessons: {
      id: string;
      title: string;
      order: number;
      completed: boolean;
    }[];
  };
  roadmapId: string;
  onLessonToggle: (lessonId: string, completed: boolean) => void;
}

export default function Module({
  module,
  roadmapId,
  onLessonToggle
}: ModuleProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate progress as a percentage
  const completedLessons = module.lessons.filter(
    (lesson) => lesson.completed
  ).length;
  const totalLessons = module.lessons.length;
  const progress =
    totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <div className="rounded-lg border p-4">
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        role="button"
        tabIndex={0}
      >
        <h2 className="text-lg font-semibold">{module.title}</h2>
        <p>{module.order}</p>
        <span>{progress.toFixed(0)}% Complete</span>
      </div>
      <Progress value={progress} className="my-2" />
      {isExpanded && (
        <ul className="space-y-2">
          {module.lessons
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((lesson) => (
              <Lesson
                key={lesson.id}
                lesson={lesson}
                roadmapId={roadmapId}
                onToggle={(completed) => onLessonToggle(lesson.id, completed)}
              />
            ))}
        </ul>
      )}
    </div>
  );
}
