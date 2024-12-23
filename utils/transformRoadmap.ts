import { ClientRoadmap, RoadmapCard } from '@/types/roadmap-types';
import { RoadmapModel } from '@/app/api/client';

export const transformRoadmapToItems = (
  roadmap: RoadmapModel
): ClientRoadmap => {
  const items: RoadmapCard[] = [];

  items.push({
    id: roadmap.id!,
    type: 'hero',
    title: `${roadmap.title}`,
    contentBottom: roadmap.description
  });

  try {
    roadmap
      .modules!.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .forEach((module) => {
        console.log('Module:', module);
        module
          .lessons!.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          .forEach((lesson) => {
            try {
              items.push({
                id: lesson.id!,
                roadmapId: roadmap.id!,
                type: 'lesson',
                title: lesson.title!,
                description: lesson.description!,
                content: lesson.content?.mainContent || '',
                completed: lesson.completed!
              });

              if (lesson.quizzes && lesson.quizzes.length > 0) {
                lesson.quizzes.forEach((quiz) => {
                  items.push({
                    id: quiz.id!,
                    type: 'quiz',
                    question: quiz.question!,
                    options: quiz.answers!,
                    correctAnswer: quiz.correctAnswerIndex!
                  });
                });
              }
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

  console.log('Items:', items);

  // Optional: Add an Outro Hero Card
  items.push({
    id: 'outro',
    type: 'hero',
    title: `Congratulations on Completing "${roadmap.title}"!`,
    contentBottom: "You've successfully navigated through the roadmap."
  });

  console.log('Items end:', items);

  return {
    id: roadmap.id!,
    title: roadmap.title!,
    duration: roadmap.estimatedDuration!,
    description: roadmap.description!,
    cards: items
  };
};
