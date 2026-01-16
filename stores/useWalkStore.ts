import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface WalkState {
  isWalking: boolean;
  startTime?: number | null;
  initialSteps?: number | null;
  startWalk: () => Promise<void>; // 파라미터 제거
  saveInitialSteps: (initialSteps: number) => Promise<void>; // 새 함수 추가
  stopWalk: () => void;
  loadWalkState: () => Promise<void>;
}

const STORAGE_KEY_IS_WALKING = "@walkaholic:isWalking";
const STORAGE_KEY_START_TIME = "@walkaholic:startTime";
const STORAGE_KEY_INITIAL_STEPS = "@walkaholic:initialSteps";

export const useWalkStore = create<WalkState>((set) => ({
  isWalking: false,
  startTime: null,
  initialSteps: null,

  startWalk: async () => {
    const now = Date.now();
    set({ 
      isWalking: true, 
      startTime: now,
    });
    await AsyncStorage.setItem(STORAGE_KEY_IS_WALKING, "true");
    await AsyncStorage.setItem(STORAGE_KEY_START_TIME, now.toString());
  },

  saveInitialSteps: async (initialSteps: number) => {
    set({ initialSteps });
    await AsyncStorage.setItem(STORAGE_KEY_INITIAL_STEPS, initialSteps.toString());
  },

  stopWalk: async () => {
    set({
      isWalking: false,
      startTime: null,
      initialSteps: null,
    });

    await AsyncStorage.setItem(STORAGE_KEY_IS_WALKING, "false");
    await AsyncStorage.removeItem(STORAGE_KEY_START_TIME);
    await AsyncStorage.removeItem(STORAGE_KEY_INITIAL_STEPS);
  },

  loadWalkState: async () => {
    try {
      const [saved, savedStartTime, savedInitialSteps] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEY_IS_WALKING),
        AsyncStorage.getItem(STORAGE_KEY_START_TIME),
        AsyncStorage.getItem(STORAGE_KEY_INITIAL_STEPS),
      ]);

      if (saved === "true" && savedStartTime) {
        set({
          isWalking: true,
          startTime: parseInt(savedStartTime, 10),
          initialSteps: savedInitialSteps ? parseInt(savedInitialSteps, 10) : null,
        });
      }
    } catch (error) {
      console.error("Failed to load walk state:", error);
    }
  },
}));