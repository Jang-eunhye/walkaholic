import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function IconSection({ iconLevel }: { iconLevel: number }) {
  const iconNames = ["seed", "sprout", "flower", "tree", "forest"] as const;
  const iconName = iconNames[iconLevel];
  
  return (
    <View className="items-center border border-gray-300 rounded-full p-8 justify-center">
      <MaterialCommunityIcons 
        name={iconName} 
        size={160} 
        color="green" 
      />
    </View>
  );
}