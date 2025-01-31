'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import React from 'react';
import { JetBrains_Mono } from 'next/font/google';

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400']
});

export const AISection = () => {
  return (
    <section className="container w-full px-4 py-16 md:py-24">
      <Card className="mx-auto max-w-6xl bg-gradient-to-br from-blue-50/80 via-white to-purple-50/80 p-6 md:p-12">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-2xl font-bold tracking-tight md:text-4xl ">
            AI that enhances your expertise
          </h2>
          <div className="mx-auto max-w-xl space-y-4">
            <p className="text-lg text-muted-foreground">
              Levenue AI tools help you create strategic microlearning that
              changes behavior, not just shares information.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          {/* Content Column */}
          <div className="flex flex-col space-y-6 md:pl-8">
            <span
              className={`max-w-40 text-sm font-normal uppercase leading-4 tracking-wider text-blue-600 ${jetBrainsMono.className}`}
            >
              AI-powered microlearning Designer
            </span>
            <h5 className="text-xl leading-tight  md:text-4xl">
              Microlearning
              <br />
              Copilot
            </h5>
            <p className="text-muted-foreground">
              Answer a few strategic questions to generate complete,
              scenario-based learning campaigns that enhance your training
              strategy. <br />
              <br /> Leverage cognitive load theory and adult learning
              principles while cutting development time by 87%.
            </p>
          </div>

          {/* Image Column */}
          <div className="group relative flex items-center justify-center p-4">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/80 to-purple-100/30 shadow-lg blur transition-all duration-300 ease-in-out group-hover:rotate-0"></div>

            <div className="relative transition-all duration-300 ease-in-out [transform:perspective(1000px)_rotateY(-10deg)] group-hover:[transform:perspective(1000px)_rotateY(0deg)]">
              <Image
                src="/images/landing/file_copilot.png"
                alt="Platform interface preview"
                className="rounded-2xl object-contain"
                width={768}
                height={407}
                priority
              />
            </div>
          </div>

          {/* Image Column */}
          <div className="group relative flex items-center justify-center p-4">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/80 to-purple-100/30 shadow-lg blur transition-all duration-300 ease-in-out group-hover:rotate-0"></div>

            <div className="relative transition-all duration-300 ease-in-out [transform:perspective(1000px)_rotateY(10deg)] group-hover:[transform:perspective(1000px)_rotateY(0deg)]">
              <Image
                src="/images/landing/file_transform.png"
                alt="Platform interface preview"
                className="rounded-2xl object-contain"
                width={768}
                height={407}
                priority
              />
            </div>
          </div>

          {/* Content Column */}
          <div className="flex flex-col space-y-6 md:pl-8">
            <span
              className={`max-w-40 text-sm font-normal uppercase leading-4 tracking-wider text-blue-600 ${jetBrainsMono.className}`}
            >
              AI-powered Content Converter
            </span>
            <h5 className="text-xl leading-tight  md:text-4xl">
              Microlearning <br />
              Transformer
            </h5>
            <p className="text-muted-foreground">
              Turn your critical content (PowerPoints, PDFs, videos, and more)
              into high-impact learning that people actually use and retain — no
              dumbing down, no generic AI-generated filler. <br />
              <br /> 100% data-safe: No AI training on your data; files are
              deleted after processing.
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
};
