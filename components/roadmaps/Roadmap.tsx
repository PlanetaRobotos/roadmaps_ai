import React from 'react';
import Module from './Module';

export interface RoadmapProps {
  roadmap: {
    id: string;
    title: string;
    modules: {
      id: string;
      title: string;
      order: number;
      lessons: {
        id: string;
        title: string;
        order: number;
        completed: boolean;
      }[];
    }[];
  };
  onLessonToggle: (
    roadmapId: string,
    moduleId: string,
    lessonId: string,
    completed: boolean
  ) => void;
}

export function Roadmap({ roadmap, onLessonToggle }: RoadmapProps) {
  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold">{roadmap.title}</h1>
      <div className="space-y-6">
        {roadmap.modules
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((module) => (
            <Module
              key={module.id}
              module={module}
              roadmapId={roadmap.id}
              onLessonToggle={(lessonId, completed) =>
                onLessonToggle(roadmap.id, module.id, lessonId, completed)
              }
            />
          ))}
      </div>
    </div>
  );
}
