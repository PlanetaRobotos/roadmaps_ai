// Dynamic route for a specific pathimport GeneratedPath from "../../create-path/components/GeneratedPath";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getPathById } from '@/shared/api';
import GeneratedPath from '../../create-path/_components/generated-path';

export default function PathDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [path, setPath] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchPath = async () => {
        const data = await getPathById(id);
        setPath(data);
      };
      fetchPath();
    }
  }, [id]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      {path ? <GeneratedPath path={path} /> : <p>Loading...</p>}
    </div>
  );
}
