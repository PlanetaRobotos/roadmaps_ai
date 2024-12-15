// src/store/useRoadmapStore.ts
import create from 'zustand';
import { ClientRoadmap } from '@/types/roadmap-types';
import { RoadmapCreateRequest } from '@/app/api/client';
import {
  createRoadmap,
  getLessonById,
  updateLessonStatus
} from '@/services/roadmapsService';
import { transformRoadmapToItems } from '@/utils/transformRoadmap';

interface RoadmapState {
  title: string;
  selectedTime: number | null;
  roadmapPreview: ClientRoadmap | null;
  isGenerating: boolean;
  setTitle: (title: string) => void;
  setSelectedTime: (time: number) => void;
  setRoadmapPreview: (preview: ClientRoadmap) => void;
  generateRoadmap: () => void;
  reset: () => void;
  // toggleLessonCompletion: (
  //   roadmapId: string,
  //   lessonId: string,
  //   completed: boolean
  // ) => void;
}

export const useRoadmapStore = create<RoadmapState>((set, get) => ({
  title: '',
  selectedTime: null,
  roadmapPreview: null,
  isGenerating: false,
  setTitle: (title: string) => set({ title }),
  setSelectedTime: (time: number) => set({ selectedTime: time }),
  setRoadmapPreview: (preview: ClientRoadmap) =>
    set({ roadmapPreview: preview }),
  generateRoadmap: async () => {
    const { title, selectedTime } = get();
    if (!title || !selectedTime) {
      console.log('Cannot generate roadmap: Missing title or selected time.');
      return;
    }

    console.log('Generating roadmap for:', title, selectedTime);

    set({ isGenerating: true });

    try {
      const requestBody = new RoadmapCreateRequest();
      requestBody.init({
        title: title,
        estimatedDuration: selectedTime
      });

      console.log('Start Roadmap gen');

      const roadmap = await createRoadmap(requestBody);

      for (const mod of roadmap.modules!) {
        for (const lesson of mod.lessons!) {
          console.log('Lesson:', lesson.title);

          const result = await getLessonById(lesson.id!);
        }
      }

      console.log('Roadmap generated', roadmap);

      const items = transformRoadmapToItems(roadmap);
      set({ roadmapPreview: items });
    } catch (error) {
      console.error('Error generating roadmap:', error);
      alert('Failed to generate roadmap. Please try again.');
    } finally {
      set({ isGenerating: false });
    }
  },
  reset: () =>
    set({
      title: '',
      selectedTime: null,
      roadmapPreview: null,
      isGenerating: false
    })
  // toggleLessonCompletion: async (roadmapId, lessonId, completed) => {
  //   try {
  //     console.log(
  //       'Start toggle lesson completion:',
  //       roadmapId,
  //       lessonId,
  //       completed
  //     );
  //
  //     await updateLessonStatus(roadmapId, lessonId, completed);
  //
  //     console.log('Lesson completion updated:', lessonId, completed);
  //
  //     // Update the roadmap with modified lessons
  //     // set();
  //   } catch (error) {
  //     console.error('Error with update lesson completion', error);
  //     alert('Failed to update lesson completion. Please try again.');
  //   } finally {
  //     set({ isGenerating: false });
  //   }
  // }
}));
