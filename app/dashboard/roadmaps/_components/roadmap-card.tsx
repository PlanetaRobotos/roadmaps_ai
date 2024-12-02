import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RoadmapModel } from '@/app/api/client';

type RoadmapCardProps = Omit<RoadmapModel, 'init' | 'toJSON'>;

export default function RoadmapCard({
  id,
  title,
  description,
  created
}: RoadmapCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-1xl font-bold">{description}</div>
        <p className="text-xs text-muted-foreground">
          Created at: {created?.toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}
