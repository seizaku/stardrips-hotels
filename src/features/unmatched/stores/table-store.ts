import { create } from "zustand";

export interface TableStore {
  page: number;
  setPage: (value: number) => void;
}

export const TableStore = create<TableStore>((set, get) => ({
  page: 1,
  setPage: (value) => {
    set({ page: value });
  },
}));
