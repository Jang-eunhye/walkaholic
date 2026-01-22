import { getMonthKey, getWeekStart, getWeekEnd } from "../../utils/date/calculateWeeks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WalkHistoryItem } from "../types/walk";

const STORAGE_KEY_HISTORY_PREFIX = "@walkaholic:walkHistory:";

export const getWeeklyStats = async (): Promise<number[]> => {
  const today = new Date();
  const weekStart = getWeekStart(today);
  const weekEnd = getWeekEnd(today);
  
  const weeklyData: number[] = [0, 0, 0, 0, 0, 0, 0];
  
  try {
    const startMonth = getMonthKey(weekStart);
    const endMonth = getMonthKey(weekEnd);
    const todayMonth = getMonthKey(today);
    
    const monthsToCheck: string[] = [];
    if (startMonth === endMonth) {
      monthsToCheck.push(startMonth);
    } else {
      if (startMonth <= todayMonth) {
        monthsToCheck.push(startMonth);
      }
      if (endMonth <= todayMonth) {
        monthsToCheck.push(endMonth);
      }
    }
    
    const uniqueMonths = [...new Set(monthsToCheck)];
    
    const allHistory: WalkHistoryItem[] = [];
    for (const monthKey of uniqueMonths) {
      const historyStorageKey = `${STORAGE_KEY_HISTORY_PREFIX}${monthKey}`;
      const monthHistory = await AsyncStorage.getItem(historyStorageKey);
      if (monthHistory) {
        const parsed: WalkHistoryItem[] = JSON.parse(monthHistory);
        allHistory.push(...parsed);
      }
    }
    
    allHistory.forEach((item) => {
      const itemDate = new Date(item.startTime);
      if (itemDate >= weekStart && itemDate <= weekEnd) {
        const dayOfWeek = itemDate.getDay();
        const index = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        weeklyData[index] += item.distance / 1000;
      }
    });
  } catch (error) {
    console.error("Failed to get weekly stats:", error);
  }
  return weeklyData;
};