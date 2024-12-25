import React, { useContext, useEffect, useState } from 'react';
import { ClientRoadmap, RoadmapCard } from '@/types/roadmap-types';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import HeroCard from '@/components/roadmaps/hero-card';
import LessonCard from '@/components/roadmaps/lesson-card';
import QuizCard from '@/components/roadmaps/quiz-card';
import { AuthContext } from '@/context/auth-context';
import { getUserQuizzes, updateQuizStatus } from '@/services/roadmapsService';

interface RoadmapViewProps {
  roadmapItems: ClientRoadmap;
  onAuthorizeClick: () => void;
}

const RoadmapView: React.FC<RoadmapViewProps> = ({
  roadmapItems,
  onAuthorizeClick
}) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const { user } = useContext(AuthContext);
  const [userQuizAnswers, setUserQuizAnswers] = useState<
    Record<string, { selectedIndex: number }>
  >({});

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on('settle', () => {
      if (showSwipeHint) {
        setShowSwipeHint(false);
      }
    });
  }, [api]);

  useEffect(() => {
    if (!user) {
      return;
    }
    if (!roadmapItems?.cards?.length) return; // No quizzes => skip

    const fetchUserAnswers = async () => {
      try {
        const quizStatuses = await getUserQuizzes(user.id!);
        const map: Record<string, { selectedIndex: number }> = {};
        quizStatuses.forEach((st) => {
          map[st.quizId!] = { selectedIndex: st.answerIndex! };
        });

        setUserQuizAnswers(map);
      } catch (error) {
        console.error('Failed to fetch user quiz answers:', error);
      }
    };

    fetchUserAnswers();
  }, [user, roadmapItems]);

  return (
    <>
      <Carousel className="mx-auto h-full w-full" setApi={setApi}>
        <CarouselContent className="h-full">
          {roadmapItems.cards.map((card, index) => (
            <CarouselItem key={index}>
              <div className="fixed h-full w-[94%]">
                {card.type === 'hero' && <HeroCard hero={card} />}
                {card.type === 'lesson' && <LessonCard lesson={card} />}
                {card.type === 'quiz' && (
                  <QuizCard
                    quiz={card}
                    userId={user?.id}
                    // If we have a stored answer for this quiz, pass it as initialSelectedIndex
                    initialSelectedIndex={
                      userQuizAnswers[card.id]?.selectedIndex ?? null
                    }
                    updateQuizStatus={updateQuizStatus}
                    onAuthorizeClick={onAuthorizeClick}
                  />
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Arrows only for desktop */}
        <CarouselPrevious className="hidden md:block" />
        <CarouselNext className="hidden md:block" />
      </Carousel>

      {showSwipeHint && (
        <div className="mt-2 block w-full text-center">
          <div className="inline-flex animate-bounce items-center space-x-1 text-gray-500">
            {/* Left arrow icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="text-sm">Swipe</span>
            {/* Right arrow icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

export default RoadmapView;
