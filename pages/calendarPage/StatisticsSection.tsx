import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MonthlyStats } from "../../utils/types/walk";
import { formatDistance, formatNumber } from "../../utils/format/formatStats";
import StatsCard from "./StatsCard";

interface StatisticsSectionProps {
  monthlyStats: MonthlyStats;
}

export default function StatisticsSection({ monthlyStats }: StatisticsSectionProps) {
  const currentDate = new Date();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const walkMessage = monthlyStats.count >= 20 
    ? "대단해요! 정말 열심히 산책했어요!" 
    : monthlyStats.count >= 10 
    ? "좋은 습관을 만들어가고 있어요!" 
    : "조금씩 더 걸어볼까요?";

  // 시간 포맷팅 (초 -> 시간 분)
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return { value: `${hours}시간 ${minutes}분`};
    }
    return { value: `${minutes}`, unit: "분" };
  };

  const timeFormatted = formatTime(monthlyStats.totalDuration);
  const distanceValue = formatDistance(monthlyStats.totalDistance).replace("km", "");

  return (
    <View className="bg-white rounded-3xl p-4 shadow-sm border border-gray-200 flex-1">
      {/* Highlight Card */}
      <View className="bg-blue-500 rounded-3xl p-4 shadow-sm flex-1">
        <View className="flex-row items-center gap-3 flex-1">
          <MaterialCommunityIcons name="foot-print" size={16} color="white" />
          <Text className="font-medium text-white opacity-90 text-sm">이번 달 산책</Text>
        </View>
        <View className="flex-row items-baseline gap-2 flex-2">
          <Text className="text-3xl font-bold text-white tracking-tight">{monthlyStats.count}</Text>
          <Text className="text-lg font-medium text-white opacity-80">회</Text>
        </View>
        <Text className="text-xs text-white opacity-75 flex-1">
          {walkMessage}
        </Text>
      </View>

      {/* Stats Grid - 2x2 고정 */}
      <View className="mt-3 flex-2">
        {/* 첫 번째 행 */}
        <View className="flex-row gap-2 mb-2">
          <StatsCard
            icon="map-marker-distance"
            label="총 거리"
            value={distanceValue}
            unit="km"
            colorClass="bg-blue-100 text-blue-600"
          />
          <StatsCard
            icon="clock-outline"
            label="총 시간"
            value={timeFormatted.value}
            unit={timeFormatted.unit}
            colorClass="bg-amber-100 text-amber-600"
          />
        </View>
        {/* 두 번째 행 */}
        <View className="flex-row gap-2">
          <StatsCard
            icon="walk"
            label="걸음 수"
            value={formatNumber(monthlyStats.totalSteps)}
            unit="걸음"
            colorClass="bg-emerald-100 text-emerald-600"
          />
          <StatsCard
            icon="fire"
            label="소모 칼로리"
            value={formatNumber(monthlyStats.totalCalories)}
            unit="kcal"
            colorClass="bg-rose-100 text-rose-600"
          />
        </View>
      </View>
    </View>
  );
}