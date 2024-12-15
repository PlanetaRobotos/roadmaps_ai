import { ClientRoadmap, RoadmapCard } from '@/types/roadmap-types';
import { RoadmapModel } from '@/app/api/client';
import { log } from 'node:util';

export const transformRoadmapToItems = (
  roadmap: RoadmapModel
): ClientRoadmap => {
  const items: RoadmapCard[] = [];

  console.log('Transforming roadmap:', roadmap);

  items.push({
    type: 'hero',
    title: `Welcome to "${roadmap.title}"`,
    contentTop: roadmap.description
  });

  try {
    roadmap
      .modules!.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .forEach((module) => {
        console.log('Processing Module:', module);
        console.log('Processing Lesson:', module?.lessons);

        module
          .lessons!.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          .forEach((lesson) => {
            try {
              console.log('Processing Lesson:', lesson);

              items.push({
                roadmapId: roadmap.id!,
                type: 'lesson',
                title: lesson.title!,
                description: lesson.description!,
                content: lesson.content?.mainContent || '',
                completed: lesson.completed!
              });

              console.log('Lesson added:', lesson.title);
            } catch (lessonError) {
              console.error(
                `Error processing lesson "${lesson.title}":`,
                lessonError
              );
            }
          });
      });
  } catch (error) {
    console.error('Unexpected error in transformRoadmapToItems:', error);
  }

  //TODO Add Quizzes if any
  // if (
  //   lesson.content?.quizzes &&
  //   lesson.content.quizzes.length > 0
  // ) {
  //   lesson.content.quizzes.forEach((quiz) => {
  //     items.push({
  //       id: quiz.id,
  //       type: 'quiz',
  //       question: quiz.question,
  //       options: quiz.options,
  //       correctAnswers: quiz.correctAnswers
  //     });
  //   });
  // }

  console.log('Items:', items);

  // Optional: Add an Outro Hero Card
  items.push({
    type: 'hero',
    title: `Congratulations on Completing "${roadmap.title}"!`,
    contentBottom: "You've successfully navigated through the roadmap."
  });

  console.log('Items end:', items);

  return {
    id: roadmap.id!,
    cards: items
  };
};
