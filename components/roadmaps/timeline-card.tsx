// src/components/TimelineCard.tsx

import React from 'react';
import LessonCard from './lesson-card';
import QuizCard from './quiz-card';
import HeroCard from './hero-card';
import { motion } from 'framer-motion';
import { Lesson, Quiz } from '@/types/roadmap-types';

interface TimelineCardProps {
  item: Lesson | Quiz | Hero;
  moduleId: string;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ item, moduleId }) => {
  const variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <motion.div
      className="flex-shrink-0"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      variants={variants}
    >
      {item.type === 'lesson' ? (
        <LessonCard lesson={item} moduleId={moduleId} />
      ) : item.type === 'quiz' ? (
        <QuizCard quiz={item} moduleId={moduleId} />
      ) : item.type === 'hero' ? (
        <HeroCard hero={item} />
      ) : null}
    </motion.div>
  );
};

export default TimelineCard;
