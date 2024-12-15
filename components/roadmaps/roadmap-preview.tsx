// src/components/RoadmapPreview.tsx

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

interface RoadmapPreviewProps {
  roadmapItems: ClientRoadmap;
}

const RoadmapPreview: React.FC<RoadmapPreviewProps> = ({ roadmapItems }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      className="w-full"
    >
      {roadmapItems.map((card, index) => (
        <SwiperSlide key={index}>
          {card.type === 'hero' && <HeroCard hero={card} />}
          {card.type === 'lesson' && <LessonCard lesson={card} />}
          {card.type === 'quiz' && <QuizCard quiz={card} />}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RoadmapPreview;
