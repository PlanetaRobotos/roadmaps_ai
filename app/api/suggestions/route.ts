// /app/api/suggestions/route.ts

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query')?.toLowerCase() || '';

  // Mock data - replace this with your actual data source or database
  const allSuggestions = [
    'Create New Roadmap',
    'Edit Roadmap',
    'Delete Roadmap',
    'View Roadmaps',
    'Manage Categories',
    'Assign Mentors',
    'Publish Roadmap',
    'Unpublish Roadmap'
  ];

  // Filter suggestions based on the query
  const filtered = allSuggestions.filter((item) =>
    item.toLowerCase().includes(query)
  );

  // Simulate network delay (optional)
  await new Promise((resolve) => setTimeout(resolve, 300));

  return NextResponse.json({ suggestions: filtered });
}
