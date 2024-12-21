import {
  LessonsClientInst,
  RoadmapsClientInst,
  UserClientInst
} from '@/services/roadmapsClient';
import {
  RoadmapCreateRequest,
  RoadmapUpdateRequest,
  UserCreateRequest,
  UserQuizResultUpdateRequest
} from '@/app/api/client';

export const getRoadmapById = async (id: string) => {
  console.log('id', id);

  return await RoadmapsClientInst().getById(id);
};

export const createRoadmap = async (roadmap: RoadmapCreateRequest) => {
  return await RoadmapsClientInst().create(roadmap);
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

  return await RoadmapsClientInst().update(roadmapId, requestBody);
};

export const getLessonById = async (lessonId: string) => {
  return await LessonsClientInst().getById(lessonId);
};

export const addUser = async (
  userId: string,
  name: string,
  email: string,
  provider: string
) => {
  const request = new UserCreateRequest();
  //TODO finish with right data
  request.init({
    userId: userId,
    name: name,
    email: email,
    provider: provider
  });
  await UserClientInst().create(request);
};

export const getAllRoadmaps = async () => {
  try {
    const result = await RoadmapsClientInst().filter(
      undefined, // search
      undefined, // includeColumns
      undefined, // filters
      undefined, // sorts
      undefined, // page
      undefined // pageSize
    );

    return result;
  } catch (error) {
    console.error('Error fetching all roadmaps:', error);
    throw error;
  }
};

export const getUserRoadmaps = async (userId: number) => {
  try {
    const result = await UserClientInst().getUserRoadmaps(
      userId,
      undefined,
      undefined, // search
      undefined, // includeColumns
      undefined, // filters
      undefined, // sorts
      undefined, // page
      undefined // pageSize
    );

    console.log('User roadmaps:', result);
    const roadmaps = result.data!.map((userRoadmap) => userRoadmap.roadmap!);
    return roadmaps;
  } catch (error) {
    console.error('Error fetching user roadmaps:', error);
    throw error;
  }
};

export const getUserQuizzes = async (userId: number) => {
  try {
    const result = await UserClientInst().getUserQuizzes(
      userId,
      undefined,
      undefined, // search
      undefined, // includeColumns
      undefined, // filters
      undefined, // sorts
      undefined, // page
      undefined // pageSize
    );

    console.log('User quizzes:', result);
    const quizzes = result.data!;
    return quizzes;
  } catch (error) {
    console.error('Error fetching user roadmaps:', error);
    throw error;
  }
};

export const updateQuizStatus = async (
  userId: number,
  quizId: string,
  selectedIndex: number
) => {
  const requestBody = new UserQuizResultUpdateRequest();
  requestBody.init({
    quizId: quizId,
    answerIndex: selectedIndex
  });

  return await UserClientInst().updateUserQuiz(userId, quizId, requestBody);
};
