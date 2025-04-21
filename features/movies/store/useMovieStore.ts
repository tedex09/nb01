import { create } from 'zustand';

interface MovieState {
  focusedId: string | null;
  selectedId: string | null;
  setFocusedId: (id: string | null) => void;
  setSelectedId: (id: string | null) => void;
}

export const useMovieStore = create<MovieState>((set) => ({
  focusedId: null,
  selectedId: null,
  setFocusedId: (id) => set({ focusedId: id }),
  setSelectedId: (id) => set({ selectedId: id }),
}));