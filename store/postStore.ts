import { create } from 'zustand';
import axios from '@/lib/axios';
import { RoadmapUpdateRequest } from '@/app/api/client';
import { toast } from 'sonner';
import { RoadmapsClientInst } from '@/services/roadmapsClient';

interface PostStoreState {
  isLiked: boolean;
  likeCount: number;
  isSaved: boolean;
}

interface PostStoreActions {
  /** Set or reset the store with fresh data (e.g. on page load) */
  initializePost: (
    isLiked: boolean,
    likeCount: number,
    isSaved?: boolean
  ) => void;

  /** Toggle isLiked state and update the backend */
  toggleLike: (roadmapId: string, userId: number) => Promise<void>;

  /** Toggle isSaved (and optionally update the backend) */
  toggleSave: (roadmapId: string, userId: number) => Promise<void>;
}

type PostStore = PostStoreState & PostStoreActions;

export const usePostStore = create<PostStore>((set, get) => ({
  // ----- State -----
  isLiked: false,
  likeCount: 0,
  isSaved: false,

  // ----- Actions -----

  /** Initialize the store from server data on page load */
  initializePost: (isLiked, likeCount, isSaved = false) => {
    set({ isLiked, likeCount, isSaved });
  },

  toggleLike: async (roadmapId: string, userId: number) => {
    const { isLiked, likeCount } = get();

    // Optimistic update
    const newIsLiked = !isLiked;
    const newLikeCount = isLiked ? likeCount - 1 : likeCount + 1;
    set({ isLiked: newIsLiked, likeCount: newLikeCount });

    try {
      await axios.put(`/v1/roadmaps/${roadmapId}`, { likes: newLikeCount });

      if (!isLiked) {
        await axios.post(`/v1/roadmaps/userlikes`, {
          userId: userId,
          roadmapId: roadmapId
        });
      } else {
        await axios.delete(`/v1/roadmaps/${roadmapId}/userlikes/${userId}`);
      }
    } catch (error) {
      console.error('toggleLike failed:', error);
      toast.error('Failed to update like status.');

      set({ isLiked, likeCount });
    }
  },

  /** Toggle isSaved. Optionally call an API to store bookmark status. */
  toggleSave: async (roadmapId: string, userId: number) => {
    const { isSaved } = get();

    // Optimistic update
    const newIsSaved = !isSaved;
    set({ isSaved: newIsSaved });

    try {
      if (isSaved) {
        //remove user roadmap
        await axios.delete(`/v1/users/${userId}/roadmaps/${roadmapId}`);
      } else {
        //add user roadmap
        await axios.post(`/v1/users/${userId}/roadmaps/${roadmapId}`);
      }
    } catch (error) {
      console.error('toggleSave failed:', error);
      toast.error('Failed to update save status.');

      set({ isSaved });
    }
  }
}));
