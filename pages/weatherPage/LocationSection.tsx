import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface LocationSectionProps {
  locationName: string;
  onRefresh?: () => void;
}

export default function LocationSection({
  locationName,
  onRefresh,
}: LocationSectionProps) {
  return (
    <View className="flex-row items-center py-4 mb-2">
      <View className="flex-row items-center">
        <MaterialCommunityIcons name="map-marker-outline" size={20} color="#6b7280" />
        <Text className="text-xl font-semibold text-gray-800 ml-2">
          {locationName}
        </Text>
      </View>
      <TouchableOpacity
        onPress={onRefresh}
        className="p-2"
        accessibilityRole="button"
        accessibilityLabel="위치 새로고침"
      >
        <MaterialCommunityIcons name="refresh" size={18} color="#6b7280" />
      </TouchableOpacity>
    </View>
  );
}
