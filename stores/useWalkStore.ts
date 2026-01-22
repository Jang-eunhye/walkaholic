import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getWeeklyStats as calculateWeeklyStats } from "../utils/stats/walkStats";
import { getMonthKey } from "../utils/date/calculateWeeks";
import { WalkHistoryItem } from "../utils/types/walk";

interface WalkState {
  isWalking: boolean;
  startTime: number | null;
  distance: number | null;
  steps: number;
  startWalk: () => Promise<void>;
  saveDistance: (distance: number) => Promise<void>;
  saveSteps: (steps: number) => void;
  stopWalk: () => Promise<void>;
  loadWalkState: () => Promise<void>;
  getWeeklyStats: () => Promise<number[]>;
}

interface CurrentWalkData {
  startTime: number;
  distance: number;
}

const STORAGE_KEY_CURRENT_WALK = "@walkaholic:currentWalk";
export const STORAGE_KEY_HISTORY_PREFIX = "@walkaholic:walkHistory:";

export const useWalkStore = create<WalkState>((set, get) => ({
  isWalking: false,
  startTime: null,
  distance: null,
  steps: 0,

  startWalk: async () => {
    const now = Date.now();
    
    set({ 
      isWalking: true,
      startTime: now,
      distance: 0,
      steps: 0,
    });
    
    const walkData: CurrentWalkData = {
      startTime: now,
      distance: 0,
    };
    await AsyncStorage.setItem(STORAGE_KEY_CURRENT_WALK, JSON.stringify(walkData));
  },

  saveDistance: async (distance: number) => {
    set({ distance });
    
    const currentData = await AsyncStorage.getItem(STORAGE_KEY_CURRENT_WALK);
    if (currentData) {
      const walkData: CurrentWalkData = JSON.parse(currentData);
      walkData.distance = distance;
      await AsyncStorage.setItem(STORAGE_KEY_CURRENT_WALK, JSON.stringify(walkData));
    }
  },

  saveSteps: (steps: number) => {
    set({ steps });
  },

  stopWalk: async () => {
    const { startTime, distance, steps } = get();
    
    if (!startTime) {
      set({
        isWalking: false,
        startTime: null,
        distance: null,
        steps: 0,
      });
      await AsyncStorage.removeItem(STORAGE_KEY_CURRENT_WALK);
      return;
    }

    const duration = Math.floor((Date.now() - startTime) / 1000);
    const calories = Math.round(steps * 0.04);

    const historyItem: WalkHistoryItem = {
      startTime,
      duration,
      distance: distance ?? 0,
      steps,
      calories,
    };

    const monthKey = getMonthKey(new Date(startTime));
    const historyStorageKey = `${STORAGE_KEY_HISTORY_PREFIX}${monthKey}`;

    try {
      const existingHistory = await AsyncStorage.getItem(historyStorageKey);
      const history: WalkHistoryItem[] = existingHistory 
        ? JSON.parse(existingHistory) 
        : [];

      history.push(historyItem);
      await AsyncStorage.setItem(historyStorageKey, JSON.stringify(history));
} catch (error) {
console.error("Failed to save walk history:", error);
}


    set({
      isWalking: false,
      startTime: null,
      distance: null,
      steps: 0,
    });

    await AsyncStorage.removeItem(STORAGE_KEY_CURRENT_WALK);
  },

  loadWalkState: async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY_CURRENT_WALK);
      
      if (saved) {
        const walkData: CurrentWalkData = JSON.parse(saved);
        set({
          isWalking: true,
          startTime: walkData.startTime,
          distance: walkData.distance ?? 0,
          steps: 0,
        });
      }
    } catch (error) {
      console.error("Failed to load walk state:", error);
    }
  },

  getWeeklyStats: async () => {
    return await calculateWeeklyStats();
  },
}));