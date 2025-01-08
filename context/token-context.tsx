// context/TokenContext.tsx

'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from 'react';
import axios from '@/lib/axios';
import { toast } from 'sonner';

interface TokenContextProps {
  tokens: number;
  loading: boolean;
  error: string | null;
  setTokens: (newTokens: number) => void;
  updateTokens: (newTokens: number) => void;
}

const TokenContext = createContext<TokenContextProps | undefined>(undefined);

export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [tokens, setTokensState] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTokens = async () => {
    try {
      const response = await axios.get('/v1/tokens/balance');
      setTokensState(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  const updateTokens = (newTokens: number) => {
    if (tokens !== -1) {
      setTokens(newTokens);
    }
  };

  const setTokens = (newTokens: number) => {
    setTokensState(newTokens);
  };

  return (
    <TokenContext.Provider
      value={{ tokens, loading, error, setTokens, updateTokens }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
};
