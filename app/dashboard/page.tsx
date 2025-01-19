import DashboardView from '@/app/dashboard/_components/dashboard-view';
import { Metadata } from 'next';
import PageContainer from '@/components/layout/page-container';
import ScrollablePage from '@/components/ScrollablePage';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard page'
};

export default function DashboardPage() {
  return (
    <ScrollablePage maxHeight="h-screen" direction="vertical">
      <DashboardView />
    </ScrollablePage>
  );
}
