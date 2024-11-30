import { create } from "zustand";

export interface HTMLImageStore {
  data: Record<string, string | undefined>;
  selectedId?: string;
  loading: boolean;
  setLoading: (value: boolean) => void;
  selectImage: (threadId: string, messageId: string, imageURL?: string) => void;
  deselect: () => void;
}

export const ImageStore = create<HTMLImageStore>((set, get) => ({
  data: {},
  selectedId: undefined,
  loading: false,
  setLoading: (value: boolean) => {
    set({ loading: value });
  },
  selectImage: (threadId: string, messageId: string, imageURL?: string) => {
    get().deselect();
    const data = get().data;
    const key = `${threadId}.${messageId}`;

    if (!(key in data)) {
      data[key] = imageURL;
    }

    set({ selectedId: key });
  },
  deselect: () => {
    set({ selectedId: undefined });
  },
}));
