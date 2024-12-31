import { Metadata } from 'next';
import PageContainer from '@/components/layout/page-container';
import PrivacyPolicyPage from '@/app/privacy-policy/_components/pp-view';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read our privacy policy'
};

const Page = () => {
  return (
    <PageContainer>
      <PrivacyPolicyPage />
    </PageContainer>
  );
};

export default Page;
