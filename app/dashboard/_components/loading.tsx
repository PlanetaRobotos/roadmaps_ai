// app/dashboard/_components/loading.tsx
import React from 'react';
import { SpinnerBig } from '@/components/helper-icon';

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center">
        <SpinnerBig />
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
};

export default Loading;
