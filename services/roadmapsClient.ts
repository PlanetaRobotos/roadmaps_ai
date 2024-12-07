// src/services/clients/roadmapsClient.ts
import { RoadmapsClient } from '@/app/api/client';
import { LessonsClient } from '@/app/api/client';
import { API_BASE_URL } from '@/config/apiConfig';

let roadmapsClient: RoadmapsClient | null = null;
let lessonsClient: LessonsClient | null = null;

export const getRoadmapsClient = () => {
  if (!roadmapsClient) {
    roadmapsClient = new RoadmapsClient(API_BASE_URL);
  }
  return roadmapsClient;
};

export const getLessonsClient = () => {
  if (!lessonsClient) {
    lessonsClient = new LessonsClient(API_BASE_URL);
  }
  return lessonsClient;
};
