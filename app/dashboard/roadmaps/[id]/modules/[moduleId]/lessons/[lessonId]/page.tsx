'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getLessonById } from '@/lib/api'; // Function to fetch lesson data
import LessonHeader from '@/components/lessons/lesson-header';
import LessonContent from '@/components/lessons/lesson-content';
import LessonResources from '@/components/lessons/lesson-resources';
import LessonNavigation from '@/components/lessons/lesson-navigation';

export default function LessonPage({
  params
}: {
  params: { lessonId: string };
}) {
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchLesson() {
      try {
        const data = await getLessonById(params.lessonId);
        setLesson(data);
      } catch (error) {
        console.error('Failed to fetch lesson:', error);
        router.push('/404');
      } finally {
        setLoading(false);
      }
    }
    fetchLesson();
  }, [params.lessonId, router]);

  if (loading) return <div>Loading...</div>;
  if (!lesson) return <div>Lesson not found.</div>;

  return (
    <div className="lesson-page">
      <LessonHeader title={lesson.title} description={lesson.description} />
      <LessonContent content={lesson.content} />
      <LessonResources resources={lesson.resources} />
      <LessonNavigation />
    </div>
  );
}
