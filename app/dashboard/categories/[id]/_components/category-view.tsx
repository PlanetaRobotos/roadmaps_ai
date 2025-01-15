'use client';

import React, { useEffect, useState } from 'react';
import { CategoryPageModel } from '@/app/api/client';
import CourseCarousel from '@/components/carousels/course-carousel';
import CategoryCarousel from '@/components/carousels/category-carousel';
import axios from '@/lib/axios';
import CategoryPageSkeleton from '@/app/dashboard/categories/[id]/_components/category-page-skeleton';
import { debounce } from 'lodash';
import DashboardFooter from '@/app/dashboard/_components/dashboard-footer';
import Image from 'next/image';
import { S3_CATEGORY_THUMBNAIL_URL } from '@/constants/data';

interface CategoryViewProps {
  categoryId: string;
}

const CategoryView = ({ categoryId }: CategoryViewProps) => {
  const [categoryData, setCategoryData] = useState<CategoryPageModel>();

  useEffect(() => {
    const debouncedFetch = debounce(async () => {
      try {
        const response = await axios.get<CategoryPageModel>(
          `v1/categories/page/${categoryId}`
        );
        setCategoryData(response.data);

        console.log('Category Data:', response.data);
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    }, 300);

    debouncedFetch();
    return () => debouncedFetch.cancel();
  }, [categoryId]);

  if (!categoryData) {
    return <CategoryPageSkeleton />;
  }

  const thumbnail = `${S3_CATEGORY_THUMBNAIL_URL}/${categoryData.category?.thumbnailUrl}`;

  console.log('Thumbnail:', thumbnail);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-white">
        {/* Hero Section - Shorter on mobile, taller on desktop */}
        <div
          className="relative h-[400px] w-full md:h-96"
          style={{
            backgroundColor: categoryData.category?.colorHex,
            backgroundImage:
              'linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))'
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

          {/* Content - Stack vertically on mobile, horizontal on desktop */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
            <div className="container mx-auto max-w-6xl">
              <div className="flex flex-col items-center gap-6 md:flex-row md:items-end md:gap-8">
                {/* Category Icon/Image - Smaller on mobile */}
                <div
                  className="h-32 w-32 overflow-hidden rounded-2xl shadow-lg md:h-40 md:w-40"
                  style={{ backgroundColor: categoryData.category?.colorHex }}
                >
                  <Image
                    src={thumbnail}
                    alt="Category icon"
                    className="h-full w-full object-cover object-center"
                    width={512}
                    height={512}
                  />
                </div>

                {/*<div className="md:w-45 md:h-45 relative flex h-32 w-32 flex-shrink-0 flex-col items-center overflow-hidden rounded-xl border-4 border-primary/50 text-center shadow-lg sm:h-40 sm:w-40">*/}

                {/* Category Info - Centered on mobile, left-aligned on desktop */}
                <div className="flex-1 text-center md:pb-4 md:text-left">
                  <h1 className="text-3xl font-bold text-white md:text-4xl">
                    {categoryData.category?.title}
                  </h1>
                  {categoryData.category?.description && (
                    <p className="mt-2 text-base text-white/90 md:mt-4 md:text-lg">
                      {categoryData.category.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Adjusted padding for mobile */}
        <div className="container mx-auto max-w-6xl px-4 md:px-8">
          {/* Top Courses Section */}
          {categoryData.topCourses && categoryData.topCourses.length > 0 && (
            <div className="py-8 md:py-12">
              <h2 className="mb-6 text-xl font-bold md:mb-8 md:text-2xl">
                Popular Courses in {categoryData.category?.title}
              </h2>
              <CourseCarousel
                title="Top Courses"
                subTitle="Most popular in this category"
                roadmaps={categoryData.topCourses}
              />
            </div>
          )}

          {/* New Courses Section */}
          {categoryData.newCourses && categoryData.newCourses.length > 0 && (
            <div className="  py-8 md:py-12">
              <h2 className="mb-6 text-xl font-bold md:mb-8 md:text-2xl">
                New Releases
              </h2>
              <CourseCarousel
                title="New Courses"
                subTitle="Recently added"
                roadmaps={categoryData.newCourses}
              />
            </div>
          )}

          {/* Child Categories Section */}
          {categoryData.childCategories &&
            categoryData.childCategories.length > 0 && (
              <div className="border-t border-gray-100 py-8 md:py-12">
                {/*<h2 className="mb-6 text-xl font-bold md:mb-8 md:text-2xl">*/}
                {/*  Subcategories*/}
                {/*</h2>*/}
                <CategoryCarousel
                  title={`More in ${categoryData.category?.title}`}
                  // subTitle={`Topics within ${categoryData.category?.title}`}
                  categories={categoryData.childCategories}
                />
              </div>
            )}

          {/* Related Categories Section */}
          {categoryData.relatedCategories &&
            categoryData.relatedCategories.length > 0 && (
              <div className="  py-8 md:py-12">
                {/*<h2 className="mb-6 text-xl font-bold md:mb-8 md:text-2xl">*/}
                {/*  You Might Also Like*/}
                {/*</h2>*/}
                <CategoryCarousel
                  // title="Related Categories"
                  subTitle="You might also like"
                  categories={categoryData.relatedCategories}
                />
              </div>
            )}
        </div>
      </div>
      <DashboardFooter />
    </>
  );
};

export default CategoryView;
