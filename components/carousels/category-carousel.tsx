import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/carousels/carousel-embla';
import { CategoryModel } from '@/app/api/client';
import { Icons } from '@/components/icons';
import Link from 'next/link';
import CategoryCard from '@/components/carousels/category-card';

interface CategoryCarouselProps {
  title?: string;
  subTitle?: string;
  categories?: CategoryModel[];
  path?: string;
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = (
  props: CategoryCarouselProps
) => {
  const { title, subTitle, categories, path } = props;

  console.log('Categories:', categories);

  // const sortedCategories = categories
  //   ?.slice() // Create a shallow copy to avoid mutating the original array
  //   .sort((a, b) => {
  //     // Handle null values: move items with null position to the end
  //     if (a.position === undefined) return 1;
  //     if (b.position === undefined) return -1;
  //     return a.position - b.position; // Otherwise, sort by position
  //   });

  // console.log('Sorted Categories:', sortedCategories);

  return (
    <div className="my-10 w-full">
      <Carousel
        opts={{
          align: 'start',
          loop: false
        }}
        className="w-full"
      >
        <div className="my-2 flex flex-row items-end justify-between">
          <article className="flex flex-row gap-3">
            <div className="flex flex-col justify-center">
              <div className="flex items-center text-xl font-bold leading-[34px]">
                {title}
                {path && <Icons.chevronRight className="h-5 w-5" />}
              </div>
              {subTitle && <div className="text-neutral-500">{subTitle}</div>}
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
          {categories?.map((category) => (
            <CarouselItem
              key={category.id || category.position}
              className="w-80 flex-none"
            >
              <div className="p-1">
                <CategoryCard
                  {...category}
                  init={category.init}
                  toJSON={category.toJSON}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
