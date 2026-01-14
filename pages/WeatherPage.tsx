import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { getCurrentLocation } from "../utils/location/getCurrentLocation";
import { getAddressFromCoordinates } from "../utils/location/getAddressFromCoordinates";
import LocationSection from "./weatherPage/LocationSection";
import WeatherInfoSection from "./weatherPage/WeatherInfoSection";
import WeatherWarningSection from "./weatherPage/WeatherWarningSection";

export default function WeatherPage() {
  // 위치 주소 문자열 상태
  const [locationName, setLocationName] =
    useState<string>("위치 정보 가져오는 중...");

  useEffect(() => {
    (async () => {
      // 1. 현재 위치 좌표 가져오기 (권한 요청 포함)
      const coordinates = await getCurrentLocation();
      if (!coordinates) {
        setLocationName("위치 권한이 거부되었습니다.");
        return;
      }

      // 2. 좌표를 주소로 변환
      const address = await getAddressFromCoordinates(
        coordinates.latitude,
        coordinates.longitude
      );
      setLocationName(address);
    })();
  }, []);

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ padding: 16 }}
    >
      {/* 위치정보 */}
      <LocationSection locationName={locationName} />

      {/* 날씨정보 */}
      <WeatherInfoSection />

      {/* 주의문구 */}
      <WeatherWarningSection />
    </ScrollView>
  );
}
