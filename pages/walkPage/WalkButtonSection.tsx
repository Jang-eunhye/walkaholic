import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function WalkButtonSection() {
  return (
    <View className="items-center justify-center w-full px-4">
      <TouchableOpacity
        onPress={() => {}}
        className="bg-green-600 rounded-full px-12 py-4 flex-row items-center justify-center"
        activeOpacity={0.5}
      >
        <Ionicons name="walk-outline" size={24} color="white" />
        <Text className="text-white text-xl font-bold ml-2">산책 시작</Text>
      </TouchableOpacity>
    </View>
  );
}
