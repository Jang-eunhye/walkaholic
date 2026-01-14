import { ScrollView } from "react-native";
import LocationSection from "./weatherPage/LocationSection";
import WeatherInfoSection from "./weatherPage/WeatherInfoSection";
import WeatherWarningSection from "./weatherPage/WeatherWarningSection";

export default function WeatherPage() {
  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ padding: 16 }}
    >
      {/* 위치정보 */}
      <LocationSection />

      {/* 날씨정보 */}
      <WeatherInfoSection />

      {/* 주의문구 */}
      <WeatherWarningSection />
    </ScrollView>
  );
}
