import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function IconSection({ iconLevel }: { iconLevel: number }) {
  const iconNames = ["seed", "sprout", "flower", "tree", "forest"];
  const iconName = iconNames[iconLevel];
  
  return (
    <View className="w-full items-center justify-center">
      <MaterialCommunityIcons name={iconName as any} size={200} color="green" />
    </View>
  );
}