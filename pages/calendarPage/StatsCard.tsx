import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface StatsCardProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  value: string | number;
  unit?: string;
  colorClass?: string;
}

export default function StatsCard({ icon, label, value, colorClass = "bg-blue-100 text-blue-600" }: StatsCardProps) {
  // colorClass에서 색상 추출
  const getIconColor = () => {
    if (colorClass.includes("blue")) return "#2563EB";
    if (colorClass.includes("amber")) return "#D97706";
    if (colorClass.includes("emerald")) return "#059669";
    if (colorClass.includes("rose")) return "#E11D48";
    return "#2563EB";
  };

  const iconColor = getIconColor();
  
  return (
    <View 
      className="bg-white rounded-3xl p-5 shadow-sm border border-gray-200" 
      style={{ flex: 1 }}
    >
      <View className="flex-row items-center gap-3 mb-3">
        <View className={`p-2.5 rounded-xl ${colorClass.split(" ")[0]}`}>
          <MaterialCommunityIcons name={icon} size={20} color={iconColor} />
        </View>
        <Text className="text-sm font-medium text-gray-600">{label}</Text>
      </View>
      <View className="flex-row items-baseline gap-1.5">
        <Text className="text-3xl font-bold text-gray-900">
          {typeof value === "number" ? value.toLocaleString() : value}
        </Text>
      </View>
    </View>
  );
}

