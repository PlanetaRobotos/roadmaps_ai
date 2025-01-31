'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

export const CTABannerJoinSection = () => {
  return (
    <section className="container w-full px-4 py-16 md:py-24">
      <Card className="mx-auto max-w-6xl bg-gradient-to-br from-blue-50/80 via-white to-purple-50/80 p-6 md:p-12">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          {/* Image Column */}
          <div className="relative mx-auto flex w-full max-w-lg items-center justify-center">
            <Image
              src="/images/landing/home-foot-back-2-768x407.webp"
              alt="Platform interface preview"
              className="rounded-lg object-contain"
              width={768}
              height={407}
              priority
            />
          </div>

          {/* Content Column */}
          <div className="flex flex-col space-y-6 md:pl-8">
            <h2 className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
              Join thousands of people doing more with less time.
            </h2>
            <Button
              size="lg"
              className="max-w-40 bg-orange-500 text-white hover:bg-orange-600"
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
};
