import React from 'react';
import { ThumbnailCard } from '@/types/roadmap-types';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

interface ThumbnailCardProps {
  props: ThumbnailCard;
}

const ThumbnailCard: React.FC<ThumbnailCardProps> = ({ props }) => {
  const { title, thumbnail: thumbnailUrl } = props;

  return (
    <div className="flex h-full flex-col items-center justify-center rounded-xl bg-white p-2 ring-1 ring-blue-100">
      <div className="flex flex-col items-center px-6 py-8">
        {/* Thumbnail */}
        <div className="relative aspect-square w-44 overflow-hidden rounded-2xl ring-2 ring-black/5 sm:w-56 md:w-64 lg:w-72">
          <Image
            src={thumbnailUrl || '/images/roadmaps/roadmap-thumbnail-1.png'}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 176px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 288px"
            priority
          />
        </div>

        {/* Title and hint */}
        <h2 className="mt-8 text-center text-xl font-semibold tracking-tight">
          {title}
        </h2>
        <div className="mt-6 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
          <span>Swipe to start</span>
          <ChevronRight className="h-4 w-4 animate-[swipe_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
};

export default ThumbnailCard;
