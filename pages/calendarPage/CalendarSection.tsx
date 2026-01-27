import { View, Text, TouchableOpacity } from "react-native";
import { useMemo, useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { calculateStage } from "../../utils/stats/calculateStage";
import { getWeekStart, getWeekEnd, getMonthKey } from "../../utils/date/calculateWeeks";
import { WalkHistoryItem } from "../../types/walk";
import { STORAGE_KEY_HISTORY_PREFIX } from "../../stores/useWalkStore";
import { GROWTH_STAGES } from "../../constants/growthStages";

interface CalendarSectionProps {
  markedDates: Record<string, any>;
  onMonthChange: (month: { month: number; year: number }) => void;
}

export default function CalendarSection({ markedDates, onMonthChange }: CalendarSectionProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekDistances, setWeekDistances] = useState<Record<string, number>>({});
  const todayString = new Date().toISOString().split("T")[0];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 월요일 시작 요일 배열
  const weekDays = ["월", "화", "수", "목", "금", "토", "일"];

  // 주차별 거리 로드
  useEffect(() => {
    const loadWeekDistances = async () => {
      const distances: Record<string, number> = {};
      
      // 해당 월의 모든 일요일 찾기
      const lastDay = new Date(year, month + 1, 0);
      for (let day = 1; day <= lastDay.getDate(); day++) {
        const date = new Date(year, month, day);
        if (date.getDay() === 0) {
          // 일요일이 속한 주의 총 거리 계산
          const weekStart = getWeekStart(date);
          const weekEnd = getWeekEnd(date);
          const weekStartString = weekStart.toISOString().split("T")[0];
          
          try {
            const startMonth = getMonthKey(weekStart);
            const endMonth = getMonthKey(weekEnd);
            
            const monthsToCheck: string[] = [];
            if (startMonth === endMonth) {
              monthsToCheck.push(startMonth);
            } else {
              monthsToCheck.push(startMonth);
              monthsToCheck.push(endMonth);
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
            
            let totalDistance = 0;
            allHistory.forEach((item) => {
              const itemDate = new Date(item.startTime);
              if (itemDate >= weekStart && itemDate <= weekEnd) {
                totalDistance += item.distance;
              }
            });
            
            distances[weekStartString] = totalDistance;
          } catch (error) {
            console.error("Failed to get week total distance:", error);
            distances[weekStartString] = 0;
          }
        }
      }
      
      setWeekDistances(distances);
    };
    
    loadWeekDistances();
  }, [year, month]);

  // 해당 월의 주차별 데이터 계산
  const weeksData = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // 월요일 기준 첫째 날 오프셋 (0: 월요일, 6: 일요일)
    let startOffset = firstDay.getDay() - 1;
    if (startOffset < 0) startOffset = 6;

    const weeks: { days: (number | null)[]; weekStart: string }[] = [];
    let currentWeek: (number | null)[] = [];

    // 첫 주 빈 칸 채우기
    for (let i = 0; i < startOffset; i++) {
      currentWeek.push(null);
    }

    // 날짜 채우기
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      currentWeek.push(day);

      // 일요일이면 주 마감 (7일 채워짐)
      if (currentWeek.length === 7) {
        const weekStart = getWeekStart(date);
        const weekStartString = weekStart.toISOString().split("T")[0];
        weeks.push({ days: currentWeek, weekStart: weekStartString });
        currentWeek = [];
      }
    }

    // 마지막 주 빈 칸 채우기
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      // 마지막 주의 시작일 계산
      const lastDate = new Date(year, month, lastDay.getDate());
      const weekStart = getWeekStart(lastDate);
      const weekStartString = weekStart.toISOString().split("T")[0];
      weeks.push({ days: currentWeek, weekStart: weekStartString });
    }

    return weeks;
  }, [year, month]);

  const goToPrevMonth = () => {
    const newDate = new Date(year, month - 1, 1);
    setCurrentDate(newDate);
    onMonthChange({ month: newDate.getMonth() + 1, year: newDate.getFullYear() });
  };

  const goToNextMonth = () => {
    const newDate = new Date(year, month + 1, 1);
    setCurrentDate(newDate);
    onMonthChange({ month: newDate.getMonth() + 1, year: newDate.getFullYear() });
  };

  const isToday = (day: number | null) => {
    if (!day) return false;
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return dateString === todayString;
  };

  const isWalked = (day: number | null) => {
    if (!day) return false;
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return !!markedDates[dateString];
  };

  const getDayColor = (dayIndex: number) => {
    if (dayIndex === 5) return "#3B82F6"; // 토요일 - 파란색
    if (dayIndex === 6) return "#EF4444"; // 일요일 - 빨간색
    return "#111827";
  };

  const getGrowthStage = (totalKm: number) => {
    const stage = calculateStage(totalKm);
    return GROWTH_STAGES[stage];
  };

  return (
    <View className="bg-white rounded-3xl p-5 shadow-sm border border-gray-200 flex-1">
      {/* 헤더 - 년월 및 네비게이션 */}
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity onPress={goToPrevMonth} className="p-2">
          <MaterialCommunityIcons name="chevron-left" size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="text-2xl font-semibold text-gray-900">
          {year}년 {month + 1}월
        </Text>
        <TouchableOpacity onPress={goToNextMonth} className="p-2">
          <MaterialCommunityIcons name="chevron-right" size={24} color="#374151" />
        </TouchableOpacity>
      </View>

      {/* 요일 헤더 + 아이콘 컬럼 */}
      <View className="flex-row mb-2">
        {weekDays.map((day, index) => (
          <View key={day} className="flex-1 items-center py-2">
            <Text
              className="text-xs font-semibold"
              style={{ color: getDayColor(index) }}
            >
              {day}
            </Text>
          </View>
        ))}
        {/* 아이콘 헤더 */}
        <View className="flex-1 items-center justify-center py-2">
          <Text className="text-xs font-semibold text-gray-400"></Text>
        </View>
      </View>

      {/* 주차별 날짜 + 아이콘 */}
      {weeksData.map((week) => {
        const totalDistance = weekDistances[week.weekStart] || 0;
        const totalKm = totalDistance / 1000;
        const stage = getGrowthStage(totalKm);
        
        return (
          <View key={week.weekStart} className="border-b border-gray-200 flex-row items-center mb-1">
            {/* 날짜들 */}
            {week.days.map((day, dayIndex) => {
              const walked = isWalked(day);
              const today = isToday(day);
              const dayKey = day
                ? `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                : `${week.weekStart}-empty-${dayIndex}`;

              return (
                <View key={dayKey} className="flex-1 items-center py-1">
                  <View
                    className={`w-9 h-9 items-center justify-center rounded-full overflow-hidden ${
                      walked ? "bg-mainGreen" : ""
                    } ${today ? "border-2 border-darkGreen" : ""}`}
                  >
                    {day && (
                      <Text
                        className="text-base font-medium"
                        style={{
                          color: walked
                            ? "#ffffff"
                            : today
                            ? "#059669"
                            : getDayColor(dayIndex),
                        }}
                      >
                        {day}
                      </Text>
                    )}
                  </View>
                </View>
              );
            })}

            {/* 주차별 성장 아이콘 */}
            <View className="flex-1 items-center py-1">
              <View className="w-9 h-9 items-center justify-center">
                <MaterialCommunityIcons name={stage.icon} size={16} color={stage.color} />
                <Text className="text-[8px] text-gray-500 mt-0.5">
                  {totalKm.toFixed(1)}km
                </Text>
              </View>
            </View>
          </View>
        );
      })}

      {/* 범례 */}
      <View className="flex-row justify-center items-center mt-4 pt-4 flex-wrap gap-2">
        {GROWTH_STAGES.map((stage) => (
          <View key={stage.label} className="flex-row items-center mx-2">
            <MaterialCommunityIcons name={stage.icon} size={16} color={stage.color} />
            <Text className="text-[6px] text-gray-500 ml-0.5">
              {stage.minKm}km+
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
