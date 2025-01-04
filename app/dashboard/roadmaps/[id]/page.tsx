import React from 'react';
import RoadmapViewPage from '@/app/dashboard/roadmaps/[id]/_components/roadmap-page-view';
import { Metadata, ResolvingMetadata } from 'next';
import { API_BASE_URL, CLIENT_URL } from '@/config/apiConfig';
import { RoadmapsClient } from '@/app/api/client';
import { company } from '@/constants/data';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const roadmapId = params.id;

  const course = await fetch(`${API_BASE_URL}/v1/roadmaps/${roadmapId}`).then(
    (res) => res.json()
  );

  if (!course) {
    return {
      title: `Course Not Found | ${company.name}`,
      description: 'The course you are looking for does not exist.',
      openGraph: {
        title: `Course Not Found | ${company.name}`,
        description: 'The course you are looking for does not exist.',
        url: `${CLIENT_URL}/courses/${roadmapId}`,
        type: 'website',
        images: [
          {
            url: `/images/course-not-found-og.jpg`,
            width: 1200,
            height: 630,
            alt: 'Course Not Found'
          }
        ]
      },
      twitter: {
        card: 'summary_large_image',
        title: `Course Not Found | ${company.name}`,
        description: 'The course you are looking for does not exist.',
        images: [`/images/course-not-found-og.jpg`]
      }
    };
  }

  return {
    title: `${course.title} | ${company.name}`,
    description: course.description,
    openGraph: {
      title: `${course.title} | ${company.name}`,
      description: course.description,
      url: `${CLIENT_URL}/courses/${course.title}`,
      type: 'article',
      images: [
        {
          url: `/images/default-course-og.png`,
          width: 1200,
          height: 630,
          alt: course.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${course.title} | ${company.name}`,
      description: course.description,
      images: [`/images/default-course-og.png`]
    }
  };
}

export default function Page({ params }: Props) {
  return (
    <div className="h-full p-2 md:px-4">
      <RoadmapViewPage roadmapId={params.id} />
    </div>
  );
}
