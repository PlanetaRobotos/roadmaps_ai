// src/store/useRoadmapStore.ts
import create from 'zustand';
import { ClientRoadmap } from '@/types/roadmap-types';
import { RoadmapCreateRequest } from '@/app/api/client';
import { createRoadmap } from '@/services/roadmapsService';
import { transformRoadmapToItems } from '@/utils/transformRoadmap';
import { API_BASE_URL } from '@/config/apiConfig';

interface RoadmapState {
  title: string;
  selectedTime: number | null;
  roadmapPreview: ClientRoadmap | null;
  isGenerating: boolean;
  setTitle: (title: string) => void;
  setSelectedTime: (time: number) => void;
  setRoadmapPreview: (preview: ClientRoadmap) => void;
  generateRoadmap: (
    userId: number | undefined
  ) => Promise<ClientRoadmap | null>;
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
  generateRoadmap: async (userId): Promise<ClientRoadmap | null> => {
    const { title, selectedTime } = get();
    if (!title || !selectedTime) {
      console.log('Cannot generate roadmap: Missing title or selected time.');
      return null;
    }

    console.log('Generating roadmap for:', title, selectedTime);

    set({ isGenerating: true });

    try {
      console.log('Creating roadmap... user:', userId);
      const requestBody = new RoadmapCreateRequest();
      requestBody.init({
        title: title,
        estimatedDuration: selectedTime,
        authorId: userId
      });

      const roadmapModel = await createRoadmap(requestBody);

      const cards = transformRoadmapToItems(roadmapModel);
      set({ roadmapPreview: cards });

      return cards;
    } catch (error) {
      console.error('Error generating roadmap:', error);
      alert('Failed to generate roadmap. Please try again.');
      return null;
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
