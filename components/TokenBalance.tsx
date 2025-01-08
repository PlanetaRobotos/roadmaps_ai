// components/TokenBalance.tsx
import React, { useEffect, useRef } from 'react';
import useTokenBalance from '../hooks/useTokenBalance';
import { Icons } from '@/components/icons';
import { SpinnerMinimalistic } from '@/components/helper-icon';
import CountUp from 'react-countup';
import { motion, AnimatePresence } from 'framer-motion';

const TokenBalance = () => {
  const { tokens, loading, error } = useTokenBalance();
  const prevTokensRef = useRef<number>(tokens);

  useEffect(() => {
    prevTokensRef.current = tokens;
  }, [tokens]);

  const getAnimation = () => {
    const prevTokens = prevTokensRef.current;
    if (tokens === -1) return null;
    if (prevTokens === -1) return { start: 0, end: tokens };
    if (tokens > prevTokens) {
      return { start: prevTokens, end: tokens };
    } else if (tokens < prevTokens) {
      return { start: prevTokens, end: tokens };
    }
    return null;
  };

  const animation = getAnimation();

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
          {tokens === -1 ? (
            'Unlimited'
          ) : animation ? (
            <AnimatePresence mode="wait">
              <motion.span
                key={tokens}
                initial={{
                  opacity: 0,
                  y: animation.end > animation.start ? -10 : 10
                }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: animation.end > animation.start ? 10 : -10
                }}
                transition={{ duration: 0.5 }}
              >
                <CountUp
                  start={animation.start}
                  end={animation.end}
                  duration={0.5}
                  preserveValue
                />
              </motion.span>
            </AnimatePresence>
          ) : (
            tokens
          )}
        </p>
      )}
    </div>
  );
};

export default TokenBalance;
