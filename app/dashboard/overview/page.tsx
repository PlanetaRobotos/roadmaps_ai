import OverViewPage from './_components/overview';
import ScrollablePage from '@/components/ScrollablePage';
import DashboardView from '@/app/dashboard/_components/dashboard-view';

export const metadata = {
  title: 'Dashboard : Overview'
};

export default function page() {
  // return <OverViewPage />;
  return (
    <ScrollablePage>
      <DashboardView />
    </ScrollablePage>
  );
}
