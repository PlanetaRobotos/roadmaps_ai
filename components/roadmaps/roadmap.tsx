// // src/components/Roadmap.tsx
//
// import React from 'react';
// import {
//   Roadmap as RoadmapType,
//   Lesson,
//   Quiz,
//   RoadmapCard
// } from '@/types/roadmap-types';
// import TimelineCard from './timeline-card';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, A11y, EffectCoverflow } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/effect-coverflow';
// import LessonCard from '@/components/roadmaps/lesson-card';
// import QuizCard from '@/components/roadmaps/quiz-card';
// import HeroCard from '@/components/roadmaps/hero-card';
//
// interface RoadmapProps {
//   roadmap: RoadmapCard[];
// }
//
// export default function Roadmap({ roadmap }: RoadmapProps) {
//   // Flatten all items with their respective module IDs for easier mapping
//   const timelineItems = roadmap.modules
//     .sort((a, b) => a.order - b.order)
//     .flatMap((module) =>
//       module.lessons.map((lesson) => ({
//         ...lesson,
//         moduleId: module.id
//       }))
//     );
//
//   return (
//     <Swiper
//       modules={[Navigation, Pagination, A11y]}
//       spaceBetween={20}
//       slidesPerView={1}
//       navigation
//       pagination={{ clickable: true }}
//       className="w-full"
//     >
//       {roadmapItems.map((item) => (
//         <SwiperSlide key={item.id}>
//           {item.type === 'hero' && <HeroCard hero={item} />}
//           {item.type === 'lesson' && <LessonCard lesson={item} />}
//           {item.type === 'quiz' && <QuizCard quiz={item} />}
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// }
