import { View, Text, TouchableOpacity } from "react-native";

export default function WalkPage() {
  return (
    <View className="flex-1  items-center justify-center">
      <View className="flex-1">
        <Text className="text-2xl font-bold text-gray-800">
          2026년 1월 첫째주
        </Text>
        <Text className="text-2xl font-bold text-gray-800">ㅇㅇㅇㅇㅇㅇㅇ</Text>
      </View>
      <View className="flex[4 flex-row">
        <Text className="text-2xl font-bold text-gray-800">아이콘</Text>
      </View>
      <TouchableOpacity className="flex-1" onPress={() => {}}>
        <Text className="text-2xl font-bold text-gray-800">산책 시작</Text>
      </TouchableOpacity>
    </View>
  );
}