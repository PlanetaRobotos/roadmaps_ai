// src/data/sampleRoadmap.ts

import { Roadmap } from '@/types/RoadmapTypes';

export const sampleRoadmap: Roadmap = {
  id: 'roadmap-1',
  title: 'Learn Full-Stack Development',
  modules: [
    {
      id: 'module-1',
      title: 'Frontend Basics',
      order: 1,
      items: [
        {
          id: 'hero-1',
          title: 'Welcome to Frontend Basics',
          type: 'hero',
          contentTop:
            'Get ready to dive into the world of frontend development!',
          contentBottom: 'Let’s start with the building blocks of the web.'
        },
        {
          id: 'lesson-1',
          title: 'Introduction to HTML',
          completed: false,
          type: 'lesson',
          content:
            'Learn the basics of HTML, including elements, tags, and structure.'
        },
        {
          id: 'quiz-1',
          question: 'Which tag is used to create a hyperlink in HTML?',
          options: ['<link>', '<a>', '<href>', '<hyper>'],
          correctAnswers: [1],
          type: 'quiz'
        }
      ]
    },
    {
      id: 'module-2',
      title: 'Backend Fundamentals',
      order: 2,
      items: [
        {
          id: 'hero-2',
          title: 'Welcome to Backend Fundamentals',
          type: 'hero',
          contentTop: 'Understand the server-side of applications.',
          contentBottom: 'Let’s explore how data is handled and stored.'
        },
        {
          id: 'lesson-2',
          title: 'Introduction to Node.js',
          completed: false,
          type: 'lesson',
          content: 'Understand the basics of Node.js and how it works.'
        },
        {
          id: 'quiz-2',
          question: 'What is the package manager for Node.js?',
          options: ['npm', 'pip', 'yarn', 'gem'],
          correctAnswers: [0, 2],
          type: 'quiz'
        }
      ]
    },
    {
      id: 'module-3',
      title: 'Conclusion',
      order: 3,
      items: [
        {
          id: 'hero-3',
          title: 'Congratulations!',
          type: 'hero',
          contentTop: 'You have completed the Full-Stack Development roadmap.',
          contentBottom:
            'Continue building your skills and creating amazing projects!'
        }
      ]
    }
  ]
};
