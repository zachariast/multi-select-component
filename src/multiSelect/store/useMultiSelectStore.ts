import { create } from 'zustand';

interface MultiSelectState {
  options: string[];
  filteredOptions: string[];
  query: string;
  selectedOptions: string[];
  fetchOptions: () => Promise<void>;
  setQuery: (query: string) => void;
  toggleSelected: (value: string) => void;
  isLoading: boolean;
}

/**
 * 
 * @description This function creates a temporary textarea element, sets its innerHTML to the provided HTML string,
 * and then retrieves the decoded value from the textarea's value property.
 * @param html string containing HTML entities
 * @returns string with HTML entities decoded
 */
function decodeHtml(html:string): string {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

export const useMultiSelectStore = create<MultiSelectState>((set, get) => ({
  options: [],
  filteredOptions: [],
  selectedOptions: [],
  query: '',
  isLoading: false,
  setQuery: (value) => {
    const { options }  = get();
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    set({ query: value, filteredOptions: filtered });
  },
  toggleSelected: (listItem) => set((state) => {
    const selectedOptions = state.selectedOptions.includes(listItem)
      ? state.selectedOptions.filter((selectedOption) => selectedOption !== listItem)
      : [...state.selectedOptions, listItem];
    return { selectedOptions };
  }),
  fetchOptions: async (): Promise<void> => {
    try {
      set({ isLoading: true });
      const response = await fetch('/items.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const { data } = await response.json();
      const decoded = data.map(decodeHtml);
      const sorted = decoded.sort((a: string, b: string) => a.localeCompare(b))

      set({ options: sorted, filteredOptions: sorted, isLoading: false });
    } catch (err) {
      set({ isLoading: false })
      console.error('Failed to fetch selected options:', err);
    }
  },
}));
