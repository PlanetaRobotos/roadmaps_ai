import { NextResponse } from 'next/server';
import { DEFAULT_SUGGESTIONS_LIMIT } from '@/constants/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query')?.toLowerCase() || '';
  const category = searchParams.get('category')?.toLowerCase() || '';
  const limit = parseInt(
    searchParams.get('limit') || `${DEFAULT_SUGGESTIONS_LIMIT}`,
    10
  );

  const promptSuggestions = [
    { category: 'learnprogramming', text: 'Basics of Mobile App Development' },
    { category: 'learnprogramming', text: 'Fundamentals of HTML and CSS' },
    {
      category: 'learnprogramming',
      text: 'Introduction to Python Programming'
    },
    {
      category: 'learnprogramming',
      text: 'Understanding Data Structures and Algorithms'
    },
    { category: 'learnprogramming', text: 'Getting Started with React.js' },
    { category: 'learnprogramming', text: 'Mastering Git and Version Control' },
    {
      category: 'learnprogramming',
      text: 'Building RESTful APIs with Node.js'
    },

    {
      category: 'photography',
      text: 'Mastering Portrait Photography Techniques'
    },
    { category: 'photography', text: 'Introduction to Landscape Photography' },
    {
      category: 'photography',
      text: 'Advanced Photo Editing with Adobe Lightroom'
    },
    {
      category: 'photography',
      text: 'Understanding Lighting for Studio Photography'
    },
    {
      category: 'photography',
      text: 'Creative Composition in Street Photography'
    },
    {
      category: 'photography',
      text: 'Macro Photography: Capturing the Details'
    },
    { category: 'photography', text: 'Night Photography: Techniques and Tips' },

    {
      category: 'selfimprovement',
      text: 'Boosting Productivity with Time Management Strategies'
    },
    {
      category: 'selfimprovement',
      text: 'Developing a Growth Mindset for Personal Success'
    },
    {
      category: 'selfimprovement',
      text: 'Mindfulness and Meditation for Everyday Life'
    },
    {
      category: 'selfimprovement',
      text: 'Effective Goal Setting and Achievement'
    },
    {
      category: 'selfimprovement',
      text: 'Overcoming Procrastination: Practical Techniques'
    },
    { category: 'selfimprovement', text: 'Enhancing Emotional Intelligence' },
    {
      category: 'selfimprovement',
      text: 'Building Resilience and Managing Stress'
    },

    { category: 'digitalmarketing', text: 'Mastering SEO Fundamentals' },
    {
      category: 'digitalmarketing',
      text: 'Effective Social Media Marketing Strategies'
    },
    {
      category: 'digitalmarketing',
      text: 'Content Marketing: Creating Engaging Content'
    },
    {
      category: 'digitalmarketing',
      text: 'PPC Advertising: Basics and Best Practices'
    },
    {
      category: 'digitalmarketing',
      text: 'Email Marketing Campaigns that Convert'
    },
    {
      category: 'digitalmarketing',
      text: 'Influencer Marketing: Leveraging Influencers for Growth'
    },
    {
      category: 'digitalmarketing',
      text: 'Analytics and Data-Driven Marketing Decisions'
    },

    { category: 'cooking', text: 'Cooking Gourmet Meals at Home' },
    { category: 'cooking', text: 'Baking Perfect Cakes: Techniques and Tips' },
    { category: 'cooking', text: 'Mastering Italian Cuisine Basics' },
    {
      category: 'cooking',
      text: 'Vegan Cooking: Delicious Plant-Based Recipes'
    },
    { category: 'cooking', text: 'Quick and Easy Weeknight Dinners' },
    {
      category: 'cooking',
      text: 'Advanced Culinary Techniques for Home Chefs'
    },
    { category: 'cooking', text: 'Healthy Meal Prep for Busy Individuals' },

    { category: 'fitness', text: 'Transforming Your Workout Routine' },
    {
      category: 'fitness',
      text: 'High-Intensity Interval Training (HIIT) Basics'
    },
    { category: 'fitness', text: 'Yoga for Flexibility and Strength' },
    { category: 'fitness', text: 'Strength Training for Beginners' },
    {
      category: 'fitness',
      text: 'Cardio Kickstart: Effective Cardiovascular Workouts'
    },
    { category: 'fitness', text: 'Pilates for Core Strength and Stability' },
    {
      category: 'fitness',
      text: 'Nutrition Fundamentals for Fitness Enthusiasts'
    },

    {
      category: 'graphic_design',
      text: 'Enhancing Design Skills with Adobe Photoshop'
    },
    {
      category: 'graphic_design',
      text: 'Introduction to UI/UX Design Principles'
    },
    {
      category: 'graphic_design',
      text: 'Mastering Typography for Effective Communication'
    },
    {
      category: 'graphic_design',
      text: 'Creating Stunning Logos: From Concept to Creation'
    },
    {
      category: 'graphic_design',
      text: 'Branding Strategies for Graphic Designers'
    },
    {
      category: 'graphic_design',
      text: 'Advanced Techniques in Adobe Illustrator'
    },
    {
      category: 'graphic_design',
      text: 'Designing for Web: Best Practices and Tools'
    },

    { category: 'entrepreneur', text: 'Kickstarting Your Startup Journey' },
    { category: 'entrepreneur', text: 'Lean Startup Methodology Explained' },
    {
      category: 'entrepreneur',
      text: 'Effective Business Planning for New Ventures'
    },
    {
      category: 'entrepreneur',
      text: 'Fundraising Strategies for Entrepreneurs'
    },
    {
      category: 'entrepreneur',
      text: 'Leadership Skills for Startup Founders'
    },
    {
      category: 'entrepreneur',
      text: 'Marketing Tactics for Early-Stage Startups'
    },
    {
      category: 'entrepreneur',
      text: 'Scaling Your Business: From Startup to Success'
    },

    {
      category: 'musictheory',
      text: 'Understanding Music Theory Fundamentals'
    },
    { category: 'musictheory', text: 'Advanced Harmony Concepts Explained' },
    {
      category: 'musictheory',
      text: 'Introduction to Counterpoint Techniques'
    },
    { category: 'musictheory', text: 'Mastering Scales and Modes in Music' },
    {
      category: 'musictheory',
      text: 'Rhythm and Meter: The Backbone of Music'
    },
    {
      category: 'musictheory',
      text: 'Compositional Techniques for Modern Musicians'
    },
    {
      category: 'musictheory',
      text: 'Arranging Music: From Ideas to Final Composition'
    },

    { category: 'education', text: 'Revolutionizing Learning Experiences' },
    {
      category: 'education',
      text: 'Effective Teaching Strategies for Educators'
    },
    {
      category: 'education',
      text: 'Curriculum Development: Designing Comprehensive Programs'
    },
    {
      category: 'education',
      text: 'Classroom Management Techniques for Teachers'
    },
    {
      category: 'education',
      text: 'Leveraging Technology in Modern Education'
    },
    { category: 'education', text: 'Online Teaching Best Practices' },
    { category: 'education', text: 'Assessing Student Performance Effectively' }
  ];

  // Filter by category if provided
  let filteredSuggestions = promptSuggestions;
  if (category) {
    filteredSuggestions = filteredSuggestions.filter(
      (item) => item.category === category
    );
  }

  // Further filter by query if provided
  if (query) {
    filteredSuggestions = filteredSuggestions.filter((item) =>
      item.text.toLowerCase().includes(query)
    );
  }

  // If no query but category is provided, limit to first 5 suggestions
  if (!query && category) {
    filteredSuggestions = filteredSuggestions.slice(0, limit);
  }

  // Extract only the text for the response
  const suggestions = filteredSuggestions.map((item) => item.text);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 110));

  return NextResponse.json({ suggestions });
}
