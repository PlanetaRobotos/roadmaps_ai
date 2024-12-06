import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

interface LessonProps {
  lesson: {
    id: string;
    title: string;
    order: number;
    completed: boolean;
  };
  onToggle: (completed: boolean) => void;
}

export default function Lesson({ lesson, onToggle }: LessonProps) {
  return (
    <li className="flex items-center space-x-2">
      <Checkbox
        checked={lesson.completed}
        onCheckedChange={(checked) => onToggle(!!checked)} // Ensure boolean value
        aria-label={`Mark lesson as ${
          lesson.completed ? 'incomplete' : 'complete'
        }`}
      />
      <span
        className={`${
          lesson.completed ? 'text-gray-500 line-through' : ''
        } text-sm`}
      >
        {lesson.title}
      </span>
      <p>{lesson.order}</p>
    </li>
  );
}
