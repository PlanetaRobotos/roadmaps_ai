import RoadmapCard from './roadmap-card';
import { mockRoadmaps } from './mockRoadmaps';
import { useEffect, useState } from 'react';
import { RoadmapsClient, RoadmapModel } from '@/app/api/client';

const roadmapsClient = new RoadmapsClient('http://localhost:5501');

export default function RoadmapsList() {
  // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  //   {mockRoadmaps.map((roadmap) => (
  //     <RoadmapCard key={roadmap.id} {...roadmap} />
  //   ))}
  // </div>

  const [roadmaps, setRoadmaps] = useState<RoadmapModel[]>([]);
  const [loading, setLoading] = useState(true);

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
          created={roadmap.created!}
        />
      ))}
    </div>
  );
}
