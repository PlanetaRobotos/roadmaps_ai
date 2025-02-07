import { LandingPageView } from '@/app/(landing)/_components/landing-view';
import { CLIENT_URL } from '@/config/apiConfig';
import { company } from '@/constants/data';

export const metadata = {
  title: company.name,
  description: `${company.name} - is the easiest way to create and deliver mini-courses & micro-learning materials. Save time with the AI Course Creator.`,
  metadataBase: new URL('https://levenue.tech'),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    url: `${CLIENT_URL}`,
    title: company.name,
    description: `Design and publish your own mini-courses effortlessly with ${company.name}.`,
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
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export default function Page() {
  return <LandingPageView />;
}
