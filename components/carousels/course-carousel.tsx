import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/carousels/carousel-embla';
import { IRoadmapModel, RoadmapModel } from '@/app/api/client';
import CourseCard from '@/components/carousels/course-card';
import { Icons } from '@/components/icons';
import Link from 'next/link';
import CourseCard2 from '@/components/carousels/course-card-2';

interface PlayListCarouselProps {
  title?: string;
  subTitle?: string;
  path?: string;
  Thumbnail?: React.ReactNode;
  roadmaps?: RoadmapModel[];
}

const CourseCarousel: React.FC<PlayListCarouselProps> = (
  props: PlayListCarouselProps
) => {
  const { title, subTitle, roadmaps, Thumbnail, path } = props;
  console.log('Roadmaps:', roadmaps);

  return (
    <div className="w-full">
      <Carousel className="w-full">
        <div className="my-2 flex flex-row items-end justify-between">
          <Link href={`/dashboard/roadmaps/room/${path}`}>
            <article className="flex flex-row gap-3">
              {Thumbnail}
              <div className="flex flex-col justify-center">
                <div className="flex items-center text-xl font-bold leading-[34px]">
                  {title}
                  <Icons.chevronRight className="h-5 w-5" />
                </div>
                <div className="">
                  {subTitle && (
                    <div className="text-neutral-500">{subTitle}</div>
                  )}
                </div>
              </div>
            </article>
          </Link>
          <div className="relative left-[-45px]">
            <div className="absolute bottom-5">
              <CarouselPrevious className="right-2" />
              <CarouselNext className="left-2" />
            </div>
          </div>
        </div>
        <CarouselContent>
          {roadmaps?.slice(0, 10).map((roadmap, index) => (
            <CarouselItem key={index} className="w-60 flex-none">
              <div className="p-1">
                <CourseCard2 {...roadmap} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CourseCarousel;
