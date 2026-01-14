import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import LocationSection from "./weatherPage/LocationSection";
import WeatherInfoSection from "./weatherPage/WeatherInfoSection";
import WeatherWarningSection from "./weatherPage/WeatherWarningSection";

export default function WeatherPage() {
  // 위치 주소 문자열 상태
  const [locationName, setLocationName] =
    useState<string>("위치 정보 가져오는 중...");

  useEffect(() => {
    (async () => {
      try {
        // 1. 위치 권한 요청
        const { granted } = await Location.requestForegroundPermissionsAsync();
        if (!granted) {
          setLocationName("위치 권한이 거부되었습니다.");
          return;
        }

        // 2. 현재 위치 좌표 가져오기 (정확도 5로 설정)
        const {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync({ accuracy: 5 });

        // 3. 좌표를 주소로 변환 (역지오코딩)
        const location = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        // 4. 주소 정보 추출 및 표시용 문자열 생성
        if (location.length > 0) {
          const region = location[0].region || ""; // 시/도
          const district = location[0].district || ""; // 구/군
          const city = location[0].city || ""; // 시/군/구
          const addressString = `${region} ${city} ${district}`.trim();
          setLocationName(addressString || "위치를 찾을 수 없습니다.");
        } else {
          setLocationName("위치를 찾을 수 없습니다.");
        }
      } catch (error) {
        // 에러 발생 시 에러 메시지 표시
        console.error("위치 정보 가져오기 실패:", error);
        setLocationName("위치 정보를 가져올 수 없습니다.");
      }
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
