import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function IconSection() {
  return (
    <View className="w-full items-center justify-center">
      <Ionicons name="heart-circle-outline" size={200} color="green" />
    </View>
  );
}