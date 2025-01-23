'use client';

import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ClientRoadmap, CardState } from '@/types/roadmap-types';
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
import ThumbnailCard from '@/components/roadmaps/thumbnail-card';
import {
  extractColors,
  getRGBA,
  isLightColor,
  RGB,
  DEFAULT_COLORS
} from '@/utils/colors';
import { useEditStore } from '@/store/editStore';
import { EditingState } from '@/types/editState';
import { EmblaOptionsType } from 'embla-carousel';

interface RoadmapViewProps {
  roadmapItems: ClientRoadmap;
  isEditable: boolean;
  onAuthorizeClick?: () => void;
}

const RoadmapView: React.FC<RoadmapViewProps> = ({
  roadmapItems,
  isEditable,
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

  const editingState = useEditStore((state) => state.editingState);
  const isScrollLocked =
    editingState === EditingState.Editing ||
    editingState === EditingState.Saving;

  const [cardState, setCardState] = useState<{
    colors: RGB[];
    isLoading: boolean;
    error: boolean;
  }>({
    colors: [],
    isLoading: true,
    error: false
  });

  useEffect(() => {
    const loadColors = async () => {
      try {
        const extractedColors = await extractColors(roadmapItems.thumbnail);
        setCardState((prev) => ({
          ...prev,
          colors: extractedColors,
          isLoading: false
        }));
      } catch (error) {
        console.error('Failed to extract colors:', error);
        setCardState((prev) => ({
          ...prev,
          isLoading: false,
          error: true
        }));
      }
    };

    loadColors();
  }, [roadmapItems.thumbnail]);

  const handleSettle = useCallback(() => {
    if (showSwipeHint) {
      setShowSwipeHint(false);
    }
  }, [showSwipeHint]);

  const handleSelect = useCallback(() => {
    if (api) {
      setCurrent(api.selectedScrollSnap());
    }
  }, [api]);

  const handlePrevSlide = useCallback(() => {
    if (api && !isScrollLocked) {
      api.scrollPrev();
    }
  }, [api, isScrollLocked]);

  const handleNextSlide = useCallback(() => {
    if (api && !isScrollLocked) {
      api.scrollNext();
    }
  }, [api, isScrollLocked]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isScrollLocked) return;

      console.log('Key: scroll', event.key, isScrollLocked);

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          handlePrevSlide();
          break;
        case 'ArrowRight':
          event.preventDefault();
          handleNextSlide();
          break;
      }
    },
    [handlePrevSlide, handleNextSlide, isScrollLocked]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (!api) {
      return;
    }

    // const originalCanScrollPrev = api.canScrollPrev;
    // const originalCanScrollNext = api.canScrollNext;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    const originalScrollTo = api.scrollTo;
    api.scrollTo = (index: number, jump?: boolean) => {
      // Check if the scroll was triggered by keyboard
      if (window.event?.type === 'keydown') {
        return; // Prevent scrolling for keyboard events
      }
      // Otherwise proceed with normal scrolling
      originalScrollTo.call(api, index, jump);
    };

    if (isScrollLocked) {
      // api.canScrollPrev = () => false;
      // api.canScrollNext = () => false;

      console.log('Scroll is locked');
      api.off('settle', handleSettle);
      api.off('select', handleSelect);
      return () => {
        api.scrollTo = originalScrollTo;
        // api.canScrollPrev = originalCanScrollPrev;
        // api.canScrollNext = originalCanScrollNext;
      };
    }

    api.on('settle', () => {
      if (showSwipeHint) {
        setShowSwipeHint(false);
      }
    });

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });

    return () => {
      // api.canScrollPrev = originalCanScrollPrev;
      // api.canScrollNext = originalCanScrollNext;

      api.scrollTo = originalScrollTo;
      api.off('settle', handleSettle);
      api.off('select', handleSelect);
    };
  }, [api, handleSelect, handleSettle, isScrollLocked, showSwipeHint]);

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

  const { colors, isLoading, error } = cardState;
  const borderColor = colors.length
    ? {
        backgroundColor: getRGBA(colors[0], 0.95)
      }
    : {
        backgroundColor: 'rgba(0, 0, 0, 0.9)'
      };

  const carouselOptions: EmblaOptionsType = {
    watchDrag: !isScrollLocked
  };

  return (
    <>
      <Carousel
        opts={carouselOptions}
        className="mx-auto mb-4 h-full w-full"
        setApi={setApi}
        disableKeyboardNavigation={isScrollLocked}
      >
        <CarouselContent className="h-full select-none">
          {roadmapItems.cards
            // .filter((card) => card.type == 'lesson')
            .map((card, index) => (
              <CarouselItem key={index}>
                <div className="fixed h-full w-[94%]">
                  {card.type === 'thumbnail' && <ThumbnailCard props={card} />}
                  {card.type === 'hero' && <HeroCard hero={card} />}
                  {card.type === 'lesson' && (
                    <LessonCard
                      lesson={card}
                      isEditable={
                        user?.id === roadmapItems.authorId && isEditable
                      }
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
        {!isScrollLocked && (
          <>
            <CarouselPrevious className="md:block hidden" />
            <CarouselNext
              className={'md:block hidden'}
              iconClassName={showSwipeHint ? 'animate-ping' : ''}
            />
          </>
        )}
      </Carousel>
      <Progress
        value={count > 1 ? (current / (count - 1)) * 100 : 0}
        className="mx-auto flex w-5/6 max-w-2xl items-center"
      />
    </>
  );
};

export default RoadmapView;
