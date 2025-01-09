import { FAQSection } from '@/components/landing/layout/sections/faq';
import { FooterSection } from '@/components/landing/layout/sections/footer';
import { PricingSection } from '@/components/landing/layout/sections/pricing';
import { LandingRedirect } from '@/app/(landing)/_components/landing-redirect';
import { HeroSection } from '@/components/landing/layout/sections/hero';

export const LandingPageView = () => {
  return (
    <>
      <LandingRedirect />
      <HeroSection />
      {/*<FounderSection />*/}
      {/*<FeaturesSection />*/}
      {/*<TestimonialSection />*/}
      <PricingSection />
      <FAQSection />
      <FooterSection />
    </>
  );
};
