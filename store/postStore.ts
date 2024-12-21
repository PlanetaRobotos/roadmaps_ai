import { create } from 'zustand';

interface Actions {
  isLiked: boolean;
  likeCount: number;
  isSaved: boolean;
  toggleLike: () => void;
  toggleSave: () => void;
}

export const usePostStore = create<Actions>((set) => ({
  isLiked: false,
  likeCount: 0,
  isSaved: false,
  toggleLike: () =>
    set((state) => ({
      isLiked: !state.isLiked,
      likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1
    })),
  toggleSave: () =>
    set((state) => ({
      isSaved: !state.isSaved
    }))
}));
