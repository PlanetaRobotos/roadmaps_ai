import { Metadata } from 'next';
import SignInViewPage from '../_components/signin-view';
import AuthCallback from '@/app/(auth)/_components/callback';

export const metadata: Metadata = {
  title: 'Authentication | Callback | Obsolete!',
  description: 'Authentication callback page'
};

export default function Page() {
  return <AuthCallback />;
}
