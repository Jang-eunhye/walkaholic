import { View, Text } from "react-native";

export default function WeatherInfoSection() {
  return (
    <View className="bg-blue-300 p-3">
      <View className="flex-row">
        {/* 기온(왼쪽, 크게) */}
        <View className="flex-1 bg-sky-100 rounded-xl p-4 items-center justify-center mr-2">
          <Text className="text-sm font-semibold text-gray-700 mb-1">기온</Text>
          <Text className="text-4xl font-extrabold text-gray-900">-°</Text>
        </View>

        {/* 나머지 4개(오른쪽, 세로 4등분) */}
        <View className="flex-1">
          <View className="flex-1 bg-emerald-100 rounded-xl p-3 mb-2 justify-center">
            <Text className="text-xs font-semibold text-gray-700">바람</Text>
            <Text className="text-base font-bold text-gray-900">- m/s</Text>
          </View>

          <View className="flex-1 bg-yellow-100 rounded-xl p-3 mb-2 justify-center">
            <Text className="text-xs font-semibold text-gray-700">
              미세먼지
            </Text>
            <Text className="text-base font-bold text-gray-900">-</Text>
          </View>

          <View className="flex-1 bg-blue-100 rounded-xl p-3 mb-2 justify-center">
            <Text className="text-xs font-semibold text-gray-700">
              강수확률
            </Text>
            <Text className="text-base font-bold text-gray-900">-%</Text>
          </View>

          <View className="flex-1 bg-violet-100 rounded-xl p-3 justify-center">
            <Text className="text-xs font-semibold text-gray-700">습도</Text>
            <Text className="text-base font-bold text-gray-900">-%</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
