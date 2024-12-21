import { Metadata } from 'next';
import SignInViewPage from '../_components/sigin-view';
import AuthCallback from '@/app/(auth)/_components/callback';

export const metadata: Metadata = {
  title: 'Authentication | Callback',
  description: 'Authentication callback page'
};

export default function Page() {
  return <AuthCallback />;
}
