// src/types/RoadmapTypes.ts

export interface ClientRoadmap {
  id: string;
  description: string;
  duration: number;
  title: string;
  cards: RoadmapCard[];
}

export interface LessonContent {
  mainContent: string;
  resources: string[];
  examples: string[];
  quizzes: Quiz[];
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export type RoadmapCard = HeroCard | LessonCard | QuizCard;

export interface HeroCard {
  id: string;
  type: 'hero';
  title: string;
  contentTop?: string;
  contentBottom?: string;
}

export interface LessonCard {
  id: string;
  roadmapId: string;
  type: 'lesson';
  title: string;
  description: string;
  content: string;
  completed: boolean;
}

export interface QuizCard {
  id: string;
  type: 'quiz';
  question: string;
  options: string[];
  correctAnswer: number;
}
