import { View, Text, TouchableOpacity } from "react-native";

export default function WalkPage() {
  return (
    <View className="flex-1 bg-white">
      <View className="flex-1">
        {/*날짜 영역*/}
        <View className="flex-1 bg-red-200 justify-center">
          <Text className="text-2xl font-bold text-gray-800">
            2026년 1월 첫째주
          </Text>
        </View>

        {/*이번주 산책 현황*/}
        <View className="flex-[2] bg-yellow-200 items-center justify-center">
          <Text className="text-2xl font-bold text-gray-800">
            ㅇㅇㅇㅇㅇㅇㅇ
          </Text>
        </View>
      </View>

      {/*아이콘 영역*/}
      <View className="flex-[4] bg-green-200 items-center justify-center">
        <Text className="text-2xl font-bold text-gray-800">아이콘</Text>
      </View>

      {/*산책 시작/종료 버튼*/}
      <TouchableOpacity
        className="flex-1 bg-blue-200 items-center justify-center"
        onPress={() => {}}
      >
        <Text className="text-2xl font-bold text-gray-800">산책 시작</Text>
      </TouchableOpacity>
    </View>
  );
}
