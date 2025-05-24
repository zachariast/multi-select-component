import { create } from 'zustand';

interface MultiSelectState {
  options: string[];
  query: string;
  selected: string[];
  fetchOptions: () => Promise<void>;
  setQuery: (query: string) => void;
}

export const useMultiSelectStore = create<MultiSelectState>((set) => ({
  options: [],
  query: '',
  selected: [],
  setQuery: (query) => set({ query }),
  fetchOptions: async () => {
    try {
      const response = await fetch('/items.json');
      const { data } = await response.json();
      
      set({ options: data.sort((a: string, b: string) => a.localeCompare(b)) });
    } catch (err) {
      console.error('Failed to fetch selected options:', err);
    }
  },
}));
