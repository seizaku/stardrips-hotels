import { type Row } from "@tanstack/react-table";
import { create } from "zustand";
import { type Hotel } from "~/server/api/routers/hotels/router";

export interface TableStore {
  data: Hotel[];
  loading: boolean;
  setLoading: (value: boolean) => void;
  updateRow: (row: Row<Hotel>) => void;
  deleteRow: (row: Row<Hotel>) => void;
  refetch?: () => Promise<Hotel>;
  clear: () => void;
}

export const TableStore = create<TableStore>((set, get) => ({
  data: [],
  loading: false,
  setLoading: (value) => {
    set({ loading: value });
  },
  refetch: undefined,
  updateRow: (row) => {
    const data = get().data;
    const index = data?.findIndex((value) => value.email == row.original.email);
    if (index < 0) {
      data?.push(row.original);
      set({ data });
      return;
    }
    data[index] = row.original;
    set({ data });
  },
  deleteRow: (row) => {
    const data = get().data;
    const filter = data.filter((item) => item.email != row.original.email);
    set({ data: filter });
  },
  clear: () => {
    set({ data: [] });
  },
}));
