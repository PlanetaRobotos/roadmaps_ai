import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/carousels/carousel-embla';
import { IRoadmapModel, RoadmapModel } from '@/app/api/client';
import PlayListCard from '@/components/carousels/play-list-card';
import { Icons } from '@/components/icons';

interface PlayListCarouselProps {
  title?: string;
  subTitle?: string;
  Thumbnail?: React.ReactNode;
  roadmaps?: RoadmapModel[];
}

const PlayListCarousel: React.FC<PlayListCarouselProps> = (
  props: PlayListCarouselProps
) => {
  const { title, subTitle, roadmaps, Thumbnail } = props;

  return (
    <div className="w-full">
      <Carousel className="w-full">
        <div className="my-2 flex flex-row items-end justify-between">
          <article className="flex flex-row gap-3">
            {Thumbnail}
            <div className="flex flex-col justify-center">
              <div className="">
                {subTitle && <div className="text-neutral-500">{subTitle}</div>}
              </div>
              <div className="flex items-center text-xl font-bold leading-[34px]">
                {title}
                <Icons.chevronRight className="h-5 w-5" />
              </div>
            </div>
          </article>
          <div className="relative left-[-45px]">
            <div className="absolute bottom-5">
              <CarouselPrevious className="right-2" />
              <CarouselNext className="left-2" />
            </div>
          </div>
        </div>
        <CarouselContent>
          {roadmaps?.map((playlist, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <div className="p-1">
                <PlayListCard {...playlist} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default PlayListCarousel;
