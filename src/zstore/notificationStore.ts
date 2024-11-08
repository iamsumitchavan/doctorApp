import { create } from 'zustand';

// Define the Zustand store
type CountState = {
  count: number;
  setCount: (newCount: number) => void; // Function to directly set the count
};

export const useCountStore = create<CountState>(set => ({
  // Initial state
  count: 0,

  // Function to set the count directly
  setCount: (newCount: number) => set(() => ({ count: newCount })),
}));
