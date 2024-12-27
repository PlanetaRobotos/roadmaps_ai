import CreateRoadmapPage from '@/app/dashboard/roadmaps/create/_components/roadmap-create-page';
import { CLIENT_URL } from '@/config/apiConfig';

export const metadata = {
  title: 'Create Your Course | MyMicroCourses',
  description:
    'Design and publish your own micro-courses effortlessly with our AI-powered platform.',
  openGraph: {
    title: 'Create Your Course | MyMicroCourses',
    description:
      'Design and publish your own micro-courses effortlessly with our AI-powered platform.',
    url: `${CLIENT_URL}/dashboard/roadmaps/create`,
    type: 'website',
    images: [
      {
        url: `${CLIENT_URL}/images/default-course-og.png`,
        width: 1200,
        height: 630,
        alt: 'Create Your Course'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Create Your Course | MyMicroCourses',
    description:
      'Design and publish your own micro-courses effortlessly with our AI-powered platform.',
    images: [`${CLIENT_URL}/images/default-course-og.png`]
  }
};

export default async function Page() {
  return <CreateRoadmapPage />;
}
