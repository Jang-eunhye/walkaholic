import { View, Text } from "react-native";

interface LocationSectionProps {
  locationName: string;
}

export default function LocationSection({
  locationName,
}: LocationSectionProps) {
  return (
    <View className="bg-red-300 py-3">
      <Text className="text-2xl font-bold text-gray-900">{locationName}</Text>
    </View>
  );
}
