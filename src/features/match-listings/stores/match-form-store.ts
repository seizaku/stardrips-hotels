import { create } from "zustand";

interface MatchFormStore {
  selectedId?: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  setSelectedId: (value: string) => void;
}

const useMatchFormStore = create<MatchFormStore>((set) => ({
  selectedId: undefined,
  open: false,
  setOpen(value) {
    set({ open: value });
  },
  setSelectedId(value) {
    set({ selectedId: value });
  }
}));

export { useMatchFormStore };