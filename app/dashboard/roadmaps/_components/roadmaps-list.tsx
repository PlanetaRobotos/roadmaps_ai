import RoadmapCard from './roadmap-card';
import { RoadmapModel } from '@/app/api/client';

interface RoadmapsListProps {
  roadmaps: RoadmapModel[];
  loading?: boolean;
  emptyMessage?: string;
}

export default function RoadmapsList({
  roadmaps,
  loading = false,
  emptyMessage = 'No roadmaps available.'
}: RoadmapsListProps) {
  return loading ? (
    <div>Loading...</div>
  ) : roadmaps.length === 0 ? (
    <div>{emptyMessage}</div>
  ) : (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {roadmaps.map((roadmap, index) =>
        roadmap ? (
          <RoadmapCard
            key={index}
            id={roadmap.id!}
            title={roadmap.title!}
            description={roadmap.description!}
            topic={roadmap.topic!}
            estimatedDuration={roadmap.estimatedDuration!}
            tags={roadmap.tags!}
          />
        ) : null
      )}
    </div>
  );
}
