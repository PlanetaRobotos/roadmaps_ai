'use client';

import React, { useEffect, useState } from 'react';
import LessonHeader from '@/components/lessons/lesson-header';
import LessonContent from '@/components/lessons/lesson-content';
import { getLessonById } from '@/services/roadmapsService';
import { LessonModel } from '@/app/api/client';

export default function LessonPage({
  params
}: {
  params: { lessonId: string };
}) {
  const [lesson, setLesson] = useState<LessonModel>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLesson() {
      try {
        const data = await getLessonById(params.lessonId);
        setLesson(data);
      } catch (error) {
        console.error('Failed to fetch lesson:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchLesson();
  }, [params.lessonId]);

  if (loading) return <div>Loading...</div>;
  if (!lesson) return <div>Lesson not found.</div>;

  return (
    <div className="lesson-page">
      <LessonHeader title={lesson.title!} description={lesson.description!} />
      <LessonContent
        mainContent={lesson.content?.mainContent}
        resources={lesson.content?.resources}
        examples={lesson.content?.examples}
        quizzes={lesson.content?.quizzes}
      />
    </div>
  );
}
