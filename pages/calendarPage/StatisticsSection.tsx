import { View, Text } from "react-native";

interface MonthlyStats {
  count: number;
  totalDuration: number; // 초 단위
  totalDistance: number; // 미터 단위
  totalSteps: number;
  totalCalories: number;
}

interface StatisticsSectionProps {
  monthlyStats: MonthlyStats;
}

export default function StatisticsSection({ monthlyStats }: StatisticsSectionProps) {
  // 시간 포맷팅 (초 -> 시간 분)
  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}시간 ${minutes}분`;
    }
    return `${minutes}분`;
  };

  // 거리 포맷팅 (미터 -> km)
  const formatDistance = (meters: number): string => {
    return `${(meters / 1000).toFixed(1)}km`;
  };

  // 숫자 포맷팅 (콤마 추가)
  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

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