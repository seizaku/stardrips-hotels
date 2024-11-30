import { create } from "zustand";
import { type Email } from "~/server/api/routers/emails/router";

export interface EmailQueryStore {
  data: Email[];
  page: number;
  loading: boolean;
  setLoading: (value: boolean) => void;
  setPage: (value: number) => void;
  appendData: (values: Email[]) => void;
}

export const EmailStore = create<EmailQueryStore>((set, get) => ({
  data: [],
  page: 1,
  loading: false,
  setLoading: (value) => {
    set({ loading: value });
  },
  setPage: (value) => {
    set({ page: value });
  },
  appendData: (values) => {
    const data = get().data;
    set({ data: [...data, ...values] });
  },
}));
