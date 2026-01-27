import { View, Text } from "react-native";
import { WeatherData } from "../../utils/weather/getWeatherData";
import { getWeatherWarnings } from "../../utils/weather/getWeatherWarnings";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface WeatherWarningSectionProps {
  weatherData: WeatherData | null;
}

const warningStyles = [
  { bg: "bg-rose-50", border: "border-rose-200", icon: "#e11d48" },
  { bg: "bg-amber-50", border: "border-amber-200", icon: "#d97706" },
  { bg: "bg-lime-50", border: "border-lime-200", icon: "#65a30d" },
  { bg: "bg-cyan-50", border: "border-cyan-200", icon: "#0891b2" },
];

export default function WeatherWarningSection({
  weatherData,
}: WeatherWarningSectionProps) {
  // weatherData가 없으면 아무것도 표시하지 않음
  if (!weatherData) {
    return null;
  }

  const warnings = getWeatherWarnings(weatherData);

  if (warnings.length === 0) {
    return null;
  }

  return (
    <View className="gap-2">
      {warnings.map((text, idx) => {
        const style = warningStyles[idx % warningStyles.length];
        return (
          <View
            key={idx}
            className={`${style.bg} ${style.border} border rounded-xl px-4 py-3 flex-row items-center`}
          >
            <MaterialCommunityIcons name="alert-circle-outline" size={18} color={style.icon} />
            <Text className="text-base font-medium text-gray-800 ml-2 flex-1">
              {text}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
