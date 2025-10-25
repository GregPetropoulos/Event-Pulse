import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { storage } from '@/storage/mmkv';

type Event = {
  id: string;
  name: string;
  timestamp: string;
};
type AppState = {
  favorites: Event[];
  addFavorite: (event: Event) => void;
  removeFavorite: (id: string) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (event) => set({ favorites: [...get().favorites, event] }),
      removeFavorite: (id) => ({ favorites: get().favorites.filter((e) => e.id !== id) }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => ({
        setItem: (name, value) => {
          storage.set(name, value);
        },
        getItem: (name) => storage.getString(name) ?? null,
        removeItem: (name) => storage.remove(name),
      })),
    },
  ),
);
// ✅ Fully persisted store
// ✅ Goes to disk using MMKV
// ✅ Extremely fast + production safe
