// src/services/clients/RoadmapsClientProvider.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { RoadmapsClientInst } from './roadmapsClient';
import { RoadmapsClient } from '@/app/api/client';

const RoadmapsClientContext = createContext<RoadmapsClient | undefined>(
  undefined
);

export const RoadmapsClientProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [roadmapsClient, setRoadmapsClient] = useState<RoadmapsClient | null>(
    null
  );

  useEffect(() => {
    const client = RoadmapsClientInst();
    setRoadmapsClient(client);
  }, []);

  if (!roadmapsClient) {
    return null; // Optionally, return a loading indicator here
  }

  return (
    <RoadmapsClientContext.Provider value={roadmapsClient}>
      {children}
    </RoadmapsClientContext.Provider>
  );
};

// Hook to access the client
export const useRoadmapsClient = () => {
  const context = useContext(RoadmapsClientContext);
  if (!context) {
    throw new Error(
      'useRoadmapsClient must be used within a RoadmapsClientProvider'
    );
  }
  return context;
};
