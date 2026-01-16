import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface WalkState {
  isWalking: boolean;
  startTime: number | null;
  initialSteps: number | null;
  distance: number | null;
  startWalk: () => Promise<void>; // 파라미터 제거
  saveInitialSteps: (initialSteps: number) => Promise<void>; // 새 함수 추가
  saveDistance: (distance: number) => Promise<void>;
  stopWalk: () => Promise<void>;
  loadWalkState: () => Promise<void>;
}

const STORAGE_KEY_IS_WALKING = "@walkaholic:isWalking";
const STORAGE_KEY_START_TIME = "@walkaholic:startTime";
const STORAGE_KEY_INITIAL_STEPS = "@walkaholic:initialSteps";
const STORAGE_KEY_DISTANCE = "@walkaholic:distance";

export const useWalkStore = create<WalkState>((set) => ({
  isWalking: false,
  startTime: null,
  initialSteps: null,
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

  saveInitialSteps: async (initialSteps: number) => {
    set({ initialSteps });
    await AsyncStorage.setItem(STORAGE_KEY_INITIAL_STEPS, initialSteps.toString());
  },

  saveDistance: async (distance: number) => {
    set({ distance });
    // 진행 중인 산책의 거리 누적 저장
    await AsyncStorage.setItem(STORAGE_KEY_DISTANCE, distance.toString());
  },

  stopWalk: async () => {
    set({
      isWalking: false,
      startTime: null,
      initialSteps: null,
      distance: null,
    });

    await AsyncStorage.setItem(STORAGE_KEY_IS_WALKING, "false");
    await AsyncStorage.removeItem(STORAGE_KEY_START_TIME);
    await AsyncStorage.removeItem(STORAGE_KEY_INITIAL_STEPS);
    await AsyncStorage.removeItem(STORAGE_KEY_DISTANCE);
  },

  loadWalkState: async () => {
    try {
      const [saved, savedStartTime, savedInitialSteps, savedDistance] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEY_IS_WALKING),
        AsyncStorage.getItem(STORAGE_KEY_START_TIME),
        AsyncStorage.getItem(STORAGE_KEY_INITIAL_STEPS),
        AsyncStorage.getItem(STORAGE_KEY_DISTANCE),
      ]);
      
      if (saved === "true" && savedStartTime) {
        set({
          isWalking: true,
          startTime: parseInt(savedStartTime, 10),
          initialSteps: savedInitialSteps ? parseInt(savedInitialSteps, 10) : null,
          distance: savedDistance ? parseFloat(savedDistance) : null,
        });
      }
    } catch (error) {
      console.error("Failed to load walk state:", error);
    }
  },
}));