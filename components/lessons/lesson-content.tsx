import React from 'react';

interface LessonContentProps {
  mainContent?: string;
  resources?: string[];
  examples?: string[];
  quizzes?: string[];
}

export default function LessonContent({
  mainContent,
  resources,
  examples,
  quizzes
}: LessonContentProps) {
  return (
    <div className="lesson-content">
      {mainContent && <div dangerouslySetInnerHTML={{ __html: mainContent }} />}
      {resources && resources.length > 0 && (
        <div>
          <h2>Resources</h2>
          <ul>
            {resources.map((resource, index) => (
              <li key={index}>{resource}</li>
            ))}
          </ul>
        </div>
      )}
      {examples && examples.length > 0 && (
        <div>
          <h2>Examples</h2>
          <ul>
            {examples.map((example, index) => (
              <li key={index}>{example}</li>
            ))}
          </ul>
        </div>
      )}
      {quizzes && quizzes.length > 0 && (
        <div>
          <h2>Quizzes</h2>
          <ul>
            {quizzes.map((quiz, index) => (
              <li key={index}>{quiz}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
