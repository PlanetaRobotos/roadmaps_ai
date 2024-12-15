// src/services/clients/roadmapsClient.ts

import { RoadmapsClient, UsersClient } from '@/app/api/client';
import { LessonsClient } from '@/app/api/client';
import { API_BASE_URL } from '@/config/apiConfig';

let roadmapsClient: RoadmapsClient | null = null;
let lessonsClient: LessonsClient | null = null;
let userClient: UsersClient | null = null;

export const RoadmapsClientInst = () => {
  if (!roadmapsClient) {
    roadmapsClient = new RoadmapsClient(API_BASE_URL);
  }
  return roadmapsClient;
};

export const LessonsClientInst = () => {
  if (!lessonsClient) {
    lessonsClient = new LessonsClient(API_BASE_URL);
  }
  return lessonsClient;
};

export const UserClientInst = () => {
  if (!userClient) {
    userClient = new UsersClient(API_BASE_URL);
  }
  return userClient;
};
