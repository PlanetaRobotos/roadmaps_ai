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
    <Carousel className="mx-auto w-full max-w-[90vw]">
      <CarouselContent>
        {roadmapItems.cards.map((card, index) => (
          <CarouselItem key={index}>
            <div className="flex h-[80vh] w-full max-w-[90vw] items-center justify-center">
              {card.type === 'hero' && <HeroCard hero={card} />}
              {card.type === 'lesson' && <LessonCard lesson={card} />}
              {card.type === 'quiz' && <QuizCard quiz={card} />}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/*<CarouselPrevious />*/}
      {/*<CarouselNext />*/}
    </Carousel>
  );
};

export default RoadmapView;
