import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GROWTH_STAGES } from "../../constants/growthStages";

export default function IconSection({ iconLevel }: { iconLevel: number }) {
  const stage = GROWTH_STAGES[iconLevel];
  
  return (
    <View className="items-center border border-gray-300 rounded-full p-8 justify-center">
      <MaterialCommunityIcons name={stage.icon} size={160} color={stage.color} />
    </View>
  );
}