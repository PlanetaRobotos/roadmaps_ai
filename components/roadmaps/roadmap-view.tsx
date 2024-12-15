import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { ClientRoadmap, RoadmapCard } from '@/types/roadmap-types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import HeroCard from '@/components/roadmaps/hero-card';
import LessonCard from '@/components/roadmaps/lesson-card';
import QuizCard from '@/components/roadmaps/quiz-card';

interface RoadmapViewProps {
  roadmapItems: ClientRoadmap;
}

const RoadmapView: React.FC<RoadmapViewProps> = ({ roadmapItems }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      // className="w-full h-[var(--vh)] px-4 py-6"
    >
      {roadmapItems.cards.map((card, index) => (
        <SwiperSlide
          key={index}
          // className="flex items-center justify-center px-4 py-6"
        >
          {card.type === 'hero' && <HeroCard hero={card} />}
          {card.type === 'lesson' && <LessonCard lesson={card} />}
          {card.type === 'quiz' && <QuizCard quiz={card} />}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RoadmapView;
