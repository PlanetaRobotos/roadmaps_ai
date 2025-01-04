// store/editStore.ts
import { create } from 'zustand';
import { EditingState } from '@/types/editState'; // Adjust the import path accordingly

interface EditState {
  editingState: EditingState;
  setEditingState: (state: EditingState) => void;
}

export const useEditStore = create<EditState>((set) => ({
  editingState: EditingState.Idle,
  setEditingState: (state: EditingState) => set({ editingState: state })
}));
