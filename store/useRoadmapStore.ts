// src/store/useRoadmapStore.ts
import create from 'zustand';
import { ClientRoadmap } from '@/types/roadmap-types';
import { RoadmapCreateRequest } from '@/app/api/client';
import { transformRoadmapToItems } from '@/utils/transformRoadmap';
import { toast } from 'sonner';
import axios from '@/lib/axios';

interface RoadmapState {
  title: string;
  selectedTime: number | null;
  price: number;
  roadmapPreview: ClientRoadmap | null;
  isGenerating: boolean;
  setTitle: (title: string) => void;
  setSelectedTime: (time: number) => void;
  setRoadmapPreview: (preview: ClientRoadmap) => void;
  setPrice: (price: number) => void;
  generateRoadmap: (
    userId: number | undefined,
    isTest: boolean
  ) => Promise<ClientRoadmap | null>;
  reset: () => void;
}

export const useRoadmapStore = create<RoadmapState>((set, get) => ({
  title: '',
  selectedTime: null,
  price: 0,
  roadmapPreview: null,
  isGenerating: false,
  setTitle: (title: string) => set({ title }),
  setSelectedTime: (time: number) => set({ selectedTime: time }),
  setRoadmapPreview: (preview: ClientRoadmap) =>
    set({ roadmapPreview: preview }),
  setPrice: (price: number) => set({ price }),
  generateRoadmap: async (userId, isTest): Promise<ClientRoadmap | null> => {
    const { title, selectedTime, price } = get();
    if (!title || !selectedTime) {
      console.log('Cannot generate roadmap: Missing title or selected time.');
      return null;
    }

    console.log('Generating roadmap for:', title, selectedTime);

    set({ isGenerating: true });

    try {
      console.log('Creating roadmap... user:', userId, 'price', price);
      const requestBody = new RoadmapCreateRequest();
      requestBody.init({
        title: title,
        estimatedDuration: selectedTime,
        authorId: userId,
        price: price,
        isTest: isTest,
        withThumbnail: false
      });

      const roadmapModel = await axios.post('v1/roadmaps', requestBody);

      const cards = transformRoadmapToItems(roadmapModel.data);
      set({ roadmapPreview: cards });

      return cards;
    } catch (error) {
      console.error('Error generating roadmap:', error);
      toast('Failed to generate roadmap. Please try again.');
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
