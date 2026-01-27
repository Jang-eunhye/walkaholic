import { View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GROWTH_STAGES } from "../../constants/growthStages";
import GrowthLegendModal from "../../components/GrowthLegendModal";

export default function IconSection({ iconLevel }: { iconLevel: number }) {
  const stage = GROWTH_STAGES[iconLevel];
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  
  return (
    <View className="items-center border border-gray-300 rounded-full p-8 justify-center relative">
      <TouchableOpacity
        onPress={() => setIsLegendOpen(true)}
        className="absolute top-3 right-3 p-1"
        accessibilityRole="button"
        accessibilityLabel="성장 단계 범례 보기"
      >
        <MaterialCommunityIcons name="alert-circle-outline" size={18} color="#9CA3AF" />
      </TouchableOpacity>
      <MaterialCommunityIcons name={stage.icon} size={160} color={stage.color} />
      <GrowthLegendModal visible={isLegendOpen} onClose={() => setIsLegendOpen(false)} />
    </View>
  );
}