import { View } from "react-native";
import LocationSection from "./weatherPage/LocationSection";
import WeatherInfoSection from "./weatherPage/WeatherInfoSection";
import WeatherWarningSection from "./weatherPage/WeatherWarningSection";

export default function WeatherPage() {
  return (
    <View className="flex-1 p-4 items-center">
      {/* 위치정보 */}
      <LocationSection />
      {/* 날씨정보 */}
      <WeatherInfoSection />
      {/* 주의문구 */}
      <WeatherWarningSection />
    </View>
  );
}
