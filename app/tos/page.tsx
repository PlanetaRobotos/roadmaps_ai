import { Metadata } from 'next';
import TermsOfServicesPage from '@/app/tos/_components/tos-view';
import PageContainer from '@/components/layout/page-container';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read our terms of service.'
};

const Page = () => {
  return (
    <PageContainer>
      <TermsOfServicesPage />
    </PageContainer>
  );
};

export default Page;
