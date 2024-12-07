// src/services/clients/RoadmapsClientProvider.tsx
'use client';

import React, { createContext, useContext } from 'react';
import { getRoadmapsClient } from './roadmapsClient';

const RoadmapsClientContext = createContext(getRoadmapsClient());

export const RoadmapsClientProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const roadmapsClient = getRoadmapsClient();
  return (
    <RoadmapsClientContext.Provider value={roadmapsClient}>
      {children}
    </RoadmapsClientContext.Provider>
  );
};

// Hook to access the client
export const useRoadmapsClient = () => {
  return useContext(RoadmapsClientContext);
};
