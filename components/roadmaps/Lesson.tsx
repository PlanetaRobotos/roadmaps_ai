import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

interface LessonProps {
  lesson: {
    id: string;
    title: string;
    order: number;
    completed: boolean;
  };
  roadmapId: string;
  onToggle: (completed: boolean) => void;
}

export default function Lesson({ lesson, roadmapId, onToggle }: LessonProps) {
  return (
    <li className="flex items-center space-x-2">
      <Checkbox
        checked={lesson.completed}
        onCheckedChange={(checked) => onToggle(!!checked)} // Ensure boolean value
        aria-label={`Mark lesson as ${
          lesson.completed ? 'incomplete' : 'complete'
        }`}
      />
      <Link
        href={`/dashboard/roadmaps/${roadmapId}/lessons/${lesson.id}`}
        className={`${
          lesson.completed ? 'text-gray-500 line-through' : ''
        } text-sm`}
      >
        {lesson.title}
      </Link>
      <p>{lesson.order}</p>
    </li>
  );
}
