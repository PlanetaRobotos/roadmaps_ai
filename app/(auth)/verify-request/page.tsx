import { SearchParams } from 'nuqs/parsers';
import EmailRedirectPage from './_componets/email-redirect';

type pageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: 'Dashboard : Email Redirect'
};

export default async function Page({ searchParams }: pageProps) {
  return <EmailRedirectPage />;
}
