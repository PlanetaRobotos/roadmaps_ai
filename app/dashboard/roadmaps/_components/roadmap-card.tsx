import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RoadmapModel } from '@/app/api/client';
import Link from 'next/link';

type RoadmapCardProps = Omit<RoadmapModel, 'init' | 'toJSON'>;

export default function RoadmapCard({
  id,
  title,
  description,
  topic,
  difficulty,
  estimatedDuration,
  tags
}: RoadmapCardProps) {
  return (
    <Link href={`/dashboard/roadmaps/${id}`}>
      <Card className="cursor-pointer">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-1xl font-bold">{description}</div>
          <p className="text-xs text-muted-foreground">Topic: {topic}</p>
          <p className="text-xs text-muted-foreground">
            Difficulty: {difficulty}
          </p>
          <p className="text-xs text-muted-foreground">
            Estimated Duration: {estimatedDuration} hours
          </p>
          <p className="text-xs text-muted-foreground">
            Tags: {tags?.join(', ')}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
