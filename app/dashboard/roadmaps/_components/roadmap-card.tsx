import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import TimerDial from '@/components/ui/timer-dial';
import { RoadmapModel } from '@/app/api/client';
import Link from 'next/link';

type RoadmapCardProps = Omit<RoadmapModel, 'init' | 'toJSON'>;

export default function RoadmapCard({
  id,
  title,
  description,
  topic,
  estimatedDuration,
  tags
}: RoadmapCardProps) {
  return (
    <Link href={`/dashboard/roadmaps/${id}`}>
      <Card className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-lg transition-shadow duration-200 hover:shadow-xl">
        {/* Timer Icon */}
        <div className="absolute right-2 top-2 z-10">
          <TimerDial duration={estimatedDuration!} />
        </div>

        {/* Header */}
        <CardHeader className="p-4">
          <CardTitle className="truncate text-lg font-bold text-foreground group-hover:text-primary">
            {title}
          </CardTitle>
        </CardHeader>

        {/* Content */}
        <CardContent className="p-4">
          {/* Description */}
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {description}
          </p>

          {/* Tags */}
          <div className="mt-3 flex flex-wrap gap-2">
            {tags?.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 pb-4">
          {/* Topic */}
          <span className="text-xs font-medium text-muted-foreground">
            Topic: {topic}
          </span>

          {/* View Details Button */}
          {/*<Link href={`/dashboard/roadmaps/${id}`}>*/}
          <Button variant="ghost" size="sm">
            View Details
          </Button>
          {/*</Link>*/}
        </div>
      </Card>
    </Link>
  );
}
