import { Metadata } from 'next';
import { company } from '@/constants/data';

export const metadata: Metadata = {
  title: `Shows We Love - ${company.name}`,
  description: 'Shows we love page'
};

export default function ShowsWeLovePage() {
  return <div></div>;
}
