import DefaultPageView from '@/app/default/_components/default-page-view';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Default Page',
  description: 'For redirecting to dashboard or signin page'
};

export default function Page() {
  return <DefaultPageView />;
}
