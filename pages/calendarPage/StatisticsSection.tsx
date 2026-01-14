import { View, Text } from "react-native";

// 더미 데이터: 해당 월의 총 산책 통계
const monthlyStats = [
  { label: "산책 일수", value: "15/28" },
  { label: "총 산책 시간", value: "12시간 30분" },
  { label: "총 거리", value: "45.2km" },
  { label: "총 걸음수", value: "58,420걸음" },
  { label: "총 칼로리", value: "2,340kcal" },
];

export default function StatisticsSection() {
  return (
    <View className="bg-blue-300 p-4" style={{ minHeight: 200 }}>
      <View className="gap-0">
        {monthlyStats.map((stat, index) => (
          <View
            key={index}
            className={`flex-row justify-between items-center py-3 ${
              index < monthlyStats.length - 1 ? "border-b border-gray-300" : ""
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
