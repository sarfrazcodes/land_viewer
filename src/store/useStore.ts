import { create } from 'zustand';
import { ComparisonEntry } from '../lib/mockData';

interface StoreState {
  entries: ComparisonEntry[];
  isLoading: boolean;
  fetchEntries: () => Promise<void>;
  addEntry: (entry: ComparisonEntry) => void;
}

export const useStore = create<StoreState>((set) => ({
  entries: [],
  isLoading: false,

  fetchEntries: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch('/api/comparisons');
      if (!res.ok) throw new Error('Failed to fetch');
      const data: ComparisonEntry[] = await res.json();
      set({ entries: data });
    } catch (err) {
      console.error('fetchEntries error:', err);
    } finally {
      set({ isLoading: false });
    }
  },

  // Optional: optimistic add after POST
  addEntry: (entry) =>
    set((state) => ({ entries: [entry, ...state.entries] })),
}));
