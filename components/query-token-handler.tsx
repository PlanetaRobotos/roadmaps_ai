'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export function QueryTokenHandler({
  onToken
}: {
  onToken: (token: string) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const queryToken = searchParams.get('token');
    if (queryToken) {
      onToken(queryToken);
    }
  }, [searchParams, onToken]);

  return null;
}
