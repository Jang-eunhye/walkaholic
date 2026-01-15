import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface WalkState {
  isWalking: boolean;
  startTime?: number | null; // 시작 시간 (타임스탬프)
  startWalk: () => void;
  stopWalk: () => void;
  loadWalkState: () => Promise<void>;
}

const STORAGE_KEY_IS_WALKING = "@walkaholic:isWalking";
const STORAGE_KEY_START_TIME = "@walkaholic:startTime";

export const useWalkStore = create<WalkState>((set) => ({
  isWalking: false,
  startTime: null,

  startWalk: async () => {
    const now = Date.now(); // 현재 시간을 밀리초로
    set({ isWalking: true, startTime: now });
    await AsyncStorage.setItem(STORAGE_KEY_IS_WALKING, "true");
    await AsyncStorage.setItem(STORAGE_KEY_START_TIME, now.toString());
  },

  stopWalk: async () => {
    set({
      isWalking: false,
      startTime: null,
    });

    await AsyncStorage.setItem(STORAGE_KEY_IS_WALKING, "false");
    await AsyncStorage.removeItem(STORAGE_KEY_START_TIME);
  },

  loadWalkState: async () => {
    try {
      const [saved, savedStartTime] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEY_IS_WALKING),
        AsyncStorage.getItem(STORAGE_KEY_START_TIME),
      ]);

      if (saved === "true" && savedStartTime) {
        set({
          isWalking: true,
          startTime: parseInt(savedStartTime, 10),
        });
      }
    } catch (error) {
      console.error("Failed to load walk state:", error);
    }
  },
}));
