import { ClientRoadmap, RoadmapCard } from '@/types/roadmap-types';
import { RoadmapModel } from '@/app/api/client';
import { getImageUrl } from '@/lib/utils';

export const transformRoadmapToItems = (
  roadmap: RoadmapModel
): ClientRoadmap => {
  const items: RoadmapCard[] = [];

  let thumbnailUrl: string | undefined;
  if (roadmap.thumbnailUrl) {
    thumbnailUrl = getImageUrl(roadmap.thumbnailUrl);
  } else {
    const randomIndex = Math.floor(Math.random() * 11) + 1;
    thumbnailUrl = `/images/roadmaps/roadmap-thumbnail-${randomIndex}.png`;
  }

  items.push({
    id: roadmap.id!,
    type: 'thumbnail',
    title: `${roadmap.title}`,
    thumbnail: thumbnailUrl
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
                completed: lesson.completed!,
                resources: lesson.content?.resources || []
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
    contentBottom: "You've successfully navigated through the course."
  });

  console.log('Items end:', items);

  return {
    id: roadmap.id!,
    authorId: roadmap.authorId!,
    title: roadmap.title!,
    duration: roadmap.estimatedDuration!,
    description: roadmap.description!,
    thumbnail: thumbnailUrl,
    cards: items
  };
};
