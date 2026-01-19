import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface WalkState {
  isWalking: boolean;
  startTime: number | null;
  distance: number | null;
  startWalk: () => Promise<void>;
  saveDistance: (distance: number) => Promise<void>;
  stopWalk: () => Promise<void>;
  loadWalkState: () => Promise<void>;
}

const STORAGE_KEY_IS_WALKING = "@walkaholic:isWalking";
const STORAGE_KEY_START_TIME = "@walkaholic:startTime";
const STORAGE_KEY_DISTANCE = "@walkaholic:distance";

export const useWalkStore = create<WalkState>((set) => ({
  isWalking: false,
  startTime: null,
  distance: null,

  startWalk: async () => {
    const now = Date.now();
    set({ 
      isWalking: true, 
      startTime: now,
    });
    await AsyncStorage.setItem(STORAGE_KEY_IS_WALKING, "true");
    await AsyncStorage.setItem(STORAGE_KEY_START_TIME, now.toString());
    await AsyncStorage.setItem(STORAGE_KEY_DISTANCE, "0");
  },

  saveDistance: async (distance: number) => {
    set({ distance });
    await AsyncStorage.setItem(STORAGE_KEY_DISTANCE, distance.toString());
  },

  stopWalk: async () => {
    set({
      isWalking: false,
      startTime: null,
      distance: null,
    });

    await AsyncStorage.setItem(STORAGE_KEY_IS_WALKING, "false");
    await AsyncStorage.removeItem(STORAGE_KEY_START_TIME);
    await AsyncStorage.removeItem(STORAGE_KEY_DISTANCE);
  },

  loadWalkState: async () => {
    try {
      const [saved, savedStartTime, savedDistance] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEY_IS_WALKING),
        AsyncStorage.getItem(STORAGE_KEY_START_TIME),
        AsyncStorage.getItem(STORAGE_KEY_DISTANCE),
      ]);
      
      if (saved === "true" && savedStartTime) {
        set({
          isWalking: true,
          startTime: parseInt(savedStartTime, 10),
          distance: savedDistance ? parseFloat(savedDistance) : null,
        });
      }
    } catch (error) {
      console.error("Failed to load walk state:", error);
    }
  },
}));