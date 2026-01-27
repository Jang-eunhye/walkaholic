'use client';

import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import Constants from "expo-constants";
import { getCachedLocation } from "../utils/location/getCachedLocation";
import LocationSection from "./weatherPage/LocationSection";
import WeatherInfoSection from "./weatherPage/WeatherInfoSection";
import WeatherWarningSection from "./weatherPage/WeatherWarningSection";
import { getWeatherData, WeatherData } from "../utils/weather/getWeatherData";

export default function WeatherPage() {
  const API_KEY = Constants.expoConfig?.extra?.openweatherApiKey || "";
  // 위치 주소 문자열 상태
  const [locationName, setLocationName] =
    useState<string>("위치 정보 가져오는 중...");
  // 날씨 데이터 상태
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    (async () => {
      // 1. 현재 위치 좌표 가져오기 (권한 요청 포함)
      const location = await getCachedLocation();
      if (!location) {
        setLocationName("위치 권한이 거부되었습니다.");
        return;
      }

      // 2. 좌표/주소 캐시 사용
      setLocationName(location.address);

      // 3. 날씨 및 미세먼지 데이터 가져오기
      const fetchedWeatherData = await getWeatherData(
        location.coordinates.latitude,
        location.coordinates.longitude,
        API_KEY
      );
      setWeatherData(fetchedWeatherData);
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
      <WeatherInfoSection weatherData={weatherData} />

      {/* 주의문구 */}
      <WeatherWarningSection weatherData={weatherData} />
    </ScrollView>
  );
}
