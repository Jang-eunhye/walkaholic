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
      return { value: `${hours}시간 ${minutes}`, unit: "분" };
    }
    return { value: minutes.toString(), unit: "분" };
  };

  const timeFormatted = formatTime(monthlyStats.totalDuration);
  const distanceValue = formatDistance(monthlyStats.totalDistance).replace("km", "");

  return (
    <View className="space-y-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-semibold text-gray-900">
          {month + 1}월 산책 통계
        </Text>
        <Text className="text-sm text-gray-600">
          {year}년
        </Text>
      </View>

      {/* Highlight Card */}
      <View className="bg-blue-500 rounded-3xl p-6 shadow-lg">
        <View className="flex-row items-center gap-3 mb-2">
          <MaterialCommunityIcons name="foot-print" size={24} color="white" style={{ opacity: 0.9 }} />
          <Text className="font-medium text-white opacity-90">이번 달 산책</Text>
        </View>
        <View className="flex-row items-baseline gap-2">
          <Text className="text-5xl font-bold text-white tracking-tight">{monthlyStats.count}</Text>
          <Text className="text-xl font-medium text-white opacity-80">회</Text>
        </View>
        <Text className="mt-3 text-sm text-white opacity-75">
          {walkMessage}
        </Text>
      </View>

      {/* Stats Grid */}
      <View className="flex-row flex-wrap gap-3">
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
  );
}