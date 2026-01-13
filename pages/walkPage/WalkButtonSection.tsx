import { View, Text, TouchableOpacity } from "react-native";

export default function WalkButtonSection() {
  return (
    <View>
        {/*산책 시작/종료 버튼*/}
        <TouchableOpacity
        onPress={() => {}}
      >
        <Text className="text-2xl font-bold text-gray-800">산책 시작 버튼</Text>
      </TouchableOpacity>
    </View>
  );
}