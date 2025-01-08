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
import { Progress } from '@/components/ui/progress';
import HeroCard from '@/components/roadmaps/hero-card';
import LessonCard from '@/components/roadmaps/lesson-card';
import QuizCard from '@/components/roadmaps/quiz-card';
import { AuthContext } from '@/context/auth-context';
import { getUserQuizzes, updateQuizStatus } from '@/services/roadmapsService';
import axios from '@/lib/axios';
import { SwipeTip } from '@/components/helper-icon';
import { cn } from '@/lib/utils';

interface RoadmapViewProps {
  roadmapItems: ClientRoadmap;
  onAuthorizeClick?: () => void;
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
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('settle', () => {
      if (showSwipeHint) {
        setShowSwipeHint(false);
      }
    });

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api, showSwipeHint]);

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
      <Carousel className="mx-auto mb-4 h-full w-full" setApi={setApi}>
        <CarouselContent className="h-full">
          {roadmapItems.cards
            // .filter((card) => card.type == 'lesson')
            .map((card, index) => (
              <CarouselItem key={index}>
                <div className="fixed h-full w-[94%]">
                  {card.type === 'hero' && <HeroCard hero={card} />}
                  {card.type === 'lesson' && (
                    <LessonCard
                      lesson={card}
                      onUpdate={async (id, newContent) => {
                        // Update lesson content
                        console.log('Updating lesson:', id, newContent);

                        // Validate content
                        if (newContent === '') return;

                        await axios.put(`/v1/roadmaps/${roadmapItems.id}`, {
                          lessonId: id,
                          lessonContent: newContent
                        });
                        const card = roadmapItems.cards.find(
                          (c) => c.id === id
                        ) as LessonCard;
                        card!.content = newContent;
                      }}
                    />
                  )}
                  {card.type === 'quiz' && (
                    <QuizCard
                      quiz={card}
                      userId={user?.id}
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
        <CarouselNext
          className={'hidden md:block'}
          iconClassName={showSwipeHint ? 'animate-ping' : ''}
        />
      </Carousel>

      {showSwipeHint && (
        <div className="absolute bottom-3 mx-auto block w-full -translate-x-8 transform text-center">
          <SwipeTip />
        </div>
      )}

      <Progress
        value={count > 1 ? (current / (count - 1)) * 100 : 0}
        className="mx-auto flex w-5/6 max-w-2xl items-center"
      />
    </>
  );
};

export default RoadmapView;
