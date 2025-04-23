import { create } from 'zustand';

interface CarouselState {
  focusedIndices: Record<number, number>;
  setFocusedIndex: (rowIndex: number, index: number) => void;
}

export const useCarouselStore = create<CarouselState>((set) => ({
  focusedIndices: {},
  setFocusedIndex: (rowIndex, index) =>
    set((state) => ({
      focusedIndices: { ...state.focusedIndices, [rowIndex]: index },
    })),
}));