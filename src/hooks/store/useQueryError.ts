import { create } from "zustand";

interface ErrorState {
  errors: string[];
  addError: (error: string) => void;
  removeError: (error: string) => void;
  clearErrors: () => void;
}

const useQueryError = create<ErrorState>((set) => ({
  errors: [],

  addError: (error) => {
    set((state) => ({
      errors: [...state.errors, error],
    }));
  },

  removeError: (error) => {
    set((state) => ({
      errors: state.errors.filter((e) => e !== error),
    }));
  },

  clearErrors: () => set({ errors: [] }),
}));

export default useQueryError;
