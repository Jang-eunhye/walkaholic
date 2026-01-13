import { View, Text } from "react-native";

export default function CalendarPage() {
  return (
    <View className="flex-1 p-4">
      <View className="flex-[2] justify-center items-center bg-orange-500">
        <Text className="text-2xl font-bold text-gray-800">달력</Text>
      </View>

      <View className="flex-1 justify-center items-center bg-blue-500">
        <Text className="text-2xl font-bold text-gray-800">통계</Text>
      </View>
    </View>
  );
}
