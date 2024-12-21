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
import { useRouter } from 'next/navigation';

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

      const roadmapModel = await createRoadmap(requestBody);

      const cards = transformRoadmapToItems(roadmapModel);
      set({ roadmapPreview: cards });
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
}));
