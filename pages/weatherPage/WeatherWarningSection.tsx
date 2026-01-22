import { View, Text } from "react-native";
import { WeatherData } from "../../utils/weather/getWeatherData";
import { getWeatherWarnings } from "../../utils/weather/getWeatherWarnings";

interface WeatherWarningSectionProps {
  weatherData: WeatherData | null;
}

const warningBg = ["bg-rose-100", "bg-amber-100", "bg-lime-100", "bg-cyan-100"];

export default function WeatherWarningSection({
  weatherData,
}: WeatherWarningSectionProps) {
  // weatherData가 없으면 아무것도 표시하지 않음
  if (!weatherData) {
    return null;
  }

  const warnings = getWeatherWarnings(weatherData);

  return (
    <View className="bg-green-300 py-4">
      <View className="gap-3">
        {warnings.map((text, idx) => (
          <View
            key={idx}
            className={`${
              warningBg[idx % warningBg.length]
            } rounded-xl p-4 border border-gray-200`}
          >
            <Text className="text-base font-semibold text-gray-900">
              {text}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
