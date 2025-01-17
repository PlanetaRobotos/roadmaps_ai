import { create } from 'zustand';

interface ContactDialogStore {
  isOpen: boolean;
  email: string;
  open: (email?: string) => void;
  close: () => void;
}

export const useContactDialog = create<ContactDialogStore>((set) => ({
  isOpen: false,
  email: 'myrskyi.work@gmail.com', // default email
  open: (email) => set({ isOpen: true, ...(email && { email }) }),
  close: () => set({ isOpen: false })
}));
