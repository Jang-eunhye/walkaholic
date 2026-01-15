import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface WalkState {
  isWalking: boolean;
  startWalk: () => void;
  stopWalk: () => void;
  loadWalkState: () => Promise<void>;
}

const STORAGE_KEY = '@walkaholic:isWalking';

export const useWalkStore = create<WalkState>((set) => ({
  isWalking: false,
  
  startWalk: async () => {
    set({ isWalking: true });
    await AsyncStorage.setItem(STORAGE_KEY, 'true');
  },
  
  stopWalk: async () => {
    set({ isWalking: false });
    await AsyncStorage.setItem(STORAGE_KEY, 'false');
  },
  
  loadWalkState: async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        set({ isWalking: saved === 'true' });
      }
    } catch (error) {
      console.error('Failed to load walk state:', error);
    }
  },
}));