import { useEffect, useState } from 'react';
import { getPaths } from '@/shared/api'; // Example API call
import Link from 'next/link';

export default function PathsPage() {
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    async function fetchPaths() {
      const data = await getPaths();
      setPaths(data);
    }
    fetchPaths();
  }, []);

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="mb-6 text-2xl font-bold">Your Learning Paths</h1>
      {paths.map((path) => (
        <div key={path.id} className="mb-4">
          <Link href={`/paths/${path.id}`}>
            <a className="text-blue-500 underline">{path.topic}</a>
          </Link>
        </div>
      ))}
    </div>
  );
}
