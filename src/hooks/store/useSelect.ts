import { create } from "zustand";

interface SelectionState {
  selected: Record<string, string[]>; // tableKey → selected ids
  toggleSelection: (tableKey: string, id: string) => void;
  isSelected: (tableKey: string, id: string) => boolean;
  selectAll: (tableKey: string, ids: string[]) => void;
  deselectAll: (tableKey: string, ids: string[]) => void;
  clearAll: (tableKey: string) => void;
}

const useSelectionStore = create<SelectionState>((set, get) => ({
  selected: {},

  toggleSelection: (tableKey, id) => {
    const current = get().selected[tableKey] || [];
    const exists = current.includes(id);
    const updated = exists ? current.filter((i) => i !== id) : [...current, id];
    set((state) => ({
      selected: {
        ...state.selected,
        [tableKey]: updated,
      },
    }));
  },

  isSelected: (tableKey, id) => {
    return (get().selected[tableKey] || []).includes(id);
  },

  selectAll: (tableKey, ids) => {
    set((state) => ({
      selected: {
        ...state.selected,
        [tableKey]: [...new Set([...(state.selected[tableKey] || []), ...ids])],
      },
    }));
  },

  deselectAll: (tableKey, ids) => {
    set((state) => ({
      selected: {
        ...state.selected,
        [tableKey]: (state.selected[tableKey] || []).filter(
          (id) => !ids.includes(id)
        ),
      },
    }));
  },

  clearAll: (tableKey) => {
    set((state) => ({
      selected: {
        ...state.selected,
        [tableKey]: [],
      },
    }));
  },
}));

export default useSelectionStore;
