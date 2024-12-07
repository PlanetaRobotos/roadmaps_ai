import { getLessonsClient, getRoadmapsClient } from '@/services/roadmapsClient';
import { RoadmapUpdateRequest } from '@/app/api/client';

export const getRoadmapById = async (id: string) => {
  return await getRoadmapsClient().getById(id);
};

export const updateLessonStatus = async (
  roadmapId: string,
  lessonId: string,
  completed: boolean
) => {
  const requestBody = new RoadmapUpdateRequest();
  requestBody.init({
    lessonId: lessonId,
    lessonCompleted: completed
  });

  return await getRoadmapsClient().update(roadmapId, requestBody);
};

export const getLessonById = async (lessonId: string) => {
  return await getLessonsClient().getById(lessonId);
};
