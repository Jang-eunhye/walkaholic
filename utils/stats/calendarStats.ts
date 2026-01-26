import AsyncStorage from "@react-native-async-storage/async-storage";
import { WalkHistoryItem, MonthlyStats } from "../types/walk";
import { STORAGE_KEY_HISTORY_PREFIX } from "../../stores/useWalkStore";

/**
 * 모든 월별 히스토리 데이터를 로드하여 markedDates 생성
 */
export const loadAllHistory = async (): Promise<Record<string, { selected: boolean; selectedColor: string }>> => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const historyKeys = allKeys.filter((key) =>
      key.startsWith(STORAGE_KEY_HISTORY_PREFIX)
    );

    const markedDatesMap: Record<string, { selected: boolean; selectedColor: string }> = {};

    for (const key of historyKeys) {
      const historyData = await AsyncStorage.getItem(key);
      if (historyData) {
        const history: WalkHistoryItem[] = JSON.parse(historyData);
        history.forEach((item) => {
          const date = new Date(item.startTime);
          const dateString = date.toISOString().split("T")[0];
          markedDatesMap[dateString] = { selected: true, selectedColor: "#10B981" };
        });
      }
    }

    return markedDatesMap;
  } catch (error) {
    console.error("Failed to load walk history:", error);
    return {};
  }
};

/**
 * 선택된 월의 통계 계산
 */
export const loadMonthlyStats = async (selectedMonth: string): Promise<MonthlyStats> => {
  try {
    const historyStorageKey = `${STORAGE_KEY_HISTORY_PREFIX}${selectedMonth}`;
    const monthHistory = await AsyncStorage.getItem(historyStorageKey);

    if (monthHistory) {
      const history: WalkHistoryItem[] = JSON.parse(monthHistory);
      
      const stats = history.reduce(
        (acc, item) => ({
          count: acc.count + 1,
          totalDuration: acc.totalDuration + item.duration,
          totalDistance: acc.totalDistance + item.distance,
          totalSteps: acc.totalSteps + item.steps,
          totalCalories: acc.totalCalories + item.calories,
        }),
        {
          count: 0,
          totalDuration: 0,
          totalDistance: 0,
          totalSteps: 0,
          totalCalories: 0,
        }
      );

      return stats;
    }

    return {
      count: 0,
      totalDuration: 0,
      totalDistance: 0,
      totalSteps: 0,
      totalCalories: 0,
    };
  } catch (error) {
    console.error("Failed to load monthly stats:", error);
    return {
      count: 0,
      totalDuration: 0,
      totalDistance: 0,
      totalSteps: 0,
      totalCalories: 0,
    };
  }
};


