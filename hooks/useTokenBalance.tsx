// hooks/useTokenBalance.tsx
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';

const useTokenBalance = () => {
  const [tokens, setTokens] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await axios.get('/v1/tokens/balance');
        setTokens(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  return { tokens, loading, error };
};

export default useTokenBalance;
