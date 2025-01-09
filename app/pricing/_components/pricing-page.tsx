import { PricingSection } from '@/components/landing/layout/sections/pricing';
import PageContainer from '@/components/layout/page-container';
import { FAQSection } from '@/components/landing/layout/sections/faq';

export default function PricingPageView() {
  return (
    <PageContainer>
      <div className="pt-16">
        <PricingSection />
        <FAQSection />
      </div>
    </PageContainer>
  );
}
