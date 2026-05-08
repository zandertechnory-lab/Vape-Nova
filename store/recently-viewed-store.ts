import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface RecentProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
}

interface RecentlyViewedStore {
  items: RecentProduct[];
  addItem: (item: RecentProduct) => void;
  clear: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const filtered = get().items.filter((i) => i.id !== item.id);
        set({ items: [item, ...filtered].slice(0, 8) });
      },
      clear: () => set({ items: [] }),
    }),
    {
      name: "vapenova-recently-viewed",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : ({} as Storage)
      ),
    }
  )
);
