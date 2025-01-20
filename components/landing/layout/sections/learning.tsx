'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const CurvedLine = ({ rotation = 0 }) => {
  return (
    <svg className="fill-base-content size-12 md:size-14" viewBox="0 0 251 81">
      <g>
        <path d="M14.4435 26.0257C16.3478 34.2205 18.0405 42.2052 20.1564 51.2405C14.6551 50.6101 11.4813 47.2481 10.2118 43.4659C6.40317 32.1193 2.80615 20.5625 0.267089 8.79558C-1.21404 2.07164 3.65251 -1.50048 10.2118 0.600755C21.2144 3.96273 32.0054 7.95508 43.0081 11.7373C43.6428 11.9474 44.4892 12.1576 44.7008 12.5778C45.7587 14.0487 46.3935 15.7296 47.2398 17.4106C45.7587 18.041 44.2776 19.5119 43.0081 19.3017C38.5647 18.6714 34.3329 17.6208 30.1011 16.7803C27.7737 16.36 25.6577 15.7297 22.2723 16.7803C24.5998 19.3018 26.9273 22.0333 29.2548 24.5548C79.6129 74.5642 155.15 85.0703 217.781 51.2405C225.821 46.8279 233.227 41.5748 241.055 36.742C243.806 35.061 246.557 33.5901 249.307 31.9092C249.942 32.3294 250.365 32.9598 251 33.38C250.365 35.2711 250.154 37.7926 248.673 39.0533C244.018 43.4659 239.363 47.8785 234.073 51.6607C181.599 89.4829 108.601 90.9538 52.1064 54.8126C41.3154 47.8785 31.7938 39.0533 21.8492 31.0686C19.7333 29.3876 18.0406 27.4966 16.1363 25.6054C15.7131 25.3953 15.0783 25.6054 14.4435 26.0257Z" />
      </g>
    </svg>
  );
};

const LearningCycle = () => {
  const router = useRouter();

  return (
    <section className="space-y-16 px-8 pb-24 pt-32 md:pb-36 md:pt-48">
      <div className="flex flex-col items-center justify-center gap-3 pb-24 text-center text-xl text-red-700 md:flex-row md:text-2xl">
        <span className="text-3xl">🚫</span>
        <span className="italic">
          Instead of spending weeks creating course content manually...
        </span>
      </div>

      <div className="max-sm:-mx-4">
        <div className="relative mx-auto flex aspect-[1/1] w-full items-center justify-center rounded-full max-md:max-w-[400px] md:aspect-[3/2] md:w-[650px]">
          {/* Top Element - Book */}
          <div className="absolute top-2 flex flex-col items-center">
            <Image
              alt="Book"
              width={80}
              height={80}
              className="size-[70px] rotate-3 md:size-24"
              src="/icons/book.webp"
              priority
            />
            <span className="text-lg font-semibold md:text-xl">
              Generate content
            </span>
          </div>

          {/* Right Side Element */}
          <div className="absolute -right-2 flex flex-col items-center">
            <Image
              alt="Lightning"
              width={80}
              height={80}
              className="size-[70px] md:size-24"
              src="/icons/bolt.webp"
              priority
            />
            <span className="text-lg font-semibold md:text-xl">
              Customize & refine
            </span>
          </div>

          {/* Bottom Element - Rocket */}
          <div className="absolute bottom-2 flex flex-col items-center">
            <Image
              alt="Rocket"
              width={80}
              height={80}
              className="size-[70px] md:size-24"
              src="/icons/rocket.webp"
              priority
            />
            <span className="text-lg font-semibold md:text-xl">
              Share & publish
            </span>
          </div>

          {/* Left Element - Lightbulb */}
          <div className="absolute -left-2 flex flex-col items-center">
            <Image
              alt="Lightbulb"
              width={80}
              height={80}
              className="size-[70px] md:size-24"
              src="/icons/bulb.webp"
              priority
            />
            <span className="text-lg font-semibold md:text-xl">
              Track engagement
            </span>
          </div>

          {/* Top Left Arrow */}
          <div className="absolute left-12 top-12 rotate-[135deg]">
            <CurvedLine />
          </div>

          {/* Top Right Arrow */}
          <div className="absolute right-12 top-12 rotate-[-135deg]">
            <CurvedLine />
          </div>

          {/* Bottom Right Arrow */}
          <div className="absolute bottom-12 right-12 rotate-[-55deg]">
            <CurvedLine />
          </div>

          {/* Bottom Left Arrow */}
          <div className="absolute bottom-12 left-12 rotate-[45deg]">
            <CurvedLine />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center text-center">
        <h2 className="pb-8 text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
          Create a teaching{' '}
          <span className="relative inline-block decoration-primary ">
            <span className="relative z-10">flywheel</span>
            <span className="absolute -inset-x-2 bottom-0 h-4 bg-[#ABE2CB] md:-bottom-0.5 md:h-6"></span>
          </span>
        </h2>
        <p className="max-w-2xl pb-8">
          Create courses like a pro — transform <br />
          your knowledge into engaging 15-60 minute lessons <br />
          and build your teaching presence in minutes
        </p>
        <Button
          onClick={() => router.push('/#pricing')}
          className="rounded-full bg-emerald-200 px-8 py-3 font-medium text-gray-800"
        >
          Get instant access
        </Button>
        <div className="text-base-content-secondary mt-1 flex items-center justify-center gap-2 text-center text-sm">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          No experience needed
        </div>
      </div>
    </section>
  );
};

export default LearningCycle;
