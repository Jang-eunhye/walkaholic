import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MonthlyStats } from "../../types/walk";
import { formatDistance, formatDuration, formatNumber, formatCalories } from "../../utils/format/formatStats";
import { getWalkMessage } from "../../utils/stats/getWalkMessage";
import StatsCard from "./StatsCard";

interface StatisticsSectionProps {
  monthlyStats: MonthlyStats;
}

export default function StatisticsSection({ monthlyStats }: StatisticsSectionProps) {
  const walkMessage = getWalkMessage(monthlyStats.count);

  return (
    // <View className="bg-white rounded-3xl p-4 shadow-sm border border-gray-200 flex-1">
      <>
      {/* Highlight Card */}
      <View className="bg-mainGreen rounded-3xl p-4 shadow-sm flex-1 ">
        <View className="flex-row items-center gap-3 flex-1">
          <MaterialCommunityIcons name="foot-print" size={16} color="white" />
          <Text className="font-medium text-white opacity-90 text-base">이번 달 산책</Text>
        </View>
        <View className="flex-row items-baseline gap-2 flex-2">
          <Text className="text-5xl font-bold text-white tracking-tight">{monthlyStats.count}</Text>
          <Text className="text-2xl font-medium text-white opacity-80">회</Text>
        </View>
        <View className="flex-1 justify-center">
          <Text className="text-base text-white opacity-75">
            {walkMessage}
          </Text>
        </View>
      </View>

      {/* Stats Grid - 2x2 고정 */}
      <View className="mt-3 flex-2">
        {/* 첫 번째 행 */}
        <View className="flex-row gap-2 mb-2">
          <StatsCard
            icon="map-marker-distance"
            label="총 거리"
            value={formatDistance(monthlyStats.totalDistance)}
            colorClass="bg-blue-100 text-blue-600"
          />
          <StatsCard
            icon="clock-outline"
            label="총 시간"
            value={formatDuration(monthlyStats.totalDuration)}
            colorClass="bg-amber-100 text-amber-600"
          />
        </View>
        {/* 두 번째 행 */}
        <View className="flex-row gap-2">
          <StatsCard
            icon="walk"
            label="걸음 수"
            value={formatNumber(monthlyStats.totalSteps)}
            colorClass="bg-emerald-100 text-emerald-600"
          />
          <StatsCard
            icon="fire"
            label="소모 칼로리"
            value={formatCalories(monthlyStats.totalCalories)}
            colorClass="bg-rose-100 text-rose-600"
          />
        </View>
      </View>
      </>
    // </View>
  );
}