import { FAQSection } from '@/components/landing/layout/sections/faq';
import { FooterSection } from '@/components/landing/layout/sections/footer';
import { PricingSection } from '@/components/landing/layout/sections/pricing';
import { LandingRedirect } from '@/app/(landing)/_components/landing-redirect';
import { HeroSection } from '@/components/landing/layout/sections/hero';
import { FounderSection } from '@/components/landing/layout/sections/founder';
import { InstructionsSection } from '@/components/landing/layout/sections/instructions';
import { TestimonialSection } from '@/components/landing/layout/sections/testimonial';
import { UseCasesSection } from '@/components/landing/layout/sections/use-cases';
import { CTABannerJoinSection } from '@/components/landing/layout/sections/join-banner';
import LearningCycle from '@/components/landing/layout/sections/learning';
import { AISection } from '@/components/landing/layout/sections/ai';

export const LandingPageView = () => {
  return (
    <>
      <LandingRedirect />

      <HeroSection />
      <AISection />
      <LearningCycle />
      {/*<InstructionsSection />*/}
      <UseCasesSection />
      <div className="py-24 sm:py-32">
        <PricingSection />
      </div>
      <TestimonialSection />
      <FounderSection />
      <FAQSection />
      <CTABannerJoinSection />
      <FooterSection />
    </>
  );
};
