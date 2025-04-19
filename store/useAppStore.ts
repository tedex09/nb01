import { create } from 'zustand';

interface AppState {
  searchQuery: string;
  selectedCard: string | null;
  lastUpdate: { [key: string]: string };
  setSearchQuery: (query: string) => void;
  setSelectedCard: (card: string | null) => void;
  updateLastUpdate: (card: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  searchQuery: '',
  selectedCard: null,
  lastUpdate: {},
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCard: (card) => set({ selectedCard: card }),
  updateLastUpdate: (card) => set((state) => ({
    lastUpdate: {
      ...state.lastUpdate,
      [card]: new Date().toLocaleString()
    }
  }))
}));