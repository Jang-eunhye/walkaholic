import { View, Text } from "react-native";

export default function WeekStatusSection() {
  return (
    <View className="flex-1">
      {/*날짜 영역*/}
      <View className="flex-1 bg-red-200 justify-center">
        <Text className="text-2xl font-bold text-gray-800">
          2026년 1월 첫째주
        </Text>
      </View>

      {/*이번주 산책 현황*/}
      <View className="flex-[2] bg-yellow-200 items-center justify-center">
        <Text className="text-2xl font-bold text-gray-800">ㅇㅇㅇㅇㅇㅇㅇ</Text>
      </View>
    </View>
  );
}
