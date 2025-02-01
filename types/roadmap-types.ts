// src/types/RoadmapTypes.ts

export interface ClientRoadmap {
  id: string;
  description: string;
  thumbnail: string;
  authorId: number;
  duration: number;
  title: string;
  cards: RoadmapCard[];
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export type RoadmapCard =
  | HeroCard
  | ThumbnailCard
  | LessonCard
  | QuizCard
  | LoginCard
  | OutroCard;

export interface OutroCard {
  id: string;
  type: 'outro';
  title: string;
}

export interface HeroCard {
  id: string;
  type: 'hero';
  title: string;
  contentTop?: string;
  contentBottom?: string;
}

export interface LoginCard {
  id: string;
  type: 'login';
  title: string;
  thumbnail: string;
}

export interface ThumbnailCard {
  id: string;
  type: 'thumbnail';
  title: string;
  thumbnail: string;
}

export interface LessonCard {
  id: string;
  roadmapId: string;
  type: 'lesson';
  title: string;
  description: string;
  content: string;
  resources: string[];
  completed: boolean;
}

export interface QuizCard {
  id: string;
  type: 'quiz';
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface CardState {
  primaryColor: string;
  isLoading: boolean;
  error: boolean;
}
