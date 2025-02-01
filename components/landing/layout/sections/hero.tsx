'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FeaturedSection from '@/app/dashboard/_components/featured-section';

export const HeroSection = () => {
  const router = useRouter();

  return (
    <section className="container relative w-full">
      <div className="mx-auto grid place-items-center gap-8 py-20 md:py-32 lg:max-w-screen-xl">
        <div className="space-y-8 text-center">
          <Badge variant="outline" className="py-2 text-sm">
            <span className="mr-2 text-primary">
              <Image
                className="rounded-full"
                src="/images/logo.png"
                alt="Logo"
                width={28}
                height={28}
              />
            </span>
            <span> By Pavlo Myrskyi </span>
          </Badge>

          <div className="mx-auto text-center">
            <h1 className="text-5xl font-black tracking-tight lg:text-6xl lg:text-[4rem] lg:tracking-[-0.035em] ">
              Create courses in seconds,{'  '}
              <span className="relative inline-block text-white">
                <span className="relative z-10 px-1 py-1">not hours</span>
                <span
                  className="absolute -inset-x-2 -inset-y-1 transform bg-gray-300"
                  style={{
                    transform: 'rotate(-1deg) translateY(4px)',
                    transformOrigin: 'left center'
                  }}
                ></span>
              </span>
            </h1>
          </div>

          <p className="mx-auto max-w-screen-sm text-xl text-muted-foreground">
            {/*Transform any topic into engaging <br />*/}
            {/*lessons — no skills needed*/}
            Interactive mini-courses are great for using them as educational
            lead magnets, workshop enrichment assets, micro-learning materials
            to educate community or to get paid.
          </p>

          <div className="space-y-4 md:space-x-4 md:space-y-0">
            <Button
              onClick={() => router.push('/dashboard/roadmaps/create')}
              className="group/arrow w-5/6 font-bold md:w-1/4"
            >
              Create course
              <ArrowRight className="ml-2 size-5 transition-transform group-hover/arrow:translate-x-1" />
            </Button>

            <Button
              onClick={() => router.push('/dashboard/roadmaps/explore')}
              variant="secondary"
              className="w-5/6 font-bold md:w-1/4"
            >
              {/*<Link*/}
              {/*  // href="/dashboard/roadmaps/43d09926-a08b-4566-8b36-74aa689d100a"*/}
              Explore courses
              {/*</Link>*/}
            </Button>
          </div>
        </div>

        {/* Added FeaturedSection here */}
        <div className="relative mt-16">
          <FeaturedSection />
        </div>

        <div className="group relative mt-14">
          <div className="absolute left-1/2 top-2 mx-auto h-24 w-[90%] -translate-x-1/2 transform rounded-full bg-primary/50 blur-3xl lg:-top-8 lg:h-80"></div>
          <Image
            width={1200}
            height={1200}
            className="rouded-lg relative mx-auto flex w-full items-center rounded-lg border border-t-2 border-secondary border-t-primary/30 leading-none  md:w-[900px]"
            src="/images/full_shorten_big.gif"
            alt="dashboard"
          />

          <div className="absolute bottom-0 left-0 h-20 w-full rounded-lg bg-gradient-to-b from-background/0 via-background/50 to-background md:h-28"></div>
        </div>
      </div>
    </section>
  );
};
