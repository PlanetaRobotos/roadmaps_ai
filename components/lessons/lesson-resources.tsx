import React from 'react';

export default function LessonResources({
  resources
}: {
  resources: string[];
}) {
  return (
    <div className="lesson-resources">
      <h2 className="mt-4 text-xl font-semibold">Resources</h2>
      <ul>
        {resources.map((resource, index) => (
          <li key={index}>
            <a
              href={resource}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              {resource}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
