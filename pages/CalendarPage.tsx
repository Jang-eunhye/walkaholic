import { View } from "react-native";
import { useEffect, useState } from "react";
import CalendarSection from "./calendarPage/CalendarSection";
import StatisticsSection from "./calendarPage/StatisticsSection";
import { getMonthKey } from "../utils/date/calculateWeeks";
import { MonthlyStats } from "../types/walk";
import { loadAllHistory, loadMonthlyStats } from "../utils/stats/calendarStats";

export default function CalendarPage() {
  const [selectedMonth, setSelectedMonth] = useState<string>(getMonthKey(new Date()));
  const [markedDates, setMarkedDates] = useState<Record<string, { selected: boolean; selectedColor: string }>>({});
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats>({
    count: 0,
    totalDuration: 0,
    totalDistance: 0,
    totalSteps: 0,
    totalCalories: 0,
  });

  // 모든 월별 히스토리 데이터 로드
  useEffect(() => {
    const loadData = async () => {
      const markedDatesMap = await loadAllHistory();
      setMarkedDates(markedDatesMap);
    };

    loadData();
  }, []);

  // 선택된 월의 통계 로드
  useEffect(() => {
    const loadData = async () => {
      const stats = await loadMonthlyStats(selectedMonth);
      setMonthlyStats(stats);
    };

    loadData();
  }, [selectedMonth]);

  const handleMonthChange = (month: { month: number; year: number }) => {
    const monthKey = getMonthKey(new Date(month.year, month.month - 1, 1));
    setSelectedMonth(monthKey);
  };

  return (
    <View className="flex-1 p-4">
      {/* 달력 영역 - 50% */}
      <View className="flex-1 mb-2">
        <CalendarSection 
          markedDates={markedDates}
          onMonthChange={handleMonthChange}
        />
      </View>

      {/* 통계 영역 - 50% */}
      <View className="flex-[0.9]">
        <StatisticsSection monthlyStats={monthlyStats} />
      </View>
    </View>
  );
}