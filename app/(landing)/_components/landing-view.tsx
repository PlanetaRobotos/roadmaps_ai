import { FAQSection } from '@/components/landing/layout/sections/faq';
import { FooterSection } from '@/components/landing/layout/sections/footer';
import { PricingSection } from '@/components/landing/layout/sections/pricing';
import { LandingRedirect } from '@/app/(landing)/_components/landing-redirect';
import { HeroSection } from '@/components/landing/layout/sections/hero';
import { FeaturesSection } from '@/components/landing/layout/sections/features';
import { FounderSection } from '@/components/landing/layout/sections/founder';
import { TestimonialSection } from '@/components/landing/layout/sections/testimonial';

export const LandingPageView = () => {
  return (
    <>
      <LandingRedirect />

      <HeroSection />
      <FounderSection />
      <FeaturesSection />
      <TestimonialSection />
      <div className="py-24 sm:py-32">
        <PricingSection />
      </div>
      <FAQSection />
      <FooterSection />
    </>
  );
};
