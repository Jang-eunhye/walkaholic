import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface LocationSectionProps {
  locationName: string;
}

export default function LocationSection({
  locationName,
}: LocationSectionProps) {
  return (
    <View className="flex-row items-center py-4 mb-2">
      <MaterialCommunityIcons name="map-marker-outline" size={20} color="#6b7280" />
      <Text className="text-xl font-semibold text-gray-800 ml-2">
        {locationName}
      </Text>
    </View>
  );
}
