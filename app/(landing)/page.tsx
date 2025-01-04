import { LandingPageView } from '@/app/(landing)/_components/landing-view';
import { CLIENT_URL } from '@/config/apiConfig';
import { company } from '@/constants/data';

export const metadata = {
  title: company.name,
  description: `${company.name} - Landing page`,
  openGraph: {
    type: 'website',
    url: `${CLIENT_URL}`,
    title: company.name,
    description: 'Free Shadcn landing page for developers',
    images: [
      {
        url: `/images/default-course-og.png`,
        width: 1200,
        height: 630,
        alt: company.name
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: 'https://github.com/nobruf/shadcn-landing-page.git',
    title: company.name,
    description: `Design and publish your own mini-courses effortlessly with our ${company.name} platform.`,
    images: [`/images/default-course-og.png`]
  }
};

export default function Page() {
  return <LandingPageView />;
}
