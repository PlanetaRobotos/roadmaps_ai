'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IRoadmapModel } from '@/app/api/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TimerDial from '@/components/ui/timer-dial';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import {
  extractColors,
  getRGBA,
  isLightColor,
  RGB,
  DEFAULT_COLORS
} from '@/utils/colors';
import Image from 'next/image';
import { getImageUrl } from '@/lib/utils';
import { Clock } from 'lucide-react';
import axios from '@/lib/axios';

const CourseCard2 = (props: IRoadmapModel) => {
  const {
    id,
    tags,
    estimatedDuration,
    title,
    description,
    likes,
    authorId,
    topic,
    thumbnailUrl
  } = props;
  const [cardState, setCardState] = useState<{
    colors: RGB[];
    isLoading: boolean;
    error: boolean;
  }>({
    colors: [],
    isLoading: true,
    error: false
  });
  const [finalThumbnailUrl, setFinalThumbnailUrl] = useState<string | null>('');

  useEffect(() => {
    if (thumbnailUrl) {
      setFinalThumbnailUrl(getImageUrl(thumbnailUrl));
    } else {
      setFinalThumbnailUrl(`/images/roadmaps/roadmap-thumbnail-1.png`);

      // const result = axios.put(`/v1/roadmaps/${id}/set-default-thumbnail`, {
      //   thumbnailUrl: finalThumbnailUrl
      // });
    }

    const loadColors = async () => {
      try {
        const extractedColors = await extractColors(finalThumbnailUrl!);
        setCardState((prev) => ({
          ...prev,
          colors: extractedColors,
          isLoading: false
        }));
      } catch (error) {
        console.error('Failed to extract colors:', error);
        setCardState((prev) => ({
          ...prev,
          isLoading: false,
          error: true
        }));
      }
    };

    if (finalThumbnailUrl) {
      loadColors();
    } else {
      setCardState((prev) => ({
        ...prev,
        colors: DEFAULT_COLORS,
        isLoading: false
      }));
    }
  }, [finalThumbnailUrl]);

  const { colors, isLoading, error } = cardState;

  // Simplified gradient and content background styles
  const gradientStyle = colors.length
    ? {
        background: `linear-gradient(to top, 
      ${getRGBA(colors[0], 0.95)} 0%,
      ${getRGBA(colors[0], 0.7)} 15%,
      transparent 30%)`
      }
    : {
        background:
          'linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 30%)'
      };

  const contentBgStyle = colors.length
    ? {
        backgroundColor: getRGBA(colors[0], 0.95)
      }
    : {
        backgroundColor: 'rgba(0, 0, 0, 0.9)'
      };

  const maxTagsAmount = 1;

  const textColorClass =
    colors.length && isLightColor(colors[0]) ? 'text-gray-800' : 'text-white';

  if (isLoading) {
    return (
      <Card className="h-80 w-full">
        <Skeleton className="aspect-square w-full" />
        <div className="space-y-2 p-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </Card>
    );
  }

  return (
    <Link href={`/dashboard/roadmaps/${id}`}>
      <Card className="group relative h-80 w-full overflow-hidden rounded-lg bg-card transition-all duration-200 hover:scale-[1.02] hover:shadow-xl">
        {/* Image Container */}
        <div className="relative aspect-square w-full overflow-hidden bg-muted">
          {/* Tags Overlay - Absolute positioned above image */}
          <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-wrap gap-2">
            {tags?.slice(0, maxTagsAmount).map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-black/50 text-xs text-white backdrop-blur-sm"
              >
                {tag.length > 15 ? tag.slice(0, 13) + '..' : tag}
              </Badge>
            ))}
            {tags && tags?.length > maxTagsAmount && (
              <Badge
                variant="secondary"
                className="bg-black/50 text-xs text-white backdrop-blur-sm"
              >
                +{tags.length - maxTagsAmount} more
              </Badge>
            )}
          </div>

          {/* Base Image */}
          <img
            src={finalThumbnailUrl!}
            alt={title}
            className="h-full w-full object-cover"
            onError={() => setCardState((prev) => ({ ...prev, error: true }))}
          />

          {/* Subtle gradient overlay at bottom */}
          <div className="absolute inset-0" style={gradientStyle} />

          {/* Timer Overlay */}
          <div className="absolute right-3 top-3 z-20">
            <TimerDial duration={estimatedDuration!} />
          </div>
        </div>

        {/* Content Container with solid background */}
        <div
          className={`relative h-full px-4 pb-4 ${textColorClass}`}
          style={contentBgStyle}
        >
          {/*/!* Topic Badge *!/*/}
          {/*<Badge*/}
          {/*  variant="secondary"*/}
          {/*  className="mb-2 bg-white/20 text-xs font-medium backdrop-blur-sm"*/}
          {/*>*/}
          {/*  {topic}*/}
          {/*</Badge>*/}

          {/* Title */}
          <p className="line-clamp-2 text-base font-bold">{title}</p>

          {/* Description */}
          <p
            className={`line-clamp-2 text-sm ${
              textColorClass === 'text-white'
                ? 'text-gray-200'
                : 'text-gray-600'
            }`}
          >
            {description}
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default CourseCard2;
