import { Skeleton } from '@/components/ui/skeleton';

const CategoryPageSkeleton = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Header Skeleton */}
      <div className="h-[200px] w-full px-8 py-12">
        <Skeleton className="h-10 w-[300px]" />
        <Skeleton className="mt-4 h-6 w-[500px]" />
      </div>

      {/* Content Sections Skeleton */}
      <div className="container space-y-10 py-8">
        {/* Repeat for each section */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-8 w-[200px]" />
            <div className="flex gap-4">
              {[1, 2, 3, 4].map((j) => (
                <Skeleton key={j} className="h-[280px] w-[280px] rounded-xl" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPageSkeleton;
