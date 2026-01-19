import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface WalkState {
  isWalking: boolean; // 전역 상태로만 관리 (AsyncStorage 저장 안 함)
  startTime: number | null;
  distance: number | null;
  startWalk: () => Promise<void>;
  saveDistance: (distance: number) => Promise<void>;
  stopWalk: () => Promise<void>;
  loadWalkState: () => Promise<void>;
}

interface CurrentWalkData {
  startTime: number;
  distance: number;
}

const STORAGE_KEY_CURRENT_WALK = "@walkaholic:currentWalk";

export const useWalkStore = create<WalkState>((set) => ({
  isWalking: false,
  startTime: null,
  distance: null,

  startWalk: async () => {
    const now = Date.now();
    
    // 전역 상태 업데이트
    set({ 
      isWalking: true,
      startTime: now,
      distance: 0,
    });
    
    // AsyncStorage에는 startTime과 distance만 저장 (isWalking은 저장 안 함)
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

  stopWalk: async () => {
    set({
      isWalking: false,
      startTime: null,
      distance: null,
    });

    await AsyncStorage.removeItem(STORAGE_KEY_CURRENT_WALK);
  },

  loadWalkState: async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY_CURRENT_WALK);
      
      if (saved) {
        const walkData: CurrentWalkData = JSON.parse(saved);
        // startTime이 있으면 isWalking을 true로 설정
        set({
          isWalking: true,
          startTime: walkData.startTime,
          distance: walkData.distance ?? 0,
        });
      }
    } catch (error) {
      console.error("Failed to load walk state:", error);
    }
  },
}));