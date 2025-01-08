'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// import {getRandomElementFromArray} from "@/lib/utils";
// import { MdMoreVert } from 'react-icons/md';
// import { FiPlay } from 'react-icons/fi';
// import IconButton from '@/components/elements/button/iconButton';
// import usePlayerState from '@/hooks/usePlayerState';
import { createSecretKey } from 'node:crypto';
import { IRoadmapModel } from '@/app/api/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TimerDial from '@/components/ui/timer-dial';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const PlayListCard = (props: IRoadmapModel) => {
  const {
    id,
    tags,
    estimatedDuration,
    title,
    description,
    likes,
    authorId,
    topic
  } = props;
  const { push } = useRouter();

  return (
    <Link href={`/dashboard/roadmaps/${id}`}>
      <Card className="group relative min-h-[17rem] overflow-hidden rounded-xl border border-border bg-card shadow-lg transition-shadow duration-200 hover:shadow-xl">
        {/* Timer Icon */}
        <div className="absolute right-2 top-2 z-10">
          <TimerDial duration={estimatedDuration!} />
        </div>

        {/* Header */}
        <CardHeader className="p-6">
          <CardTitle className="line-clamp-2 text-lg font-bold text-foreground group-hover:text-primary">
            {title}
          </CardTitle>
        </CardHeader>

        {/* Content */}
        <CardContent className="px-4">
          {/* Description */}
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {description}
          </p>

          {/* Tags */}
          <div className="relative mt-3">
            <div className="flex max-h-[3.5rem] flex-wrap gap-2 overflow-hidden">
              {tags?.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="max-w-[15ch] whitespace-nowrap"
                >
                  {tag.length > 15 ? tag.slice(0, 13) + '..' : tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 pb-4">
          {/* Topic */}
          <span className="text-xs font-medium text-muted-foreground">
            Topic: {topic}
          </span>

          {/* View Details Button */}
          <Button variant="ghost" className="bg-primary/20" size="sm">
            View Details
          </Button>
        </div>
      </Card>
    </Link>
  );
};

export default PlayListCard;
