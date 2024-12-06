import React from 'react';

export default function LessonHeader({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="lesson-header">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
}
