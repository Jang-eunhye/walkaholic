import { View, Text } from "react-native";

export default function WeatherInfoSection() {
  return (
    <View className="flex-row h-1/3 justify-center items-center">
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl font-bold text-gray-800">기온</Text>
      </View>
      <View className="flex-1">
        <Text className="text-2xl font-bold text-gray-800">바람~~</Text>
        <Text className="text-2xl font-bold text-gray-800">미세먼지~~</Text>
        <Text className="text-2xl font-bold text-gray-800">강수확률~~</Text>
        <Text className="text-2xl font-bold text-gray-800">습도~~</Text>
      </View>
    </View>
  );
}
