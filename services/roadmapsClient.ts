// src/services/clients/roadmapsClient.ts
import { RoadmapsClient } from '@/app/api/client';
import { API_BASE_URL } from '@/config/apiConfig';

let roadmapsClient: RoadmapsClient | null = null;

export const getRoadmapsClient = () => {
  if (!roadmapsClient) {
    roadmapsClient = new RoadmapsClient(API_BASE_URL);
  }
  return roadmapsClient;
};
