import { BenefitsSection } from '@/components/landing/layout/sections/benefits';
import { CommunitySection } from '@/components/landing/layout/sections/community';
import { ContactSection } from '@/components/landing/layout/sections/contact';
import { FAQSection } from '@/components/landing/layout/sections/faq';
import { FeaturesSection } from '@/components/landing/layout/sections/features';
import { FooterSection } from '@/components/landing/layout/sections/footer';
import { HeroSection } from '@/components/landing/layout/sections/hero';
import { PricingSection } from '@/components/landing/layout/sections/pricing';
import { ServicesSection } from '@/components/landing/layout/sections/services';
import { SponsorsSection } from '@/components/landing/layout/sections/sponsors';
import { TeamSection } from '@/components/landing/layout/sections/team';
import { TestimonialSection } from '@/components/landing/layout/sections/testimonial';
import { FounderSection } from '@/components/landing/layout/sections/founder';
import PageContainer from '@/components/layout/page-container';

export const LandingPageView = () => {
  return (
    <>
      <HeroSection />
      <FounderSection />
      <FeaturesSection />
      <TestimonialSection />
      <PricingSection />
      <FAQSection />
      <FooterSection />
    </>
  );
};
