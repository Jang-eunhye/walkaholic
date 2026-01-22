import { View, Text } from "react-native";
import { MonthlyStats } from "../../utils/types/walk";
import { formatDuration, formatDistance, formatNumber } from "../../utils/format/formatStats";

interface StatisticsSectionProps {
  monthlyStats: MonthlyStats;
}

export default function StatisticsSection({ monthlyStats }: StatisticsSectionProps) {

  const stats = [
    { label: "산책 횟수", value: `${monthlyStats.count}회` },
    { label: "총 산책 시간", value: formatDuration(monthlyStats.totalDuration) },
    { label: "총 거리", value: formatDistance(monthlyStats.totalDistance) },
    { label: "총 걸음수", value: `${formatNumber(monthlyStats.totalSteps)}걸음` },
    { label: "총 칼로리", value: `${formatNumber(monthlyStats.totalCalories)}kcal` },
  ];

  return (
    <View className="bg-blue-300 p-4" style={{ minHeight: 200 }}>
      <View className="gap-0">
        {stats.map((stat, index) => (
          <View
            key={index}
            className={`flex-row justify-between items-center py-3 ${
              index < stats.length - 1 ? "border-b border-gray-300" : ""
            }`}
          >
            <Text className="text-base font-semibold text-gray-800">
              {stat.label}
            </Text>
            <Text className="text-lg font-bold text-gray-900">
              {stat.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}