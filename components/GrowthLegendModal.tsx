import { View, Text, Modal, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GROWTH_STAGES } from "../constants/growthStages";

interface GrowthLegendModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
}

export default function GrowthLegendModal({
  visible,
  onClose,
  title = "단계별 성장 아이콘",
}: GrowthLegendModalProps) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/40 justify-center items-center" onPress={onClose}>
        <Pressable className="bg-white rounded-2xl p-4 w-72" onPress={() => {}}>
          <Text className="text-sm font-semibold text-gray-800 mb-3">{title}</Text>
          <View className="flex-row flex-wrap gap-2">
            {GROWTH_STAGES.map((stage) => (
              <View key={stage.label} className="flex-row items-center mr-2 mb-2">
                <MaterialCommunityIcons name={stage.icon} size={16} color={stage.color} />
                <Text className="text-xs text-gray-600 ml-1">
                  {stage.label} · {stage.minKm}km+
                </Text>
              </View>
            ))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

