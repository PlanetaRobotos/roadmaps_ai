import { SearchParams } from 'nuqs/parsers';
import ProfileViewPage from './_components/profile-view-page';
import PageContainer from '@/components/layout/page-container';

type pageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: 'Dashboard : Profile'
};

export default async function Page({ searchParams }: pageProps) {
  return (
    <PageContainer>
      <ProfileViewPage />
    </PageContainer>
  );
}
