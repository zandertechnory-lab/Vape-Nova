import { create } from "zustand";

export interface CompareProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  stock: number;
}

interface CompareStore {
  items: CompareProduct[];
  addItem: (item: CompareProduct) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  isInCompare: (id: string) => boolean;
}

export const useCompareStore = create<CompareStore>((set, get) => ({
  items: [],
  addItem: (item) => {
    if (get().items.length >= 3) return;
    if (get().items.find((i) => i.id === item.id)) return;
    set({ items: [...get().items, item] });
  },
  removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
  clear: () => set({ items: [] }),
  isInCompare: (id) => !!get().items.find((i) => i.id === id),
}));
