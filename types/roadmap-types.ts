// src/types/RoadmapTypes.ts

export interface ClientRoadmap {
  id: string;
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
  correctAnswers: number[];
}

export type RoadmapCard = HeroCard | LessonCard | QuizCard;

export interface HeroCard {
  type: 'hero';
  title: string;
  contentTop?: string;
  contentBottom?: string;
}

export interface LessonCard {
  // id: string;
  roadmapId: string;
  type: 'lesson';
  title: string;
  description: string;
  content: string;
  completed: boolean;
}

export interface QuizCard {
  // id: string;
  type: 'quiz';
  question: string;
  options: string[];
  correctAnswers: number[];
}
