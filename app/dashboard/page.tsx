import DashboardView from '@/app/dashboard/_components/dashboard-view';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard page'
};

export default function DashboardPage() {
  return <DashboardView />;
}
