import { Metadata } from 'next';
import PricingPageView from './_components/pricing-page';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Pricing page'
};

export default function PricingPage() {
  return <PricingPageView />;
}
