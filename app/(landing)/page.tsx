import { LandingPageView } from '@/app/(landing)/_components/landing-view';
import { CLIENT_URL } from '@/config/apiConfig';

export const metadata = {
  title: 'Levenue MiniCourses',
  description: 'Levenue MiniCourses - Landing page',
  openGraph: {
    type: 'website',
    url: `${CLIENT_URL}`,
    title: 'Levenue MiniCourses',
    description: 'Free Shadcn landing page for developers',
    images: [
      {
        url: `/images/default-course-og.png`,
        width: 1200,
        height: 630,
        alt: 'Levenue MiniCourses'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: 'https://github.com/nobruf/shadcn-landing-page.git',
    title: 'Levenue MiniCourses',
    description:
      'Design and publish your own mini-courses effortlessly with our Levenue MiniCourses platform.',
    images: [`/images/default-course-og.png`]
  }
};

export default function Page() {
  return <LandingPageView />;
}
