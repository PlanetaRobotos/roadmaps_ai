import RoadmapCard from './roadmap-card';
// import { mockRoadmaps } from './mockRoadmaps';
import { useEffect, useState } from 'react';
import { RoadmapModel } from '@/app/api/client';
import { useRoadmapsClient } from '@/services/RoadmapsClientProvider';

export default function RoadmapsList() {
  const [roadmaps, setRoadmaps] = useState<RoadmapModel[]>([]);
  const [loading, setLoading] = useState(true);
  const roadmapsClient = useRoadmapsClient();

  useEffect(() => {
    async function fetchRoadmaps() {
      try {
        const response = await roadmapsClient.filter(
          undefined, // search
          undefined, // includeColumns
          undefined, // filters
          undefined, // sorts
          undefined, // page
          undefined // pageSize
        );
        if (response.data) setRoadmaps(response.data);
      } catch (error) {
        console.error('Error fetching:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchRoadmaps();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!roadmaps.length) return <div>No roadmaps available.</div>;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {roadmaps.map((roadmap) => (
        <RoadmapCard
          key={roadmap.id!}
          id={roadmap.id!}
          title={roadmap.title!}
          description={roadmap.description!}
          topic={roadmap.topic!}
          difficulty={roadmap.difficulty!}
          estimatedDuration={roadmap.estimatedDuration!}
          tags={roadmap.tags!}
        />
      ))}
    </div>
  );
}
