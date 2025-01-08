// hooks/useTokenBalance.tsx

import { useToken } from '@/context/token-context';

const useTokenBalance = () => {
  const { tokens, loading, error, setTokens, updateTokens } = useToken();

  return { tokens, loading, error, setTokens, updateTokens };
};

export default useTokenBalance;
