// components/TokenBalance.tsx
import React from 'react';
import useTokenBalance from '../hooks/useTokenBalance';
import { Icons } from '@/components/icons';
import { SpinnerMinimalistic } from '@/components/helper-icon';

const TokenBalance = () => {
  const { tokens, loading, error } = useTokenBalance();

  return (
    <div className="flex h-full items-center justify-center px-2">
      {loading ? (
        <>
          <SpinnerMinimalistic className="mr-2" />
          <p>Loading tokens...</p>
        </>
      ) : error ? (
        <div className="text-error-500 flex items-center space-x-2">
          <Icons.error className="h-5 w-5 stroke-red-500" />
          <p className="text-secondary-foreground opacity-50">
            Error loading tokens.
          </p>
        </div>
      ) : (
        <p className="flex items-center font-bold">
          <Icons.wallet className="mr-2 h-5 w-5 stroke-blue-500" />
          {tokens === -1 ? 'Unlimited' : tokens}
        </p>
      )}
    </div>
  );
};

export default TokenBalance;
