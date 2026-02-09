import { storage } from '@/storage/mmkv';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { NYC_DEFAULT } from '@/constants/mapDefaults';

type Event = {
  id: string;
  name: string;
  timestamp: string;
};
type UserCoords = { latitude: number; longitude: number };

type AppState = {
  favorites: Event[];
  addFavorite: (event: Event) => void;
  removeFavorite: (id: string) => void;
  userCoords: UserCoords;
  updateUserLocation: (coords: UserCoords) => void;
  locationPermissionGranted: boolean; 
  setLocationPermission: (granted: boolean) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (event) => set({ favorites: [...get().favorites, event] }),
      removeFavorite: (id) => ({ favorites: get().favorites.filter((e) => e.id !== id) }),
      userCoords: NYC_DEFAULT,
      updateUserLocation: (coords: UserCoords) => set({ userCoords: coords ?? NYC_DEFAULT }),
      // In Home screen sync loc permissions to the store via useLocation hook
      locationPermissionGranted:false,
      setLocationPermission: (granted: boolean) => set({locationPermissionGranted:granted})

    }),
    {
      name: 'app-storage',
      // Mapping zustands local storage to mmkv storage
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
