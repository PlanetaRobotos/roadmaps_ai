import DashboardView from '@/app/dashboard/_components/dashboard-view';
import { redirect } from 'next/navigation';

export default function DashboardPage() {
  return <DashboardView />;
  // redirect('/dashboard/overview');
}
