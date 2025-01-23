import { FAQSection } from '@/components/landing/layout/sections/faq';
import { FooterSection } from '@/components/landing/layout/sections/footer';
import { PricingSection } from '@/components/landing/layout/sections/pricing';
import { LandingRedirect } from '@/app/(landing)/_components/landing-redirect';
import { HeroSection } from '@/components/landing/layout/sections/hero';
import { FounderSection } from '@/components/landing/layout/sections/founder';
import { InstructionsSection } from '@/components/landing/layout/sections/instructions';
import { TestimonialSection } from '@/components/landing/layout/sections/testimonial';
import LearningCycle from '@/components/landing/layout/sections/learning';

export const LandingPageView = () => {
  return (
    <>
      <LandingRedirect />

      <HeroSection />
      <LearningCycle />
      <InstructionsSection />
      <TestimonialSection />
      <FounderSection />
      <div className="py-24 sm:py-32">
        <PricingSection />
      </div>
      <FAQSection />
      <FooterSection />
    </>
  );
};
