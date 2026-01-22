import { View } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CalendarSection from "./calendarPage/CalendarSection";
import StatisticsSection from "./calendarPage/StatisticsSection";
import { getMonthKey } from "../utils/date/calculateWeeks";

interface WalkHistoryItem {
  startTime: number;
  duration: number;
  distance: number;
  steps: number;
  calories: number;
}

const STORAGE_KEY_HISTORY_PREFIX = "@walkaholic:walkHistory:";

interface MonthlyStats {
  count: number;
  totalDuration: number;
  totalDistance: number;
  totalSteps: number;
  totalCalories: number;
}

export default function CalendarPage() {
  const [selectedMonth, setSelectedMonth] = useState<string>(getMonthKey(new Date()));
  const [markedDates, setMarkedDates] = useState<Record<string, { marked: boolean; dotColor: string }>>({});
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats>({
    count: 0,
    totalDuration: 0,
    totalDistance: 0,
    totalSteps: 0,
    totalCalories: 0,
  });

  // 모든 월별 히스토리 데이터 로드
  useEffect(() => {
    const loadAllHistory = async () => {
      try {
        const allKeys = await AsyncStorage.getAllKeys();
        const historyKeys = allKeys.filter((key) =>
          key.startsWith(STORAGE_KEY_HISTORY_PREFIX)
        );

        const markedDatesMap: Record<string, { marked: boolean; dotColor: string }> = {};

        for (const key of historyKeys) {
          const historyData = await AsyncStorage.getItem(key);
          if (historyData) {
            const history: WalkHistoryItem[] = JSON.parse(historyData);
            history.forEach((item) => {
              const date = new Date(item.startTime);
              const dateString = date.toISOString().split("T")[0];
              markedDatesMap[dateString] = { marked: true, dotColor: "green" };
            });
          }
        }

        setMarkedDates(markedDatesMap);
      } catch (error) {
        console.error("Failed to load walk history:", error);
      }
    };

    loadAllHistory();
  }, []);

  // 선택된 월의 통계 로드
  useEffect(() => {
    const loadMonthlyStats = async () => {
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

          setMonthlyStats(stats);
        } else {
          setMonthlyStats({
            count: 0,
            totalDuration: 0,
            totalDistance: 0,
            totalSteps: 0,
            totalCalories: 0,
          });
        }
      } catch (error) {
        console.error("Failed to load monthly stats:", error);
      }
    };

    loadMonthlyStats();
  }, [selectedMonth]);

  const handleMonthChange = (month: { month: number; year: number }) => {
    const monthKey = `${month.year}-${String(month.month).padStart(2, "0")}`;
    setSelectedMonth(monthKey);
  };

  return (
    <View className="flex-1 p-4">
      {/* 달력 영역 */}
      <CalendarSection 
        markedDates={markedDates}
        onMonthChange={handleMonthChange}
      />

      {/* 통계 영역 */}
      <StatisticsSection monthlyStats={monthlyStats} />
    </View>
  );
}