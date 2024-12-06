import React from 'react';

export default function LessonContent({ content }: { content: string }) {
  return (
    <div className="lesson-content">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
