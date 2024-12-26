// /app/api/suggestions/route.ts

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query')?.toLowerCase() || '';

  const allSuggestions = [
    'Introduction to Meditation Techniques',
    'Basics of HTML and CSS',
    'Quick Guide to Time Management',
    'Fundamentals of Python Programming',
    'Learn to Make a Simple App',
    'Beginner’s Guide to Photography',
    'Introduction to Digital Marketing',
    'Basics of Graphic Design',
    'Quick Excel Tips and Tricks',
    'Introduction to Public Speaking',
    'Fundamentals of Financial Literacy',
    'Learn to Play Guitar Basics',
    'Introduction to Mindfulness',
    'Basics of Project Management',
    'Quick Guide to Yoga',
    'Fundamentals of SEO',
    'Introduction to Data Analysis',
    'Basics of Social Media Marketing',
    'Quick Guide to Drawing',
    'Introduction to Machine Learning',
    'Basics of Email Marketing',
    'Learn to Cook Basic Meals',
    'Introduction to Cryptocurrency',
    'Basics of Video Editing',
    'Quick Guide to Blogging',
    'Fundamentals of Web Development',
    'Introduction to Graphic Design Tools',
    'Basics of Content Creation',
    'Quick Guide to Freelancing',
    'Introduction to E-commerce',
    'Basics of Python Data Science',
    'Learn to Create Presentations',
    'Introduction to Cloud Computing',
    'Basics of Mobile App Development',
    'Quick Guide to Networking',
    'Fundamentals of UX Design',
    'Introduction to Virtual Reality',
    'Basics of Digital Illustration',
    'Learn to Write Effective Emails',
    'Introduction to Blockchain',
    'Basics of Resume Writing',
    'Quick Guide to Public Relations',
    'Fundamentals of Artificial Intelligence',
    'Introduction to Stock Trading',
    'Basics of Responsive Design',
    'Learn to Build a Portfolio',
    'Introduction to Quantum Computing',
    'Basics of Podcasting',
    'Quick Guide to Mind Mapping',
    'Fundamentals of Agile Methodology'
  ];

  const filtered = allSuggestions.filter((item) =>
    item.toLowerCase().includes(query)
  );

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 110));

  return NextResponse.json({ suggestions: filtered });
}
