import { ClientRoadmap, RoadmapCard } from '@/types/roadmap-types';
import HeroCard from '@/components/roadmaps/hero-card';
import LessonCard from '@/components/roadmaps/lesson-card';
import QuizCard from '@/components/roadmaps/quiz-card';
import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

interface RoadmapViewProps {
  roadmapItems: ClientRoadmap;
}

const RoadmapView: React.FC<RoadmapViewProps> = ({ roadmapItems }) => {
  return (
    <Carousel className="mx-auto h-full w-full">
      <CarouselContent className="h-full">
        {roadmapItems.cards
          // .filter((card) => card.type === 'quiz')
          // .flatMap((card) => [card, card]) // Double the lesson cards
          .map((card, index) => (
            // console.log('card', index),
            <CarouselItem key={index}>
              <div className="fixed h-full w-[94%]">
                {card.type === 'hero' && <HeroCard hero={card} />}
                {card.type === 'lesson' && <LessonCard lesson={card} />}
                {card.type === 'quiz' && <QuizCard quiz={card} />}
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
      {/*<CarouselPrevious className="hidden md:block"/>*/}
      {/*<CarouselNext className="hidden md:block" />*/}
    </Carousel>
  );
};

export default RoadmapView;
