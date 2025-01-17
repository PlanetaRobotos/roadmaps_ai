'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export const FounderSection = () => {
  const router = useRouter();

  return (
    <section className="container bg-background py-14 sm:py-20">
      <h2 className="mb-6 text-center text-lg tracking-wider text-primary">
        Founder
      </h2>
      <div className="mx-auto max-w-2xl space-y-5 px-4 sm:px-6 lg:px-8">
        {/* Section One: Photo + Introduction */}
        <div className="flex flex-row flex-wrap items-start gap-3 md:gap-10">
          {/* Founder Photo */}
          <div className="md:w-45 md:h-45 relative flex h-32 w-32 flex-shrink-0 flex-col items-center overflow-hidden rounded-xl border-4 border-primary/50 text-center shadow-lg sm:h-40 sm:w-40">
            <Image
              src="/images/me-r2.jpg"
              alt="Founder Photo"
              className="h-full w-full object-cover object-center"
              width={600}
              height={600}
            />
          </div>

          {/* Text Content */}
          <div className="flex-1">
            <h3 className="text-md flex flex-row flex-wrap font-bold text-foreground md:text-2xl">
              Hey, it&#39;s Pavlo👋
            </h3>
            <span className="text-sm text-muted-foreground">Founder</span>

            <div className="mt-2 space-y-2">
              <p className="text-sm leading-relaxed text-muted-foreground">
                I found my passion in creating fun, interactive learning. So I
                built a place where anyone can share knowledge, learn on the go,
                and connect through bite-sized courses.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                I hope you love it as much as I loved bringing it to life!
              </p>
            </div>
          </div>
        </div>

        {/* Section Two: Core Problem & Solution */}
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Just pick a topic, craft a mini course, and share—or explore our
            community library.
          </p>
          <ul className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
            <li>
              <span className="font-bold text-foreground">
                Immediate Creation:
              </span>{' '}
              Type a prompt, generate a course, share instantly.
            </li>
            <li>
              <span className="font-bold text-foreground">Less Overwhelm:</span>{' '}
              Short, actionable modules—no endless scrolling.
            </li>
            <li>
              <span className="font-bold text-foreground">
                Community Driven:
              </span>{' '}
              Explore courses from others, swap ideas, and grow together.
            </li>
          </ul>
          <p className="text-sm leading-relaxed text-muted-foreground">
            It’s built for your busy life, so you can learn anytime.{' '}
            {/*<span className="font-bold text-foreground"></span>{' '}*/}
            <Button
              variant="secondary"
              className="ml-4 font-bold text-foreground"
              onClick={() => router.push('/#pricing')}
            >
              Ready to jump in?
            </Button>
          </p>
        </div>
      </div>
    </section>
  );
};
